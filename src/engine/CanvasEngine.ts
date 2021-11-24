import { CanvasEngineType } from "./types/CanvasEngineType";

/**
 * Represents an abstract canvas engine.
 */
export abstract class CanvasEngine {
    /**
     * The type of the {@link CanvasEngine} implementation.
     */
    protected abstract type: CanvasEngineType; 

    /**
     * Get the type of the {@link CanvasEngine} implementation.
     * @returns the {@link CanvasEngineType}
     */
    public getType(): CanvasEngineType {
        return this.type;
    }

    /**
     * The painters of the engine.
     */
    protected abstract painters: WebAssembly.Instance[];

    /**
     * Tells the engine to run the next step.
     */
    public abstract next(): void;

    /**
     * @returns A representation of the current {@link CanvasEngine} state.
     */
    public abstract getState(): any;
}