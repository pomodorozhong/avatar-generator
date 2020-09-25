const optionType = ["numeric_range", "bool", "string"] as const;

export type OptionTypeName = typeof optionType[number];
export class PatternSettingOption {
    name: string;
    type: OptionTypeName;
    value: any;
    range?: [start: number, end: number, step: number] | undefined;
    string_pool?: [string] | undefined;

    constructor(
        name: string,
        type: OptionTypeName,
        value: any,
        range?: [start: number, end: number, step: number] | undefined,
        string_pool?: [string] | undefined
    ) {
        switch (type) {
            case "numeric_range":
                if (range == undefined) {
                    throw new Error("'numeric_range' type is selected, but 'range' undefined.");
                }
                break;
            case "string":
                if (string_pool == undefined) {
                    throw new Error("'string' type is selected, but 'string_pool' undefined.");
                }
                break;

            default:
                break;
        }

        this.name = name;
        this.type = type;
        this.value = value;
        this.range = range;
        this.string_pool = string_pool;
    }
}
export class PatternSetting {
    private options?: Array<PatternSettingOption> | undefined;
    constructor() {}
    addOption(option: PatternSettingOption): void {
        if (this.options === undefined) {
            this.options = new Array<PatternSettingOption>();
        }
        this.options.push(option);
    }
    getValue(optionName: string): any {
        if (this.options === undefined) {
            throw new Error("this.options === undefined");
        }

        let value: any | undefined;
        for (let option of this.options) {
            if (option.name == optionName) {
                value = option.value;
            }
        }
        if (!value) {
            throw new Error(`${optionName} is not an option.`);
        }
        return value;
    }
    setValue(optionName: string, value: any): void {
        if (this.options === undefined) {
            throw new Error("this.options === undefined");
        }

        for (let option of this.options) {
            if (option.name == optionName) {
                option.value = value;
            }
        }
        if (!value) {
            throw new Error(`${optionName} is not an option.`);
        }
    }
    getOptions(): Array<PatternSettingOption> | undefined {
        return this.options;
    }
}
