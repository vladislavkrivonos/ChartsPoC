import { IChartApi, IPrimitivePaneView, ISeriesApi, ISeriesPrimitive, LineData, SeriesAttachedParameter, SeriesType } from "lightweight-charts";
import { CustomMarkerPaneView } from "./custom-pane";

export class CustomMarkerPrimitive implements ISeriesPrimitive {
  private paneView!: CustomMarkerPaneView;

  constructor(
    private series: ISeriesApi<SeriesType>,
    private chart: IChartApi,
    private label: string
  ) {
    const data = series.data();
    const lastPoint = data[data.length - 1] as LineData;
    const timeScale = chart.timeScale();

    const x = timeScale.timeToCoordinate(lastPoint.time);
    const y = series.priceToCoordinate(lastPoint.value);

    if (x !== null && y !== null) {
      this.paneView = new CustomMarkerPaneView(x + 15, y, label); // 15 here are the pixels to the right at init
    }
  }

  paneViews(): readonly IPrimitivePaneView[] {
    return this.paneView ? [this.paneView] : [];
  }

  attached(params: SeriesAttachedParameter): void {
    // Optional: perform setup when attached
  }

  detached(): void {
    // Optional: perform cleanup when detached
  }

  updateAllViews(): void {
    const data = this.series.data();
    const lastPoint = data[data.length - 1] as LineData;
    const x = this.chart.timeScale().timeToCoordinate(lastPoint.time);
    const y = this.series.priceToCoordinate(lastPoint.value);

    if (x !== null && y !== null) {
        this.paneView.updateCoordinates(x + 15, y); // 15 here are the pixels to the right at redraw
    }
  }
}