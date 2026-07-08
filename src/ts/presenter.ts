import { PatternManager } from "./patternManager";
import { PatternSetting } from "./patterns/patternSetting";
import { IPatternSettingsPresenter } from "./patternSettingsPresenter.interface";

export class Presenter implements IPatternSettingsPresenter {
    patternManager: PatternManager;

    constructor(patternManager: PatternManager) {
        this.patternManager = patternManager;
    }

    selectPerformantPatternRandomly(): string {
        this.patternManager.selectPerformantRandomly();
        return this.patternManager.selected;
    }

    selectPattern(selection: string) {
        this.patternManager.selected = selection;
    }

    getPatternList(): Array<string> {
        return this.patternManager.patternNames;
    }

    getSelectedPatternName(): string {
        return this.patternManager.selected;
    }

    getSelectedPatternSetting(): PatternSetting {
        return this.patternManager.selectedSetting;
    }

    setSelectedPatternSetting(settingName: string, value: any): void {
        this.patternManager.selectedSetting.setValue(settingName, value);
        // TODO: error handling
    }

    draw(canvas: HTMLCanvasElement) {
        this.patternManager.draw(canvas);
    }
}
