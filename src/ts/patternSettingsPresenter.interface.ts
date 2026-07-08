import { PatternSetting } from "./patterns/patternSetting";

export interface IPatternSettingsPresenter {
    getSelectedPatternName(): string;
    getSelectedPatternSetting(): PatternSetting;
    setSelectedPatternSetting(settingName: string, value: any): void;
}
