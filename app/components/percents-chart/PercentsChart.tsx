import React, { useRef, useEffect } from 'react';
import { createChart, LineSeries } from 'lightweight-charts';
import { GraphData } from '~/routes/_index';
import { CHART_OPTIONS, SERIES_OPTIONS } from '~/components/percents-chart/configs/percents-chart-options';

const PercentsChart: React.FC<{ series: GraphData[] }> = ({ series }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, { ...CHART_OPTIONS, width: chartContainerRef.current.clientWidth });
    chart.timeScale().fitContent();

    for (const { color, data, isDisplayed } of series) {
      if (!isDisplayed) continue;
      const lineSeries = chart.addSeries(LineSeries, { ...SERIES_OPTIONS, color });
      lineSeries.setData(
        data.map(({ time, value }) => ({ time, value: Math.max(0, Math.min(value, 100)) }))
      );
      lineSeries.applyOptions({
        autoscaleInfoProvider: () => ({ priceRange: { minValue: 0, maxValue: 100 } }),
      });
    }

    return () => chart.remove();
  }, [series]);

  return <div ref={chartContainerRef} className="flex flex-1" style={{ width: '1000px', height: '1200px', marginTop: '100px' }} />;
};

export default PercentsChart;
