import { IPattern } from "./pattern.interface";
import { PatternSetting, PatternSettingOption } from "./patternSetting";

export class Cross implements IPattern {
    name: string;
    settings: PatternSetting;

    constructor() {
        this.name = "Cross";
        this.settings = new PatternSetting();
        this.settings.addOption(
            new PatternSettingOption("randomness", "numeric_range", 3, [0, 4, 1])
        );
    }

    draw(canvas: HTMLCanvasElement): void {
        const ctx = canvas.getContext("2d");
        if (ctx === null) {
            throw new Error("The 2D canvas context is unavailable.");
        }

        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, 480, 480);

        const width = 50;
        const height = width;

        let x = 100;
        let y = 100;
        // upper left to lower right
        for (let index = 0; index < 24; index++) {
            const randomOffsetX = this.calcOffset(x);
            const randomOffsetY = this.calcOffset(y);
            ctx.strokeRect(x + randomOffsetX, y + randomOffsetY, width, height);
            x += 10;
            y += 10;
        }

        x = 100;
        y = 480 - 150;
        // lower left to upper right
        for (let index = 0; index < 24; index++) {
            const randomOffsetX = this.calcOffset(x);
            const randomOffsetY = this.calcOffset(y);
            ctx.strokeRect(x + randomOffsetX, y + randomOffsetY, width, height);
            x += 10;
            y -= 10;
        }
    }

    private calcOffset(coordination: number): number {
        const centerCalibration = this.centerPrecisionCoefficient(coordination);
        let randomOffset = 40 * Math.random() * centerCalibration;

        if (Math.random() < 0.5) {
            randomOffset *= -1;
        }

        return randomOffset;
    }

    private centerPrecisionCoefficient(coordination: number): number {
        const width = 50;

        const center = 480 / 2;
        const boxCenter = coordination + width / 2;
        const maxOffset = center;
        const offset = Math.abs(boxCenter - center);

        return (
            (offset / maxOffset) * this.settings.getNumericValue("randomness")
        );
    }
}
