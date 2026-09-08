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
                20,
                200,
                20,
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

    draw(canvas: HTMLCanvasElement): void {
        const ctx = canvas.getContext("2d");

        if (ctx === null) {
            throw new Error("The 2D canvas context is unavailable.");
        }

        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, 480, 480);

        const size = 480;
        ctx.lineWidth = 2;
        ctx.lineJoin = "bevel";

        const circles: Circle[] = [];
        const minRadius = 2;
        const maxRadius = this.settings.getNumericValue("max radius");
        const totalCircles = 500;
        const createCircleAttempts = 500;
        const gap = this.settings.getNumericValue("gap");

        const createAndDrawCircle = (): void => {
            let circleToDraw: Circle | undefined;
            for (let tries = 0; tries < createCircleAttempts; tries++) {
                const candidate = {
                    x: Math.floor(Math.random() * size),
                    y: Math.floor(Math.random() * size),
                    radius: minRadius,
                };

                if (!doesCircleHaveACollision(candidate)) {
                    circleToDraw = candidate;
                    break;
                }
            }

            if (circleToDraw === undefined) {
                return;
            }

            for (let radius = minRadius; radius < maxRadius; radius++) {
                circleToDraw.radius = radius;
                if (doesCircleHaveACollision(circleToDraw)) {
                    circleToDraw.radius--;
                    break;
                }
            }

            circles.push(circleToDraw);
            ctx.beginPath();
            ctx.arc(
                circleToDraw.x,
                circleToDraw.y,
                circleToDraw.radius,
                0,
                2 * Math.PI
            );
            ctx.stroke();
        };

        const doesCircleHaveACollision = (circle: Circle): boolean => {
            for (const otherCircle of circles) {
                const minimumDistance = circle.radius + otherCircle.radius;
                const x = circle.x - otherCircle.x;
                const y = circle.y - otherCircle.y;

                if (minimumDistance >= Math.sqrt(x * x + y * y) - gap) {
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
        };

        for (let i = 0; i < totalCircles; i++) {
            createAndDrawCircle();
        }
    }
}

interface Circle {
    x: number;
    y: number;
    radius: number;
}
