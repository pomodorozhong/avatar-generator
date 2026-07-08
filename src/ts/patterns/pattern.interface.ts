import { PatternSetting } from "./patternSetting";

export interface IPattern {
    name: string;
    settings: PatternSetting;

    draw(canvas: HTMLCanvasElement): void;
}
