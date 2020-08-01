import { View } from "./view";
import { PatternManager } from "./patternManager";

export class Presenter {
    view: View;
    patternManager: PatternManager;

    constructor() {
        this.patternManager = new PatternManager();
        this.view = new View(this);
    }

    getPatternList(): Array<string> {
        return this.patternManager.patternNames;
    }

    getPatternSetting(patternName: string): Record<string, any> {
        return this.patternManager.selectedSetting;
    }

    draw(canvas: HTMLCanvasElement) {
        this.patternManager.draw(canvas);
    }
}
