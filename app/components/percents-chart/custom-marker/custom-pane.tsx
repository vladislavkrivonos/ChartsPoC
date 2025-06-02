import { IPrimitivePaneRenderer, IPrimitivePaneView, PrimitivePaneViewZOrder } from "lightweight-charts";
import { CustomMarkerRenderer } from "./custom-renderer";

export class CustomMarkerPaneView implements IPrimitivePaneView {
  private x: number;
  private y: number;
  private label: string;

  constructor(x: number, y: number, label: string) {
    this.x = x;
    this.y = y;
    this.label = label;
  }

  updateCoordinates(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }

//   zOrder(): PrimitivePaneViewZOrder {
//     return 'top';
//   }

  renderer(): IPrimitivePaneRenderer | null {
    return new CustomMarkerRenderer(this.x, this.y, this.label);
  }

}