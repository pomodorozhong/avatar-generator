import { View } from "./view";

export class Presenter {
    view: View;

    constructor() {
        this.view = new View(this);
    }

    getPatternList(): Array<string> {
        let list: Array<string> = ["Cross", "Cross'"];
        return list;
    }
    getPatternSetting(pattern: string) {
        console.log(pattern + " pattern's setting not implemented");
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
        // upper left to lower right
        for (let index = 0; index < 34; index++) {
            ctx.strokeRect(x, y, width, height);
            x += 10;
            y -= 10;
        }
    }
}
