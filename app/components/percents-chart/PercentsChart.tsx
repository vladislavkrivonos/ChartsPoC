import React, { useRef, useEffect } from 'react';
import { createChart, createSeriesMarkers, ISeriesPrimitive, LineSeries, SeriesMarker, Time } from 'lightweight-charts';
import { GraphData } from '~/routes/_index';
import { CHART_OPTIONS, SERIES_OPTIONS } from '~/components/percents-chart/configs/percents-chart-options';
import { CustomMarkerPrimitive } from './custom-marker/custom-marker';

const PercentsChart: React.FC<{ series: GraphData[] }> = ({ series }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, { ...CHART_OPTIONS, width: chartContainerRef.current.clientWidth });
    chart.timeScale().fitContent();

    // const toolTip = document.createElement('div');
    //     toolTip.style = `width: 96px; height: 80px; position: absolute; display: none; padding: 8px; box-sizing: border-box; font-size: 12px; text-align: left; z-index: 1000; top: 12px; left: 12px; pointer-events: none; border: 1px solid; border-radius: 2px;font-family: -apple-system, BlinkMacSystemFont, 'Trebuchet MS', Roboto, Ubuntu, sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;`;
    //     toolTip.style.background = 'white';
    //     toolTip.style.color = 'black';
    //     toolTip.style.borderColor = '#2962FF';

    for (const { color, data, isDisplayed, name } of series) {
      if (!isDisplayed) continue;
      const lineSeries = chart.addSeries(LineSeries, { ...SERIES_OPTIONS, color });
      lineSeries.setData(
        data.map(({ time, value }) => ({ time, value: Math.max(0, Math.min(value, 100)) }))
      );

      // Setting series to be in 0-100 range
      lineSeries.applyOptions({
        autoscaleInfoProvider: () => ({ priceRange: { minValue: 0, maxValue: 100 } }),
      });

      const customMarker = new CustomMarkerPrimitive(lineSeries, chart, `${name} ${data[data.length - 1].value}%`);
      lineSeries.attachPrimitive(customMarker);
    }
    return () => chart.remove();
  }, [series]);

  return <div ref={chartContainerRef} className="flex flex-1" style={{ width: '1000px', height: '1200px', marginTop: '100px' }} />;
};

export default PercentsChart;
