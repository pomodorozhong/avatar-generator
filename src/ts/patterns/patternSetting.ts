const optionTypes = ["numeric_range", "bool", "string"] as const;

export type OptionTypeName = (typeof optionTypes)[number];
export type PatternSettingValue = number | boolean | string;
export type NumericRange = readonly [start: number, end: number, step: number];

export class PatternSettingOption {
    readonly name: string;
    readonly type: OptionTypeName;
    value: PatternSettingValue;
    readonly range?: NumericRange;
    readonly stringPool?: readonly string[];

    constructor(
        name: string,
        type: OptionTypeName,
        value: PatternSettingValue,
        range?: NumericRange,
        stringPool?: readonly string[]
    ) {
        switch (type) {
            case "numeric_range":
                if (range === undefined) {
                    throw new Error("'numeric_range' type is selected, but 'range' undefined.");
                }
                if (typeof value !== "number") {
                    throw new Error("'numeric_range' options require a number value.");
                }
                break;
            case "bool":
                if (typeof value !== "boolean") {
                    throw new Error("'bool' options require a boolean value.");
                }
                break;
            case "string":
                if (stringPool === undefined || typeof value !== "string") {
                    throw new Error("'string' type is selected, but 'stringPool' is invalid.");
                }
                break;
        }

        this.name = name;
        this.type = type;
        this.value = value;
        this.range = range;
        this.stringPool = stringPool;
    }
}

export class PatternSetting {
    private readonly options: PatternSettingOption[] = [];

    addOption(option: PatternSettingOption): void {
        this.options.push(option);
    }

    getValue(optionName: string): PatternSettingValue {
        return this.findOption(optionName).value;
    }

    getNumericValue(optionName: string): number {
        const value = this.getValue(optionName);
        if (typeof value !== "number") {
            throw new Error(`${optionName} is not a numeric option.`);
        }

        return value;
    }

    setValue(optionName: string, value: PatternSettingValue): void {
        const option = this.findOption(optionName);

        switch (option.type) {
            case "numeric_range": {
                if (typeof value === "boolean") {
                    throw new Error(`${optionName} must be a number.`);
                }
                const numericValue = typeof value === "number" ? value : Number(value);
                if (!Number.isFinite(numericValue)) {
                    throw new Error(`${optionName} must be a finite number.`);
                }
                option.value = numericValue;
                return;
            }
            case "bool":
                if (typeof value !== "boolean") {
                    throw new Error(`${optionName} must be a boolean.`);
                }
                option.value = value;
                return;
            case "string":
                option.value = String(value);
                return;
        }
    }

    getOptions(): readonly PatternSettingOption[] {
        return this.options;
    }

    private findOption(optionName: string): PatternSettingOption {
        const option = this.options.find(({ name }) => name === optionName);
        if (option === undefined) {
            throw new Error(`${optionName} is not an option.`);
        }

        return option;
    }
}
