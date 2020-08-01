import { IPattern } from "./pattern.interface";

export class Cross implements IPattern {
    name: string;
    settings: Record<string, any>;

    constructor() {
        this.name = "Cross";
    }

    draw(canvas: HTMLCanvasElement) {
        let ctx = canvas.getContext("2d");

        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, 480, 480);

        let width = 50;
        let height = width;

        let x = 50;
        let y = 50;
        // upper left to lower right
        for (let index = 0; index < 34; index++) {
            ctx.strokeRect(x, y, width, height);
            x += 10;
            y += 10;
        }

        x = 50;
        y = 480 - 100;
        // lower left to upper right
        for (let index = 0; index < 34; index++) {
            ctx.strokeRect(x, y, width, height);
            x += 10;
            y -= 10;
        }
    }
}
