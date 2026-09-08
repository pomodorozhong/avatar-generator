import type { IPattern } from "./patterns/pattern.interface";
import { Cross } from "./patterns/cross";
import { CubicDisarray } from "./patterns/cubicDisarray";
import { PatternSetting } from "./patterns/patternSetting";
import { TriangularMesh } from "./patterns/triangularMesh";
import { CirclePacking } from "./patterns/circlePacking";

const patternNames = [
    "CubicDisarray",
    "Cross",
    "TriangularMesh",
    "CirclePacking",
] as const;
export type PatternName = (typeof patternNames)[number];

function isPatternName(selection: string): selection is PatternName {
    return patternNames.some((patternName) => patternName === selection);
}

export class PatternManager {
    private readonly patterns: Record<PatternName, IPattern>;
    readonly patternNames: readonly PatternName[] = patternNames;
    private readonly patternNamesOfPerformants: readonly PatternName[] = patternNames;
    private _selected: PatternName = patternNames[0];

    set selected(selection: string) {
        if (!isPatternName(selection)) {
            throw new Error(`${selection} is not a valid pattern.`);
        }

        this._selected = selection;
    }

    get selected(): PatternName {
        return this._selected;
    }

    get selectedSetting(): PatternSetting {
        return this.patterns[this.selected].settings;
    }

    constructor() {
        this.patterns = {
            Cross: new Cross(),
            CubicDisarray: new CubicDisarray(),
            TriangularMesh: new TriangularMesh(),
            CirclePacking: new CirclePacking(),
        };
    }

    selectPerformantRandomly(): void {
        const selection = Math.floor(
            Math.random() * this.patternNamesOfPerformants.length
        );
        const selectionName = this.patternNamesOfPerformants[selection];

        this.selected = selectionName;
    }

    draw(canvas: HTMLCanvasElement): void {
        this.patterns[this.selected].draw(canvas);
    }
}
