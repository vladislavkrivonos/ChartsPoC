import { IPrimitivePaneRenderer } from "lightweight-charts";

export class CustomMarkerRenderer implements IPrimitivePaneRenderer {
  constructor(private x: number, private y: number, private label: string) {}

    draw(target: any): void {
        target.useBitmapCoordinateSpace((scope: any) => {
            const ctx = scope.context;
            const pixelRatio = scope.horizontalPixelRatio;

            ctx.save();
            // Drawing of circle
            // ctx.fillStyle = 'green';
            // ctx.beginPath();
            // ctx.arc(this.x * pixelRatio, this.y * pixelRatio, 5 * pixelRatio, 0, 2 * Math.PI);
            // ctx.fill();

            ctx.font = `${12 * pixelRatio}px Arial`;
            ctx.fillStyle = 'black';
            ctx.fillText(this.label, (this.x + 8) * pixelRatio, this.y * pixelRatio); // Also moves text a bit to the right
            ctx.restore();
        });
    }
}


