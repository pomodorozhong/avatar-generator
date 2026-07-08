import { IPattern } from "./patterns/pattern.interface";
import { PatternSetting } from "./patterns/patternSetting";

export class PatternManager {
    patterns: Record<string, IPattern>;
    patternNames: Array<string>;
    private patternNamesOfPerformants: Array<string>;
    private _selected: string;

    set selected(selection: string) {
        if (!this.patterns[selection]) {
            throw new Error(`Unknown pattern: ${selection}`);
        }
        this._selected = selection;
    }

    get selected(): string {
        return this._selected;
    }

    get selectedSetting(): PatternSetting {
        return this.patterns[this.selected].settings;
    }

    constructor(patterns: IPattern[]) {
        this.patterns = {};
        for (const pattern of patterns) {
            this.patterns[pattern.name] = pattern;
        }

        this.patternNames = patterns.map((pattern) => pattern.name);
        this.patternNamesOfPerformants = [...this.patternNames];
        this.selected = this.patternNames[0];
    }

    selectPerformantRandomly(): void {
        let length: number = this.patternNamesOfPerformants.length;
        let selection: number = Math.floor(Math.random() * length) % length;
        let selectionName: string = this.patternNamesOfPerformants[selection];

        this.selected = selectionName;
    }

    draw(canvas: HTMLCanvasElement) {
        this.patterns[this.selected].draw(canvas);
    }
}
