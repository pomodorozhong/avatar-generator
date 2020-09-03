import { IPattern } from "./pattern.interface";

export class CubicDisarray implements IPattern {
  name: string;
  settings: Record<string, any>;

  constructor() {
    this.name = "CubicDisarray";
    this.settings = {
      randomness: 0,
      compactness: 0,
    };

    this.settings["randomness"] = 1;
    this.settings["compactness"] = 12;
  }

  draw(canvas: HTMLCanvasElement) {
    let ctx = canvas.getContext("2d");

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 480, 480);

    var size = 480;
    ctx.lineWidth = 2;

    var randomDisplacement = 15;
    var rotateMultiplier = 20;
    var offset = 10;
    var squareNumOneRow = this.settings["compactness"];
    var squareSize = (size - 2 * offset) / squareNumOneRow;

    function drawRect(width, height) {
      ctx.beginPath();
      ctx.rect(-width / 2, -height / 2, width, height);
      ctx.stroke();
    }

    let xLimit = size - squareSize - offset;
    let yLimit = size - squareSize - offset;
    for (var x = squareSize; x <= xLimit; x += squareSize) {
      for (var y = squareSize; y <= yLimit; y += squareSize) {
        var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
        var rotateAmt =
          (((y / size) * Math.PI) / 180) *
          plusOrMinus *
          Math.random() *
          this.settings["randomness"] *
          rotateMultiplier;

        plusOrMinus = Math.random() < 0.5 ? -1 : 1;
        var translateAmt =
          (y / size) *
          plusOrMinus *
          Math.random() *
          this.settings["randomness"] *
          randomDisplacement;

        ctx.save();
        ctx.translate(x + translateAmt + offset, y + offset);
        ctx.rotate(rotateAmt);
        drawRect(squareSize, squareSize);
        ctx.restore();
      }
    }
  }
}
