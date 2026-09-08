import { View } from "./view";
import { PatternManager } from "./patternManager";
import type { PatternName } from "./patternManager";
import type { PatternSetting, PatternSettingValue } from "./patterns/patternSetting";

export class Presenter {
    private readonly patternManager: PatternManager;

    constructor() {
        this.patternManager = new PatternManager();
        new View(this);
    }

    selectPerformantPatternRandomly(): PatternName {
        this.patternManager.selectPerformantRandomly();
        return this.patternManager.selected;
    }

    selectPattern(selection: string): void {
        this.patternManager.selected = selection;
    }

    getPatternList(): readonly PatternName[] {
        return this.patternManager.patternNames;
    }

    getSelectedPatternName(): string {
        return this.patternManager.selected;
    }

    getSelectedPatternSetting(): PatternSetting {
        return this.patternManager.selectedSetting;
    }

    setSelectedPatternSetting(
        settingName: string,
        value: PatternSettingValue
    ): void {
        this.patternManager.selectedSetting.setValue(settingName, value);
    }

    draw(canvas: HTMLCanvasElement): void {
        this.patternManager.draw(canvas);
    }
}
