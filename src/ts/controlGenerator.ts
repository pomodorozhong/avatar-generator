import { Presenter } from "./presenter";

export class ControlGenerator {
  presenter: Presenter;

  constructor(presenter: Presenter) {
    this.presenter = presenter;
  }

  updateSettingControl(container: Node) {
    let patternName: string = this.presenter.getSelectedPatternName();
    let settings: Record<
      string,
      any
    > = this.presenter.getSelectedPatternSetting();

    switch (patternName) {
      case "Cross":
        this.cross(container, settings);
        break;
      case "CubicDisarray":
        this.cubicDisarray(container, settings);
        break;

      default:
        console.log(patternName + "'s Control Generation not implemented.");
        break;
    }
  }
  cross(container: Node, settings: Record<string, any>) {
    // Clear the container
    while (container.firstChild) {
      container.removeChild(container.lastChild);
    }

    for (const key in settings) {
      if (key == "randomness") {
        let a = document.createElement("a");
        a.text = key;
        container.appendChild(a);

        let select = document.createElement("select");
        let max_randomness = 4;
        for (let index = 0; index <= max_randomness; index++) {
          let opt = document.createElement("option");
          opt.appendChild(
            document.createTextNode((index as unknown) as string)
          );
          select.appendChild(opt);
        }
        let default_value = settings[key];
        for (let index = 0; index < select.options.length; index++) {
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
            self.presenter.setSelectedPatternSetting(key, value);
          },
          false
        );
      }
    }
  }
  cubicDisarray(container: Node, settings: Record<string, any>) {
    // Clear the container
    while (container.firstChild) {
      container.removeChild(container.lastChild);
    }

    for (const key in settings) {
      if (key == "randomness") {
        let a = document.createElement("a");
        a.text = key;
        container.appendChild(a);

        let select = document.createElement("select");
        let min_randomness = 0.4;
        let max_randomness = 2;
        for (
          let index = min_randomness;
          index <= max_randomness;
          index += 0.2
        ) {
          index = Math.round(index * 10) / 10;
          let opt = document.createElement("option");
          opt.appendChild(
            document.createTextNode((index as unknown) as string)
          );
          select.appendChild(opt);
        }
        let default_value = settings[key];
        for (let index = 0; index < select.options.length; index++) {
          const opt: HTMLOptionElement = select.options[index];
          if (default_value == select.options[index].text) {
            opt.selected = true;
          }
        }
        container.appendChild(select);

        let self = this;
        select.addEventListener(
          "change",
          (e: any) => {
            let value = e.target.value;
            self.presenter.setSelectedPatternSetting(key, value);
          },
          false
        );
      }

      if (key == "compactness") {
        let a = document.createElement("a");
        a.text = key;
        container.appendChild(a);

        let select = document.createElement("select");
        let min_compactness = 6;
        let max_compactness = 20;
        for (let index = min_compactness; index <= max_compactness; index++) {
          let opt = document.createElement("option");
          opt.appendChild(
            document.createTextNode((index as unknown) as string)
          );
          select.appendChild(opt);
        }
        let default_value = settings[key];
        for (let index = 0; index < select.options.length; index++) {
          const opt: HTMLOptionElement = select.options[index];
          if (default_value == select.options[index].text) {
            opt.selected = true;
          }
        }
        container.appendChild(select);

        let self = this;
        select.addEventListener(
          "change",
          (e: any) => {
            let value = e.target.value;
            self.presenter.setSelectedPatternSetting(key, value);
          },
          false
        );
      }
    }
  }
}
