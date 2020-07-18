let canvas = document.getElementsByTagName("canvas")[0];
canvas.width = 480;
canvas.height = 480;
let ctx: CanvasRenderingContext2D = canvas.getContext("2d");

draw();

function draw() {
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
