import { IPattern } from "./pattern.interface";
import { PatternSetting, PatternSettingOption } from "./patternSetting";

export class CubicDisarray implements IPattern {
    name: string;
    settings: PatternSetting;

    constructor() {
        this.name = "CubicDisarray";
        this.settings = new PatternSetting();
        this.settings.addOption(
            new PatternSettingOption("randomness", "numeric_range", 1, [0.4, 2, 0.2])
        );
        this.settings.addOption(
            new PatternSettingOption("compactness", "numeric_range", 12, [6, 20, 1])
        );
    }

    draw(canvas: HTMLCanvasElement): void {
        const ctx = canvas.getContext("2d");

        if (ctx === null) {
            throw new Error("The 2D canvas context is unavailable.");
        }

        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, 480, 480);

        const size = 480;
        ctx.lineWidth = 2;

        const randomDisplacement = 15;
        const rotateMultiplier = 20;
        const offset = 10;
        const squareNumOneRow = this.settings.getNumericValue("compactness") + 1;
        const squareSize = (size - 2 * offset) / squareNumOneRow;
        const randomness = this.settings.getNumericValue("randomness");

        const drawRect = (width: number, height: number): void => {
            ctx.beginPath();
            ctx.rect(-width / 2, -height / 2, width, height);
            ctx.stroke();
        };

        const xLimit = size - squareSize - offset;
        const yLimit = size - squareSize - offset;
        for (let x = squareSize; x <= xLimit; x += squareSize) {
            for (let y = squareSize; y <= yLimit; y += squareSize) {
                let plusOrMinus = Math.random() < 0.5 ? -1 : 1;
                const rotateAmt =
                    (((y / size) * Math.PI) / 180) *
                    plusOrMinus *
                    Math.random() *
                    randomness *
                    rotateMultiplier;

                plusOrMinus = Math.random() < 0.5 ? -1 : 1;
                const translateAmt =
                    (y / size) *
                    plusOrMinus *
                    Math.random() *
                    randomness *
                    randomDisplacement;

                ctx.save();
                ctx.translate(x + translateAmt + offset, y + offset);
                ctx.rotate(rotateAmt);
                drawRect(squareSize, squareSize);
                ctx.restore();
            }
        }
    }
}
