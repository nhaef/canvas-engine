import { PainterDirection } from "../../PainterDirection";
import { DefaultCanvasState } from "./DefaultCanvasState";
import { DefaultPainter, objIsDefaultPainter } from "./DefaultPainter";

/**
 * Represents a 2D canvas that enables the painters to move around and draw on the canvas.
 */
export class DefaultCanvasEngine {

    public static readonly DEFAULT_COLOR = 0xFFFFFFFF;

    private tick: number;
    private width: number;
    private height: number;

    private painterInstances: { [index: number]: DefaultPainter };
    private painterPositions: { [index: number]: { x: number, y: number } };
    private state: DefaultCanvasState;

    /**
     * Instantiate a new {@link DefaultCanvasEngine}
     * @param width the width in pixels of the canvas
     * @param height the height in pixels of the canvas
     * @param painters the painters to use
     */
    private constructor(width: number, height: number) {
        if (width < 1 || height < 1) throw new Error("Invalid canvas size");

        this.tick = 0;
        this.width = width;
        this.height = height;

        this.painterInstances = {};
        this.painterPositions = {};
        this.state = DefaultCanvasEngine.createNewCanvasState(width, height);
    }

    public getWidth(): number {
        return this.width;
    }

    public getHeight(): number {
        return this.height;
    }

    public getState(): DefaultCanvasState {
        return this.state;
    }

    /**
     * Instantiates a new {@link DefaultCanvasEngine} along with the given painters.
     * @param width the width in pixels of the canvas
     * @param height the height in pixels of the canvas
     * @param painterModules the painters to use
     * @returns the new canvas engine instance
     */
    public static async newInstance(width: number, height: number, painterModules: WebAssembly.Module[]): Promise<DefaultCanvasEngine> {
        if (painterModules.length < 1) throw new Error("No painters provided");
        
        const engine = new DefaultCanvasEngine(width, height);
        for (const painterModule of painterModules) {
            await engine.addPainter(painterModule);
        }

        return engine;
    }

    /**
     * Instantiates a new painter and adds it to the engine.
     * @param painterModuleIndex the index of the painter module to instantiate
     */
     private async addPainter(painterModule: WebAssembly.Module): Promise<void> {
        const painterIndex = Object.keys(this.painterInstances).length;

        // Build getter for import objects
        // const syncPainterGetter: () => DefaultPainter = () => this.getPainterInstanceSync(painterIndex);

        const wasmInstance = await WebAssembly.instantiate(painterModule, { "env": { "abort": (msg: string) => console.error(`Painter ${painterIndex} aborted with message ${msg}`) } });
        if (!objIsDefaultPainter(wasmInstance)) throw new Error(`Painter #${painterIndex} is not valid`);

        // Save the painter instance
        this.painterInstances[painterIndex] = wasmInstance;
        this.painterPositions[painterIndex] = { x: Math.floor(this.width / 2), y: Math.floor(this.height / 2) };

        // Initialize the painter 
        wasmInstance.exports.init(this.width, this.height);

        return;
    }

    /**
     * Chooses the next painter and lets it paint on the canvas.
     */
    public runNextTick(): void {
        const painterIndex = this.tick % Object.keys(this.painterInstances).length;

        // Get the painter instance
        const painter = this.getPainterInstanceSync(painterIndex);

        // Get the painter position
        const x = this.painterPositions[painterIndex].x;
        const y = this.painterPositions[painterIndex].y;

        // Run the painter
        painter.exports.next(this.state, x, y);
        
        const color = painter.exports.getLastActionColor() >>> 0; // Convert to unsigned int
        const direction = painter.exports.getLastActionDirection();

        // Update the color of the canvas
        this.state[y][x] = color;

        // Update the position of the painter
        switch (direction) {
            case PainterDirection.Up:
                this.painterPositions[painterIndex].y = y < 1 ? this.height - 1 : y - 1;
                break;
            case PainterDirection.Down:
                this.painterPositions[painterIndex].y = y >= this.height - 1 ? 0 : y + 1;
                break;
            case PainterDirection.Left:
                this.painterPositions[painterIndex].x = x < 1 ? this.width - 1 : x - 1;
                break;
            case PainterDirection.Right:
                this.painterPositions[painterIndex].x = x >= this.width - 1 ? 0 : x + 1;
                break;
        }

        // Update the tick
        this.tick++;
    }

    /**
     * Returns an instance of the given painter. If the painter has not been instantiated yet, the function will throw an error.
     * @param painterIndex the index of the painter to get
     * @returns the painter instance
     */
    private getPainterInstanceSync(painterIndex: number): DefaultPainter {
        if (painterIndex < 0 || painterIndex >= Object.keys(this.painterInstances).length) throw new Error(`Invalid painter module index ${painterIndex}`);

        // Check if the painter has already been instantiated
        if (this.painterInstances[painterIndex] === undefined) throw new Error(`Painter #${painterIndex} has not been instantiated yet`);

        return this.painterInstances[painterIndex];
    }

    /**
     * Creates a new canvas state with the given width and height filled with white.
     * @param width the width in pixels of the canvas
     * @param height the height in pixels of the canvas
     * @returns the new canvas state
     */
    private static createNewCanvasState(width: number, height: number): DefaultCanvasState {
        const state: DefaultCanvasState = [];

        if (width < 1 || height < 1) throw new Error("Invalid canvas size");

        // Fill the canvas with white
        for (let y = 0; y < height; y++) {
            state[y] = [];
            for (let x = 0; x < width; x++) {
                state[y][x] = DefaultCanvasEngine.DEFAULT_COLOR;
            }
        }

        return state;
    }
}