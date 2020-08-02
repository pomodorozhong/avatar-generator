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
        for (let index = 1; index <= max_randomness; index++) {
          let opt = document.createElement("option");
          opt.appendChild(
            document.createTextNode((index as unknown) as string)
          );
          select.appendChild(opt);
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
