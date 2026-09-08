import type {
    OptionTypeName,
    PatternSettingOption,
} from "./patterns/patternSetting";
import { Presenter } from "./presenter";

export class ControlGenerator {
    private readonly presenter: Presenter;

    constructor(presenter: Presenter) {
        this.presenter = presenter;
    }

    updateSettingControl(container: HTMLElement): void {
        const settingOptions = this.presenter.getSelectedPatternSetting().getOptions();

        // Clear the container
        while (container.lastChild) {
            container.removeChild(container.lastChild);
        }

        for (const option of settingOptions) {
            const element: OptionTypeName = option.type;
            switch (element) {
                case "numeric_range":
                    this.handleNumericRange(container, option);
                    break;
                case "string":
                case "bool":
                    throw new Error(`${element}'s Control Generation not implemented.`);
            }
        }
    }

    private handleNumericRange(
        container: HTMLElement,
        option: PatternSettingOption
    ): void {
        const controlId = option.name;
        const range = option.range;
        if (range === undefined) {
            throw new Error(`${option.name}'s range is bad`);
        }

        const [start, end, step] = range;
        if (step <= 0 || start > end) {
            throw new Error(`${option.name}'s range is bad`);
        }

        const span = document.createElement("span");
        span.innerText = option.name;
        const label = document.createElement("label");
        label.htmlFor = controlId;
        label.appendChild(span);

        const select = document.createElement("select");
        select.id = controlId;
        const numberOfSteps = Math.floor((end - start) / step);
        for (let index = 0; index <= numberOfSteps; index++) {
            const value = Number((start + index * step).toFixed(1));
            const displayValue = String(value);
            select.add(new Option(displayValue, displayValue));
        }

        select.value = String(option.value);
        container.append(label, select);

        select.addEventListener("change", (event: Event) => {
            const target = event.currentTarget;
            if (!(target instanceof HTMLSelectElement)) {
                throw new Error("The setting control must be a select element.");
            }

            this.presenter.setSelectedPatternSetting(option.name, target.value);
        });
    }
}
