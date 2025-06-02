import { ChartOptions, DeepPartial, LineStyleOptions, SeriesOptionsCommon } from 'lightweight-charts';

export const CHART_OPTIONS: DeepPartial<ChartOptions> = {
  width: 0, // Will be updated dynamically
  height: 300,
  layout: {
    background: { color: '#fff' },
    textColor: '#000',
  },
  grid: {
    vertLines: { color: '#eee' },
    horzLines: { color: '#eee' },
  },
  rightPriceScale: {
    autoScale: true,
    borderVisible: false,
    scaleMargins: { top: 0.1, bottom: 0.1 },
    visible: true,
  },
  leftPriceScale: {
    autoScale: true,
    visible: false,
  },
  handleScale: {
    axisPressedMouseMove: false, // Disable vertical movement
  },
  localization: {
    priceFormatter: (price: number) => `${price.toFixed(0)}%`,
  },
  timeScale: {
    rightOffset: 1 // This is amount of BARS that we offset from the right
  }
};

export const SERIES_OPTIONS: Partial<LineStyleOptions & SeriesOptionsCommon> = {
  lineWidth: 2,
  crosshairMarkerVisible: true,
};
