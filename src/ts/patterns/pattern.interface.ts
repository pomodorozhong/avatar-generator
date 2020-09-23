export interface IPattern {
    name: string;
    settings: Record<string, any>;

    draw(canvas: HTMLCanvasElement);
}
