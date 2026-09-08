import { Presenter } from "./presenter";
import { ControlGenerator } from "./controlGenerator";

export class View {
    presenter: Presenter;
    canvas: HTMLCanvasElement;
    controlGenerator: ControlGenerator;

    constructor(presenter: Presenter) {
        this.presenter = presenter;
        this.controlGenerator = new ControlGenerator(this.presenter);
        const canvas = document.querySelector("canvas");
        if (!canvas) {
            throw new Error("Canvas element not found.");
        }
        this.canvas = canvas;

        let size: number = 480;
        this.canvas.width = size;
        this.canvas.height = size;

        this.initialPatternSelection();
        this.hookEventListeners();
        this.settingHandler();
    }

    initialPatternSelection() {
        let input = document.querySelector<HTMLSelectElement>(
            "#ddl_select_pattern"
        );
        if (!input) {
            throw new Error("Pattern selector not found.");
        }
        input.addEventListener("change", pattern_selected, false);

        let pattern_list = this.presenter.getPatternList();
        for (let index = 0; index < pattern_list.length; index++) {
            const pattern = pattern_list[index];
            var opt = document.createElement("option");
            opt.appendChild(document.createTextNode(pattern));
            input.appendChild(opt);
        }

        let result: string = this.presenter.selectPerformantPatternRandomly();
        input.selectedIndex = pattern_list.indexOf(result);
        this.presenter.draw(this.canvas);

        let self = this;
        function pattern_selected(e: any) {
            let pattern = e.target.value;
            self.presenter.selectPattern(pattern);
            self.settingHandler();
        }
    }

    hookEventListeners() {
        const generateButton = document.getElementById("btn_generate");
        if (!generateButton) {
            throw new Error("Generate button not found.");
        }
        generateButton.addEventListener("click", draw);
        this.canvas.addEventListener("click", download);

        let self = this;
        function draw() {
            self.presenter.draw(self.canvas);
        }

        function download() {
            var image = self.canvas
                .toDataURL("image/png")
                .replace("image/png", "image/octet-stream"); //Convert image to 'octet-stream' (Just a download, really)

            var a = document.getElementById("a_download");
            a?.setAttribute("download", "avatar.png");
            a?.setAttribute("href", image);
        }
    }

    settingHandler() {
        let container = document.getElementById("setting_container");
        if (!container) {
            throw new Error("Setting container not found.");
        }

        this.controlGenerator.updateSettingControl(container);
    }
}
