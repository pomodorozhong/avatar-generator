import { View } from "./view";
import { PatternManager } from "./patternManager";

export class Presenter {
    view: View;
    patternManager: PatternManager;

    constructor() {
        this.patternManager = new PatternManager();
        this.view = new View(this);
    }

    selectPattern(selection: string) {
        this.patternManager.selected = selection;
    }

    getPatternList(): Array<string> {
        return this.patternManager.patternNames;
    }

    getSelectedPatternSetting(): Record<string, any> {
        return this.patternManager.selectedSetting;
    }

    draw(canvas: HTMLCanvasElement) {
        this.patternManager.draw(canvas);
    }
}
