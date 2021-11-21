import { PainterDirection } from "../../PainterDirection";
import { DefaultCanvasState } from "./DefaultCanvasState";
import { DefaultPainter, objIsDefaultPainter } from "./DefaultPainter";
import Jimp from "jimp";

/**
 * Represents a 2D canvas that enables the painters to move around and draw on the canvas.
 */
export class DefaultCanvasEngine {

    private tick: number;
    private width: number;
    private height: number;

    private painterModules: { [index: number]: WebAssembly.Module };
    private painterInstances: { [index: number]: DefaultPainter };
    private painterPositions: { [index: number]: { x: number, y: number } };
    private state: DefaultCanvasState;

    /**
     * Instantiate a new {@link DefaultCanvasEngine}
     * @param width the width in pixels of the canvas
     * @param height the height in pixels of the canvas
     * @param painters the painters to use
     */
    constructor(width: number, height: number, painterModules: WebAssembly.Module[]) {
        if (painterModules.length < 1) throw new Error("No painters provided");

        this.tick = 0;
        this.width = width;
        this.height = height;
        this.painterModules = Object.assign({}, painterModules);
        this.painterInstances = {};
        this.painterPositions = Object.assign({}, painterModules.map(() => ({ x: Math.floor(width / 2), y: Math.floor(height / 2) })));
        this.state = DefaultCanvasEngine.createNewCanvasState(width, height);
    }

    /**
     * Get the {@link DefaultCanvasState} of the canvas as a bitmap image.
     */
    public getStateAsBMP() {
        const img = new Jimp(this.width, this.height);

        // Set image pixels
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                img.setPixelColour(this.state[y][x], x, y);
            }
        }

        return img;
    }

    /**
     * Chooses the next painter and lets it paint on the canvas.
     */
    public async runNextTick(): Promise<void> {
        const painterModuleIndex = this.tick % Object.keys(this.painterModules).length;

        // Get the painter instance
        const painter = await this.getPainterInstance(painterModuleIndex);

        // Get the painter position
        const x = this.painterPositions[painterModuleIndex].x;
        const y = this.painterPositions[painterModuleIndex].y;

        // Run the painter
        painter.exports.next(this.state, x, y);
        const color = painter.exports.getLastActionColor();
        const direction = painter.exports.getLastActionDirection();

        // Update the color of the canvas
        this.state[y][x] = color;

        // Update the position of the painter
        switch (direction) {
            case PainterDirection.Up:
                this.painterPositions[painterModuleIndex].y--;
                break;
            case PainterDirection.Down:
                this.painterPositions[painterModuleIndex].y++;
                break;
            case PainterDirection.Left:
                this.painterPositions[painterModuleIndex].x--;
                break;
            case PainterDirection.Right:
                this.painterPositions[painterModuleIndex].x++;
                break;
        }

        // Update the tick
        this.tick++;
    }

    /**
     * Returns an instance of the given painter. If the painter has not been instantiated yet, it will be instantiated.
     * @param painterModuleIndex the index of the painter module to instantiate
     * @returns the painter instance
     */
    private async getPainterInstance(painterModuleIndex: number): Promise<DefaultPainter> {
        // Check if the painter has already been instantiated
        if (this.painterInstances[painterModuleIndex] === undefined) await this.instantiatePainter(painterModuleIndex);
        else if (painterModuleIndex < 0 || painterModuleIndex >= Object.keys(this.painterModules).length) throw new Error("Invalid painter module index");

        return this.painterInstances[painterModuleIndex];
    }

    /**
     * Instantiate a new painter.
     * @param painterModuleIndex the index of the painter module to instantiate
     */
    private async instantiatePainter(painterModuleIndex: number): Promise<void> {
        if (painterModuleIndex < 0 || painterModuleIndex >= Object.keys(this.painterModules).length) throw new Error("Invalid painter module index");

        // Check if the painter has already been instantiated
        if (this.painterInstances[painterModuleIndex] !== undefined) throw new Error("Painter has already been instantiated!");

        // Build getter for import objects
        const syncPainterGetter: () => DefaultPainter = () => this.getPainterInstanceSync(painterModuleIndex);

        const painterModule = this.painterModules[painterModuleIndex];
        const wasmInstance = await WebAssembly.instantiate(painterModule, { "env": { "abort": (msg: string) => console.error(`Painter ${painterModuleIndex} aborted with message ${msg}`) } });
        if (!objIsDefaultPainter(wasmInstance)) throw new Error(`Painter #${painterModuleIndex} is not valid`);

        // Save the painter instance
        this.painterInstances[painterModuleIndex] = wasmInstance;

        // Initialize the painter 
        wasmInstance.exports.init(this.width, this.height);

        return;
    }

    /**
     * Returns an instance of the given painter. If the painter has not been instantiated yet, the function will throw an error.
     * @param painterModuleIndex the index of the painter module to instantiate
     * @returns the painter instance
     */
    private getPainterInstanceSync(painterModuleIndex: number): DefaultPainter {
        if (painterModuleIndex < 0 || painterModuleIndex >= Object.keys(this.painterModules).length) throw new Error("Invalid painter module index");

        // Check if the painter has already been instantiated
        if (this.painterInstances[painterModuleIndex] === undefined) throw new Error(`Painter #${painterModuleIndex} has not been instantiated yet`);

        return this.painterInstances[painterModuleIndex];
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
                state[y][x] = 0xFF0000FF;
            }
        }

        return state;
    }
}