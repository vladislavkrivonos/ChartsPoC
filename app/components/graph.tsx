import { AreaSeries, CandlestickSeries, ColorType, createChart, ITimeScaleApi, LineSeries, PriceScaleMode, Time } from 'lightweight-charts';
import { useEffect, useRef } from 'react';
import { GraphData } from '~/routes/_index';

export enum DisplayDate {
    Day = '1d',
    All = 'all',
    Week = '1w',
}

const DisplayDateToValueMap = {
    [DisplayDate.Day]: (timeScale: ITimeScaleApi<Time>) => {
        setVisibleRangeDateFromEndDate(timeScale, 1);
    },
    [DisplayDate.Week]: (timeScale: ITimeScaleApi<Time>) => {
        setVisibleRangeDateFromEndDate(timeScale, 7);
    },
    [DisplayDate.All]: (timeScale: ITimeScaleApi<Time>) => {
        timeScale.fitContent();
    }
}

const setVisibleRangeDateFromEndDate = (timeScale: ITimeScaleApi<Time>, days: number) => {
    const visibleRange = timeScale.getVisibleRange();
    if (visibleRange) {
        const res = calculateDateRangeFromDate(visibleRange.to, days);

        timeScale.setVisibleRange(res);
    }
}

const calculateDateRangeFromDate = (nowTime: Time, days: number): {from: Time, to: Time} => {
    const now = nowTime as string;
    const nowDate = new Date(now);
    const wantedDay = new Date(nowDate.getTime() - days * 24 * 60 * 60 * 1000); // ms in 1d
    return {
        from: (wantedDay.getTime() / 1000) as Time,
        to: now,
    }
}

export const GraphComponentTradingView = (props: {series: GraphData[], displayDate: DisplayDate}) => {
    const chartOptions = { layout: { textColor: 'black', background: { type: ColorType.Solid, color: 'white' } }, autoSize: true };
    const containerDiv = useRef(null);
    let didInit = false;

    useEffect(() => {
        if (!didInit) {
            didInit = true;

            if (containerDiv.current) {

                const chart = createChart(containerDiv.current, chartOptions);

                props.series.map((singleSeries: GraphData, index: number) => {
                    const lineSeries = chart.addSeries(LineSeries, {color: singleSeries.color});

                    // TODO: DEV: this is a hack how to scale % properly. but with change of visible range, it counts first visible as 0% and starts from there.
                    // TODO: DEV: on each re-render need to add first value as 0% for it to work.
                    // TODO: DEV: also calculates 0% for each line separately...
                    // const newData = [
                    //     { time: '2018-12-21', value: 1},
                    //     ...singleSeries.data.map(el => {
                    //         const oldVal = el.value;
                    //         const newVal = oldVal / 100 + 1;

                    //         return {
                    //             time: el.time,
                    //             value: newVal
                    //         };
                    //     })
                    // ]

                    lineSeries.setData(singleSeries.data);
                })

                const timeScale = chart.timeScale();
                DisplayDateToValueMap[props.displayDate](timeScale);
                chart.applyOptions({
                    rightPriceScale: {
                        autoScale: false,
                        mode: PriceScaleMode.Percentage
                    }
                });
            }
        }
    },
    [])

    return (
        <div ref={containerDiv} className='flex flex-1' style={{width: '500px', height: '500px'}}>
        </div>

    );
}

