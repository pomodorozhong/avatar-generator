import { IPattern } from "./pattern.interface";
import { PatternSetting, PatternSettingOption } from "./patternSetting";

export class TriangularMesh implements IPattern {
    name: string;
    settings: PatternSetting;

    constructor() {
        this.name = "CubicDisarray";
        this.settings = new PatternSetting();
        this.settings.addOption(
            new PatternSettingOption("randomness", "numeric_range", 1, [0.4, 2, 0.2])
        );
        this.settings.addOption(
            new PatternSettingOption("compactness", "numeric_range", 8, [6, 20, 2])
        );
    }

    draw(canvas: HTMLCanvasElement) {
        let ctx: CanvasRenderingContext2D = canvas.getContext("2d");

        if (ctx == null) {
            throw new Error("ctx == null");
        }

        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, 480, 480);

        let size = 480;
        ctx.lineWidth = 2;
        ctx.lineJoin = "bevel";

        let line;
        let dot;
        let odd = false;
        let lines = [];

        let compactness = this.settings.getValue("compactness");
        let randomness = this.settings.getValue("randomness");
        let gap = size / compactness;

        // setup the points
        for (var y = gap / 2; y <= size; y += gap) {
            odd = !odd;
            line = [];
            for (var x = gap / 4; x <= size; x += gap) {
                dot = { x: x + (odd ? gap / 2 : 0), y: y };
                let x_offset = (Math.random() * 0.8 - 0.4) * gap * randomness + (odd ? gap / 2 : 0);
                let y_offset = (Math.random() * 0.8 - 0.4) * gap * randomness;
                line.push({
                    x: x + x_offset,
                    y: y + y_offset,
                });
                ctx.fill();
            }
            lines.push(line);
        }

        var dotLine;
        odd = true;

        // linking the points, and fill in some color
        for (var y = 0; y < lines.length - 1; y++) {
            odd = !odd;
            dotLine = [];
            for (var i = 0; i < lines[y].length; i++) {
                dotLine.push(odd ? lines[y][i] : lines[y + 1][i]);
                dotLine.push(odd ? lines[y + 1][i] : lines[y][i]);
            }
            for (var i = 0; i < dotLine.length - 2; i++) {
                drawTriangle(dotLine[i], dotLine[i + 1], dotLine[i + 2]);
            }
        }

        function drawTriangle(pointA, pointB, pointC) {
            ctx.beginPath();
            ctx.moveTo(pointA.x, pointA.y);
            ctx.lineTo(pointB.x, pointB.y);
            ctx.lineTo(pointC.x, pointC.y);
            ctx.lineTo(pointA.x, pointA.y);
            ctx.closePath();
            var gray = Math.floor(Math.random() * 16).toString(16);
            ctx.fillStyle = "#" + gray + gray + gray;
            ctx.fill();
            ctx.stroke();
        }
    }
}
