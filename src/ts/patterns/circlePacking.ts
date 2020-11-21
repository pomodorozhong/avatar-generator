import { IPattern } from "./pattern.interface";
import { PatternSetting, PatternSettingOption } from "./patternSetting";

export class CirclePacking implements IPattern {
    name: string;
    settings: PatternSetting;

    constructor() {
        this.name = "CirclePacking";
        this.settings = new PatternSetting();
        this.settings.addOption(
            new PatternSettingOption("max radius", "numeric_range", 100, [
                10,
                150,
                10,
            ])
        );
        this.settings.addOption(
            new PatternSettingOption("gap", "numeric_range", 0, [
                0,
                30,
                5,
            ])
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

        let circles: Array<Circle> = [];
        let min_radius: number = 2;
        let max_radius: number = this.settings.getValue("max radius");
        let total_circles: number = 500;
        let create_circle_attempts: number = 500;
        let gap: number = this.settings.getValue("gap");

        let self = this;

        function createAndDrawCircle() {
            let new_circle: Circle;
            let circleSafeToDraw: boolean = false;
            for (
                let tries: number = 0;
                tries < create_circle_attempts;
                tries++
            ) {
                new_circle = {
                    x: Math.floor(Math.random() * size),
                    y: Math.floor(Math.random() * size),
                    radius: min_radius,
                };

                if (doesCircleHaveACollision(new_circle)) {
                    continue;
                } else {
                    circleSafeToDraw = true;
                    break;
                }
            }

            if (!circleSafeToDraw) {
                return;
            }

            for (
                let radiusSize: number = min_radius;
                radiusSize < max_radius;
                radiusSize++
            ) {
                new_circle.radius = radiusSize;
                if (doesCircleHaveACollision(new_circle)) {
                    new_circle.radius--;
                    break;
                }
            }

            circles.push(new_circle);
            ctx.beginPath();
            ctx.arc(
                new_circle.x,
                new_circle.y,
                new_circle.radius,
                0,
                2 * Math.PI
            );
            ctx.stroke();
        }

        function doesCircleHaveACollision(circle: Circle) {
            for (let i: number = 0; i < circles.length; i++) {
                let otherCircle: Circle = circles[i];
                let a: number = circle.radius + otherCircle.radius;
                let x: number = circle.x - otherCircle.x;
                let y: number = circle.y - otherCircle.y;

                if (a >= Math.sqrt(x * x + y * y) - gap) {
                    return true;
                }
            }

            if (
                circle.x + circle.radius >= size ||
                circle.x - circle.radius <= 0
            ) {
                return true;
            }

            if (
                circle.y + circle.radius >= size ||
                circle.y - circle.radius <= 0
            ) {
                return true;
            }

            return false;
        }

        for (let i: number = 0; i < total_circles; i++) {
            createAndDrawCircle();
        }
    }
}

class Circle {
    x: number;
    y: number;
    radius: number;

    constructor(x: number, y: number, radius: number) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }
}
