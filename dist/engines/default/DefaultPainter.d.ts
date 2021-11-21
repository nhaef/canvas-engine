import { DefaultCanvasState } from "./DefaultCanvasState";
import { PainterDirection } from "../../PainterDirection";
export interface DefaultPainter extends WebAssembly.Instance {
    exports: {
        init(width: number, height: number): void;
        next(state: DefaultCanvasState, x: number, y: number): void;
        getLastActionColor(): number;
        getLastActionDirection(): PainterDirection;
    };
}
export declare function objIsDefaultPainter(instance: WebAssembly.Instance): instance is DefaultPainter;
