import { IPattern } from "./pattern.interface";
import { PatternSetting, PatternSettingOption } from "./patternSetting";

interface Point {
    x: number;
    y: number;
}

export class TriangularMesh implements IPattern {
    name: string;
    settings: PatternSetting;

    constructor() {
        this.name = "TriangularMesh";
        this.settings = new PatternSetting();
        this.settings.addOption(
            new PatternSettingOption("randomness", "numeric_range", 1, [0.4, 2, 0.2])
        );
        this.settings.addOption(
            new PatternSettingOption("compactness", "numeric_range", 8, [6, 20, 2])
        );
    }

    draw(canvas: HTMLCanvasElement): void {
        const ctx = canvas.getContext("2d");

        if (ctx === null) {
            throw new Error("The 2D canvas context is unavailable.");
        }
        const context: CanvasRenderingContext2D = ctx;

        context.fillStyle = "white";
        context.fillRect(0, 0, 480, 480);

        const size = 480;
        context.lineWidth = 2;
        context.lineJoin = "bevel";

        let odd = false;
        const lines: Point[][] = [];

        const compactness = this.settings.getNumericValue("compactness");
        const randomness = this.settings.getNumericValue("randomness");
        const gap = size / compactness;

        // setup the points
        for (let y = gap / 2; y <= size; y += gap) {
            odd = !odd;
            const line: Point[] = [];
            for (let x = gap / 4; x <= size; x += gap) {
                const xOffset =
                    (Math.random() * 0.8 - 0.4) * gap * randomness +
                    (odd ? gap / 2 : 0);
                const yOffset = (Math.random() * 0.8 - 0.4) * gap * randomness;
                line.push({
                    x: x + xOffset,
                    y: y + yOffset,
                });
            }
            lines.push(line);
        }

        odd = true;

        // linking the points, and fill in some color
        for (let row = 0; row < lines.length - 1; row++) {
            odd = !odd;
            const dotLine: Point[] = [];
            for (let index = 0; index < lines[row].length; index++) {
                dotLine.push(odd ? lines[row][index] : lines[row + 1][index]);
                dotLine.push(odd ? lines[row + 1][index] : lines[row][index]);
            }
            for (let index = 0; index < dotLine.length - 2; index++) {
                drawTriangle(
                    dotLine[index],
                    dotLine[index + 1],
                    dotLine[index + 2]
                );
            }
        }

        function drawTriangle(pointA: Point, pointB: Point, pointC: Point): void {
            context.beginPath();
            context.moveTo(pointA.x, pointA.y);
            context.lineTo(pointB.x, pointB.y);
            context.lineTo(pointC.x, pointC.y);
            context.lineTo(pointA.x, pointA.y);
            context.closePath();
            const gray = Math.floor(Math.random() * 16).toString(16);
            context.fillStyle = "#" + gray + gray + gray;
            context.fill();
            context.stroke();
        }
    }
}
