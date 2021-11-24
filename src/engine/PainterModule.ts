/**
 * Represents a {@link WebAssembly.Module}, that exports the necessary functions to be used in a {@link CanvasEngine}. 
 */
export abstract class PainterModule {
    protected readonly module: WebAssembly.Module;

    /**
     * Instantiates a {@link PainterModule} by validating the {@link WebAssembly.Module}.
     */
    constructor(buffer: ArrayBuffer) {
        this.module = new WebAssembly.Module(buffer);
        
        if (!this.isValid()) throw new Error(`WebAssembly Module is not a valid ${this.constructor.name}`);
    }

    /**
     * Validates the {@link WebAssembly.Module} by checking if it exports the necessary functions.
     */
    protected abstract isValid(): boolean;

    /**
     * Returns the import object that is used to instantiate the {@link WebAssembly.Instance}.
     */
    protected abstract getImports(): WebAssembly.Imports;

    /**
     * Instantiates the {@link PainterModule} with an import object.
     */
    public abstract newInstance(): Promise<WebAssembly.Instance>;
}