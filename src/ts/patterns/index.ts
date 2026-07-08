import { IPattern } from "./pattern.interface";
import { CirclePacking } from "./circlePacking";
import { Cross } from "./cross";
import { CubicDisarray } from "./cubicDisarray";
import { TriangularMesh } from "./triangularMesh";

export function createPatterns(): IPattern[] {
    return [
        new CubicDisarray(),
        new Cross(),
        new TriangularMesh(),
        new CirclePacking(),
    ];
}
