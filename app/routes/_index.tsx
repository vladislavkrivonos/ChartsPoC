import type { MetaFunction } from "@remix-run/node";
import { createChart } from 'lightweight-charts';
import { useState } from "react";
import { DisplayDate, GraphComponentTradingView } from "~/components/graph";
import { GraphComponent } from "~/components/graps2";
import { renderLineChart } from "~/components/recharts";

export interface GraphData {
    color: string;
    isDisplayed: boolean;
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
      data: [
        { time: '2018-12-22', value: 32.51 },
        { time: '2018-12-23', value: 31.11 },
        { time: '2018-12-24', value: 27.02 },
        { time: '2018-12-25', value: 27.32 },
        { time: '2018-12-26', value: 25.17 },
        { time: '2018-12-27', value: 28.89 },
        { time: '2018-12-28', value: 25.46 },
        { time: '2018-12-29', value: 23.92 },
        { time: '2018-12-30', value: 22.68 },
        { time: '2018-12-31', value: 22.67 },
      ]
    },
    {
      color: 'red',
      isDisplayed: false,
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
      isDisplayed: false,
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
        {/* <header className="flex flex-col items-center gap-9">
          <h1 className="leading text-2xl font-bold text-gray-800 dark:text-gray-100">
            Welcome to <span className="sr-only">Remix</span>
          </h1>
          <div className="h-[144px] w-[434px]">
            <img
              src="/logo-light.png"
              alt="Remix"
              className="block w-full dark:hidden"
            />
            <img
              src="/logo-dark.png"
              alt="Remix"
              className="hidden w-full dark:block"
            />
          </div>
        </header>
        <nav className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-gray-200 p-6 dark:border-gray-700">
          <p className="leading-6 text-gray-700 dark:text-gray-200">
            What&apos;s next?
          </p>
          <ul>
            {resources.map(({ href, text, icon }) => (
              <li key={href}>
                <a
                  className="group flex items-center gap-3 self-stretch p-3 leading-normal text-blue-700 hover:underline dark:text-blue-500"
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {icon}
                  {text}
                </a>
              </li>
            ))}
          </ul>
        </nav> */}
{/* 12
      <ChartComponent data={initialData}></ChartComponent> */}
      
        <div className="cursor-pointer" onClick={() => handleAnySeries(1)}>Second Series</div>
        <div className="cursor-pointer" onClick={() => handleAnySeries(2)}>Third Series</div>
        <div>
        <GraphComponentTradingView series={series} key={`${series.length}_${visibleDate}`} displayDate={visibleDate} />
        </div>
        <div className="flex flex-row w-64 justify-around">
          <div className="cursor-pointer" onClick={() => setVisibleDate(DisplayDate.Day)}>1d</div>
          <div className="cursor-pointer" onClick={() => setVisibleDate(DisplayDate.Week)}>1w</div>
          <div className="cursor-pointer" onClick={() => setVisibleDate(DisplayDate.All)}>All</div>
        </div>
        {/* <div>
          {renderLineChart}
        </div> */}
    </div>
  );
}
