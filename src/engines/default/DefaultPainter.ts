import { DefaultCanvasState } from "./DefaultCanvasState";
import { PainterDirection } from "../../PainterDirection";

export interface DefaultPainter extends WebAssembly.Instance {
    exports: {
        init(width: number, height: number): void;
        next(state: DefaultCanvasState, x: number, y: number): void;
        getLastActionColor(): number;
        getLastActionDirection(): PainterDirection;
    }
}

export function objIsDefaultPainter(instance: WebAssembly.Instance): instance is DefaultPainter {
    return true &&
        typeof instance.exports === "object" &&
        typeof instance.exports.init === "function" &&
        typeof instance.exports.next === "function" &&
        typeof instance.exports.getLastActionColor === "function" &&
        typeof instance.exports.getLastActionDirection === "function";
}