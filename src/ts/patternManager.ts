import { IPattern } from "./patterns/pattern.interface";
import { Cross } from "./patterns/cross";
import { CubicDisarray } from "./patterns/cubicDisarray";
import { PatternSetting } from "./patterns/patternSetting";
import { TriangularMesh } from "./patterns/triangularMesh";
import { CirclePacking } from "./patterns/circlePacking";

const patternName = [
    "CubicDisarray",
    "Cross",
    "TriangularMesh",
    "CirclePacking",
    // placeholder
] as const;
export type PatternName = typeof patternName[number];

export class PatternManager {
    patterns: Record<PatternName, IPattern> = {
        Cross: new Cross(),
        CubicDisarray: new CubicDisarray(),
        TriangularMesh: new TriangularMesh(),
        CirclePacking: new CirclePacking(),
    };
    patternNames: Array<PatternName> = [...patternName];
    private patternNamesOfPerformants: Array<PatternName> = [...patternName];
    private _selected: PatternName = patternName[0];

    set selected(selection: string) {
        if (!patternName.some((name) => name === selection)) {
            throw new Error(`${selection} is not a pattern.`);
        }

        this._selected = selection as PatternName;
    }
    get selected(): PatternName {
        return this._selected;
    }
    get selectedSetting(): PatternSetting {
        return this.patterns[this._selected].settings;
    }

    selectPerformantRandomly(): void {
        let length: number = this.patternNamesOfPerformants.length;
        let selection: number = Math.floor(Math.random() * length) % length;
        let selectionName: PatternName = this.patternNamesOfPerformants[selection];
        
        this.selected = selectionName;
    }

    draw(canvas: HTMLCanvasElement) {
        this.patterns[this._selected].draw(canvas);
    }
}
