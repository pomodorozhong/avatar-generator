import { IPattern } from "./pattern.interface";

export class Cross implements IPattern {
    name: string;
    settings: Record<string, any>;

    constructor() {
        this.name = "Cross";
        this.settings = {
            randomness: 0,
        };

        this.settings["randomness"] = 3;
    }

    draw(canvas: HTMLCanvasElement) {
        let ctx = canvas.getContext("2d");

        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, 480, 480);

        let width = 50;
        let height = width;

        let x = 100;
        let y = 100;
        // upper left to lower right
        for (let index = 0; index < 24; index++) {
            let randOffestX = this.calcOffest(x);
            let randOffestY = this.calcOffest(y);
            ctx.strokeRect(x + randOffestX, y + randOffestY, width, height);
            x += 10;
            y += 10;
        }

        x = 100;
        y = 480 - 150;
        // lower left to upper right
        for (let index = 0; index < 24; index++) {
            let randOffestX = this.calcOffest(x);
            let randOffestY = this.calcOffest(y);
            ctx.strokeRect(x + randOffestX, y + randOffestY, width, height);
            x += 10;
            y -= 10;
        }
    }

    calcOffest(coordination: number): number {
        let centerCalibration = this.centerPrecisionCoeff(coordination);
        let randOffest = 40 * Math.random() * centerCalibration;

        if (Math.random() < 0.5) {
            randOffest *= -1;
        }

        return randOffest;
    }

    centerPrecisionCoeff(coordination: number): number {
        let width = 50;

        let center = 480 / 2;
        let boxCenter = coordination + width / 2;
        let maxOffset = center;
        let offset = Math.abs(boxCenter - center);

        let coeff = (offset / maxOffset) * this.settings["randomness"];
        return coeff;
    }
}
