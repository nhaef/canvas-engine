/**
 * Represents a 2D canvas that enables the painters to move around and draw on the canvas.
 */
export declare class DefaultCanvasEngine {
    private tick;
    private width;
    private height;
    private painterModules;
    private painterInstances;
    private painterPositions;
    private state;
    /**
     * Instantiate a new {@link DefaultCanvasEngine}
     * @param width the width in pixels of the canvas
     * @param height the height in pixels of the canvas
     * @param painters the painters to use
     */
    constructor(width: number, height: number, painterModules: WebAssembly.Module[]);
    /**
     * Get the {@link DefaultCanvasState} of the canvas as a bitmap image.
     */
    getStateAsBMP(): import("@jimp/core").Jimp & import("@jimp/jpeg").JpegClass & import("@jimp/png").PNGClass & import("@jimp/plugin-blit").Blit & import("@jimp/plugin-blur").Blur & import("@jimp/plugin-circle").Circle & import("@jimp/plugin-color").Color & import("@jimp/plugin-contain").Contain & import("@jimp/plugin-cover").Cover & import("@jimp/plugin-displace").Displace & import("@jimp/plugin-dither").Dither & import("@jimp/plugin-flip").Flip & import("@jimp/plugin-fisheye").Fisheye & import("@jimp/plugin-gaussian").Gaussian & import("@jimp/plugin-invert").Invert & import("@jimp/plugin-mask").Mask & import("@jimp/plugin-normalize").Normalize & import("@jimp/plugin-rotate").Rotate & import("@jimp/plugin-scale").Scale & import("@jimp/plugin-shadow").Shadow & import("@jimp/plugin-threshold").Threshold & import("@jimp/plugin-crop").CropClass & import("@jimp/plugin-print").PrintClass & import("@jimp/plugin-resize").ResizeClass;
    /**
     * Chooses the next painter and lets it paint on the canvas.
     */
    runNextTick(): Promise<void>;
    /**
     * Returns an instance of the given painter. If the painter has not been instantiated yet, it will be instantiated.
     * @param painterModuleIndex the index of the painter module to instantiate
     * @returns the painter instance
     */
    private getPainterInstance;
    /**
     * Instantiate a new painter.
     * @param painterModuleIndex the index of the painter module to instantiate
     */
    private instantiatePainter;
    /**
     * Returns an instance of the given painter. If the painter has not been instantiated yet, the function will throw an error.
     * @param painterModuleIndex the index of the painter module to instantiate
     * @returns the painter instance
     */
    private getPainterInstanceSync;
    /**
     * Creates a new canvas state with the given width and height filled with white.
     * @param width the width in pixels of the canvas
     * @param height the height in pixels of the canvas
     * @returns the new canvas state
     */
    private static createNewCanvasState;
}
