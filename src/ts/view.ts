import { Presenter } from "./presenter";
import { ControlGenerator } from "./controlGenerator";

export class View {
    presenter: Presenter;
    canvas: HTMLCanvasElement;
    controlGenerator: ControlGenerator;

    constructor(presenter: Presenter) {
        this.presenter = presenter;
        this.controlGenerator = new ControlGenerator(this.presenter);
        this.canvas = document.getElementsByTagName("canvas")[0];

        let size: number = 480;
        this.canvas.width = size;
        this.canvas.height = size;

        this.initialPatternSelection();
        this.hookEventListeners();
        this.settingHandler();
    }

    initialPatternSelection() {
        let input: HTMLSelectElement = <HTMLSelectElement>(
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
        document.getElementById("btn_generate").addEventListener("click", draw);
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

        this.controlGenerator.updateSettingControl(container);
    }
}
