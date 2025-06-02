import type { MetaFunction } from "@remix-run/node";
import { useState } from "react";
import { DisplayDate } from "~/components/graph";
import PercentsChart from '~/components/percents-chart/PercentsChart';

export interface GraphData {
    color: string;
    isDisplayed: boolean;
    name: string;
    data: {
        time: string;
        value: number;
    }[];
}

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const allData = [
    {
      color: 'green',
      isDisplayed: true,
      name: "Lakers",
      data: [
        { time: '2018-12-22', value: 32.51 },
        { time: '2018-12-23', value: 31.11 },
        { time: '2018-12-24', value: 37.02 },
        { time: '2018-12-25', value: 47.32 },
        { time: '2018-12-26', value: 55.17 },
        { time: '2018-12-27', value: 68.89 },
        { time: '2018-12-28', value: 75.46 },
        { time: '2018-12-29', value: 83.92 },
        { time: '2018-12-30', value: 9.68 },
        { time: '2018-12-31', value: 82.67 },
      ]
    },
    {
      color: 'red',
      isDisplayed: true,
      name: "Celtics",
      data: [
        { time: '2018-12-22', value: 40 },
        { time: '2018-12-23', value: 41.11 },
        { time: '2018-12-24', value: 47.02 },
        { time: '2018-12-25', value: 47.32 },
        { time: '2018-12-26', value: 45.17 },
        { time: '2018-12-27', value: 48.89 },
        { time: '2018-12-28', value: 45.46 },
        { time: '2018-12-29', value: 43.92 },
        { time: '2018-12-30', value: 42.68 },
        { time: '2018-12-31', value: 42.67 },
      ]
    },
    {
      color: 'blue',
      isDisplayed: true,
      name: "Nuggets",
      data: [
        { time: '2018-12-22', value: 60 },
        { time: '2018-12-23', value: 61.11 },
        { time: '2018-12-24', value: 67.02 },
        { time: '2018-12-25', value: 67.32 },
        { time: '2018-12-26', value: 65.17 },
        { time: '2018-12-27', value: 68.89 },
        { time: '2018-12-28', value: 65.66 },
        { time: '2018-12-29', value: 63.92 },
        { time: '2018-12-30', value: 62.68 },
        { time: '2018-12-31', value: 62.67 },
      ]
    },
  ]

  const initVal = allData.map((el, index) => {
    if (el && el.isDisplayed) {
      return el;
    }
  }).filter(Boolean) as GraphData[];

  const [seriesState, setSeriesState] = useState([true, false, false]);
  const [series, setSeries] = useState<(GraphData)[]>(initVal);
  const [visibleDate, setVisibleDate] = useState<DisplayDate>(DisplayDate.All);


  const handleAnySeries = (index: number) => {
    if (!seriesState[index]) {
      const newSeriesState = seriesState;
      newSeriesState[index] = true;
      setSeriesState(newSeriesState);
    } else {
      const newSeriesState = seriesState;
      newSeriesState[index] = false;
      setSeriesState(newSeriesState);      
    }

    const newSeries: GraphData[] = [];

    // maybe use newSeriesState?
    seriesState.map((el, idx) => {
      if (el) {
        newSeries.push(allData[idx]);
      }
    });
    setSeries(newSeries);
  }

  return (
    <div className="flex h-full items-center justify-center flex-col">
        {/*Initial example of percentage chart*/}
        <PercentsChart key={`${series.length}_${visibleDate}`} series={series}/>

        <div className="cursor-pointer" onClick={() => handleAnySeries(1)}>Second Series</div>
        <div className="cursor-pointer" onClick={() => handleAnySeries(2)}>Third Series</div>
        {/*<div>*/}
        {/*<GraphComponentTradingView series={series} key={`${series.length}_${visibleDate}`} displayDate={visibleDate} />*/}
        {/*</div>*/}
        <div className="flex flex-row w-64 justify-around">
          <div className="cursor-pointer" onClick={() => setVisibleDate(DisplayDate.Day)}>1d</div>
          <div className="cursor-pointer" onClick={() => setVisibleDate(DisplayDate.Week)}>1w</div>
          <div className="cursor-pointer" onClick={() => setVisibleDate(DisplayDate.All)}>All</div>
        </div>

        {/*Uncomment following section to Add Recharts chart */}
        {/* <div>
          {renderLineChart}
        </div> */}
    </div>
  );
}
