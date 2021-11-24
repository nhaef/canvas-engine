import { Direction } from "../types/Direction";


export interface DefaultPainterInstance extends WebAssembly.Instance {
    exports: {
        init(width: number, height: number): void;
        next(): void;
        getLastActionColor(): number;
        getLastActionDirection(): Direction;
    }
}