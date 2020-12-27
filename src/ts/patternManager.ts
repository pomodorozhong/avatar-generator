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
    patterns: Record<PatternName, IPattern>;
    patternNames: Array<string>;
    private patternNamesOfPerformants: Array<string>;
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
        this.patternNamesOfPerformants = [
            this.patternNames[0],
            this.patternNames[1],
            this.patternNames[2],
            this.patternNames[3],
        ];
    }

    selectPerformantRandomly(): void {
        let length: number = this.patternNamesOfPerformants.length;
        let selection: number = Math.floor(Math.random() * length) % length;
        let selectionName: string = this.patternNamesOfPerformants[selection];
        
        this.selected = selectionName;
    }

    initPatterns() {
        this.patterns = {
            Cross: new Cross(),
            CubicDisarray: new CubicDisarray(),
            TriangularMesh: new TriangularMesh(),
            CirclePacking: new CirclePacking(),
        };
    }

    draw(canvas: HTMLCanvasElement) {
        this.patterns[this.selected].draw(canvas);
    }
}
