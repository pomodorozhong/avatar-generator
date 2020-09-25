import { IPattern } from "./pattern.interface";
import { PatternSetting, PatternSettingOption } from "./patternSetting";

export class CubicDisarray implements IPattern {
  name: string;
  settings: PatternSetting;

  constructor() {
    this.name = "CubicDisarray";
    this.settings = new PatternSetting();
    this.settings.addOption(
      new PatternSettingOption("randomness", "numeric_range", 1, [0.4, 2, 0.2])
    );
    this.settings.addOption(
      new PatternSettingOption("compactness", "numeric_range", 12, [6, 20, 1])
    );
  }

  draw(canvas: HTMLCanvasElement) {
    let ctx = canvas.getContext("2d");

    if (ctx == null) {
      throw new Error("ctx == null");
    }

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 480, 480);

    var size = 480;
    ctx.lineWidth = 2;

    var randomDisplacement = 15;
    var rotateMultiplier = 20;
    var offset = 10;
    var squareNumOneRow = this.settings.getValue("compactness");
    squareNumOneRow = parseInt(squareNumOneRow) + 1;
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
          this.settings.getValue("randomness") *
          rotateMultiplier;

        plusOrMinus = Math.random() < 0.5 ? -1 : 1;
        var translateAmt =
          (y / size) *
          plusOrMinus *
          Math.random() *
          this.settings.getValue("randomness") *
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
