import { LineStyleOptions, SeriesOptionsCommon } from 'lightweight-charts';

export const CHART_OPTIONS = {
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
};

export const SERIES_OPTIONS: Partial<LineStyleOptions & SeriesOptionsCommon> = {
  lineWidth: 2,
  crosshairMarkerVisible: true,
};
