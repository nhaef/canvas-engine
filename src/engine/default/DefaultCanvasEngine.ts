import { CanvasEngine } from "../CanvasEngine";
import { CanvasEngineType } from "../types/CanvasEngineType";
import { Direction } from "../types/Direction";
import { DefaultPainterInstance } from "./DefaultPainterInstance";

/**
 * Represents a 2D canvas that enables one or many painters
 * to move in one of four directions and paint the pixel they are on.
 */
export class DefaultCanvasEngine extends CanvasEngine {
    public readonly type: CanvasEngineType = CanvasEngineType.Default;
    protected painters: DefaultPainterInstance[];
    
    private step: number;
    private width: number;
    private height: number;
    private positions: [number, number][];
    private state: Uint32Array;

    public constructor(width: number, height: number, painters: DefaultPainterInstance[]) {
        super();

        if (width < 1 || height < 1) throw new Error("Width and height must be greater than 0.");
        if (painters.length < 1) throw new Error("At least one painter is required.");

        this.step = 0;
        this.width = width;
        this.height = height;
        this.painters = painters;
        this.positions = this.painters.map(() => [Math.floor(width / 2), Math.floor(height / 2)]);
        this.state = new Uint32Array(width * height).fill(0xFFFFFFFF);

        // Initialize painters
        this.painters.forEach(painter => painter.exports.init(width, height));
    }

    public getCurrentStep() {
        return this.step;
    }

    public getWidth(): number {
        return this.width;
    }

    public getHeight(): number {
        return this.height;
    }

    public next(): void {
        const painterIndex = this.step % this.painters.length;
        const painter = this.painters[painterIndex];
        const [x, y] = this.positions[painterIndex];

        // Run the painter
        painter.exports.next();
        const color = painter.exports.getLastActionColor();
        const direction = painter.exports.getLastActionDirection();

        // Update the state
        this.state[y * this.width + x] = color;

        // Update the position
        switch (direction) {
            case Direction.Up:
                this.positions[painterIndex][1] = y < 1 ? this.height - 1 : y - 1;
                break;
            case Direction.Down:
                this.positions[painterIndex][1] = y >= this.height - 1 ? 0 : y + 1;
                break;
            case Direction.Left:
                this.positions[painterIndex][0] = x < 1 ? this.width - 1 : x - 1;
                break;
            case Direction.Right:
                this.positions[painterIndex][0] = x >= this.width - 1 ? 0 : x + 1;
                break;
        }

        this.step++;
    }
    public getState(): Uint32Array {
        return this.state;
    }
}