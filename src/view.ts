export class View {
    canvas: HTMLCanvasElement;
    constructor() {
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
        var opt = document.createElement("option");
        opt.appendChild(document.createTextNode("Cross"));
        input.appendChild(opt);
    }

    hookEventListeners() {
        document.getElementById("btn_generate").addEventListener("click", draw);

        let self = this;
        function draw() {
            let ctx = self.canvas.getContext("2d");

            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, 480, 480);

            let width = 50;
            let height = width;

            let x = 50;
            let y = 50;
            // upper left to lower right
            for (let index = 0; index < 34; index++) {
                ctx.strokeRect(x, y, width, height);
                x += 10;
                y += 10;
            }

            x = 50;
            y = 480 - 100;
            // upper left to lower right
            for (let index = 0; index < 34; index++) {
                ctx.strokeRect(x, y, width, height);
                x += 10;
                y -= 10;
            }
        }
    }
}
