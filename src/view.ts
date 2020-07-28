import { Presenter } from "./presenter";

export class View {
    presenter: Presenter;
    canvas: HTMLCanvasElement;
    constructor(presenter: Presenter) {
        this.presenter = presenter;
        this.canvas = document.getElementsByTagName("canvas")[0];

        let size: number = 480;
        this.canvas.width = size;
        this.canvas.height = size;

        this.initialPatternSelection();
        this.hookEventListeners();
    }

    initialPatternSelection() {
        let input: HTMLInputElement = <HTMLInputElement>(
            document.getElementById("ddl_select_pattern")
        );
        input.addEventListener("change", pattern_selected, false);

        let pattern_list = this.presenter.getPatternList();
        for (let index = 0; index < pattern_list.length; index++) {
            const pattern = pattern_list[index];
            var opt = document.createElement("option");
            opt.appendChild(document.createTextNode(pattern));
            input.appendChild(opt);
        }

        let self = this;
        function pattern_selected(e: any) {
            let pattern = e.target.value;
            let setting = self.presenter.getPatternSetting(pattern);
            self.settingHandler(setting);
        }
    }

    hookEventListeners() {
        document.getElementById("btn_generate").addEventListener("click", draw);

        let self = this;
        function draw() {
            self.presenter.draw(self.canvas);
        }
    }

    settingHandler(setting) {
        console.log("settingHandler()  not implemented");
    }
}
