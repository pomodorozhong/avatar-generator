import { OptionTypeName, PatternSettingOption } from "./patterns/patternSetting";
import { Presenter } from "./presenter";

export class ControlGenerator {
  presenter: Presenter;

  constructor(presenter: Presenter) {
    this.presenter = presenter;
  }

  updateSettingControl(container: Node) {
    let patternName: string = this.presenter.getSelectedPatternName();
    let setting_options:
      | Array<PatternSettingOption>
      | undefined = this.presenter.getSelectedPatternSetting().getOptions();
    if (!setting_options) {
      throw new Error("setting_options is undefined");
    }

    // Clear the container
    while (container.firstChild) {
      container.removeChild(container.lastChild);
    }

    for (let index = 0; index < setting_options.length; index++) {
      const option: PatternSettingOption = setting_options[index];
      const element: OptionTypeName = option.type as OptionTypeName;

      switch (element) {
        case "numeric_range":
          this.handler_numeric_range(container, option);
          break;
        case "string":
        case "bool":
        default:
          throw new Error(`${element}'s Control Generation not implemented.`);
      }
    }
  }
  handler_numeric_range(container: Node, option: PatternSettingOption) {
    let a: HTMLAnchorElement = document.createElement("a");
    a.text = option.name;
    container.appendChild(a);

    let select: HTMLSelectElement = document.createElement("select");
    let start = option.range?.[0];
    let end = option.range?.[1];
    let step = option.range?.[2];
    if (start === undefined || end === undefined || step === undefined) {
      throw new Error(`${option.name}'s range is bad`);
    }
    for (let index = start; index <= end; index += step) {
      // round to first place after decimal
      index = Math.round(index * 10) / 10;

      let opt = document.createElement("option");
      opt.appendChild(document.createTextNode((index as unknown) as string));
      select.appendChild(opt);
    }
    let default_value: number = option.value;
    for (let index = start; index <= end; index += step) {
      const opt: HTMLOptionElement = select.options[index];
      if (default_value == index) {
        opt.selected = true;
      }
    }
    container.appendChild(select);

    let self = this;
    select.addEventListener(
      "change",
      (e: any) => {
        let value = e.target.value;
        self.presenter.setSelectedPatternSetting(option.name, value);
      },
      false
    );
  }
}
