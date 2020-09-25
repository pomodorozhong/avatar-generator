import { IPattern } from "./patterns/pattern.interface";
import { Cross } from "./patterns/cross";
import { CubicDisarray } from "./patterns/cubicDisarray";
import { PatternSetting } from "./patterns/patternSetting";

const patternName = [
    "CubicDisarray",
    "Cross",
    // placeholder
] as const;
export type PatternName = typeof patternName[number];

export class PatternManager {
    patterns: Record<PatternName, IPattern>;
    patternNames: Array<string>;
    private _selected: PatternName;
    set selected(selection: string) {
        this._selected = <PatternName>selection;
    }
    get selected(): string {
        return this._selected;
    }
    get selectedSetting(): PatternSetting {
        return this.patterns[this.selected].settings;
    }

    constructor() {
        this.initPatterns();
        this.selected = patternName[0];

        this.patternNames = (patternName as any) as Array<string>;
    }

    initPatterns() {
        this.patterns = {
            Cross: new Cross(),
            CubicDisarray: new CubicDisarray(),
        };
    }

    draw(canvas: HTMLCanvasElement) {
        this.patterns[this.selected].draw(canvas);
    }
}
