import { Presenter } from "./presenter";
import { ControlGenerator } from "./controlGenerator";

export class View {
    private readonly presenter: Presenter;
    private readonly canvas: HTMLCanvasElement;
    private readonly controlGenerator: ControlGenerator;

    constructor(presenter: Presenter) {
        this.presenter = presenter;
        this.controlGenerator = new ControlGenerator(this.presenter);
        const canvas = document.querySelector<HTMLCanvasElement>("canvas");
        if (canvas === null) {
            throw new Error("The canvas element is missing.");
        }
        this.canvas = canvas;

        const size = 480;
        this.canvas.width = size;
        this.canvas.height = size;

        this.initialPatternSelection();
        this.hookEventListeners();
        this.settingHandler();
    }

    private initialPatternSelection(): void {
        const input = document.querySelector<HTMLSelectElement>(
            "#ddl_select_pattern"
        );
        if (input === null) {
            throw new Error("The pattern selector is missing.");
        }

        input.addEventListener("change", (event: Event) => {
            const target = event.currentTarget;
            if (!(target instanceof HTMLSelectElement)) {
                throw new Error("The pattern selector must be a select element.");
            }

            this.presenter.selectPattern(target.value);
            this.settingHandler();
        });

        const patternList = this.presenter.getPatternList();
        for (const pattern of patternList) {
            input.add(new Option(pattern, pattern));
        }

        const result = this.presenter.selectPerformantPatternRandomly();
        input.value = result;
        this.presenter.draw(this.canvas);
    }

    private hookEventListeners(): void {
        const generateButton = document.querySelector<HTMLButtonElement>(
            "#btn_generate"
        );
        const downloadLink = document.querySelector<HTMLAnchorElement>(
            "#a_download"
        );
        if (generateButton === null || downloadLink === null) {
            throw new Error("The generator controls are missing.");
        }

        generateButton.addEventListener("click", () => {
            this.presenter.draw(this.canvas);
        });

        this.canvas.addEventListener("click", () => {
            const image = this.canvas.toDataURL("image/png");
            downloadLink.download = "avatar.png";
            downloadLink.href = image;
        });
    }

    private settingHandler(): void {
        const container = document.querySelector<HTMLElement>("#setting_container");
        if (container === null) {
            throw new Error("The setting container is missing.");
        }

        this.controlGenerator.updateSettingControl(container);
    }
}
