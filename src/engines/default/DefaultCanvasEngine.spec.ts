import * as fs from 'fs';
import * as path from 'path';
import { DefaultCanvasEngine } from "./DefaultCanvasEngine"

const exampleModulePath = path.join(path.dirname(path.dirname(path.dirname(__dirname))), "test-assets", "DefaultPainter.wasm");
const exampleWrongModulePath = path.join(path.dirname(path.dirname(path.dirname(__dirname))), "test-assets", "DefaultPainterWrong.wasm");
const exampleModuleRedDownPath = path.join(path.dirname(path.dirname(path.dirname(__dirname))), "test-assets", "DefaultPainterRedDown.wasm");
const exampleModuleGreenRightPath = path.join(path.dirname(path.dirname(path.dirname(__dirname))), "test-assets", "DefaultPainterGreenRight.wasm");

var exampleModule: WebAssembly.Module;
var exampleWrongModule: WebAssembly.Module;
var exampleModuleRedDown: WebAssembly.Module;
var exampleModuleGreenRight: WebAssembly.Module;

beforeEach(() => {
    // Read example wasm from files
    const moduleBuffer = fs.readFileSync(exampleModulePath);
    exampleModule = new WebAssembly.Module(moduleBuffer);

    const wrongModuleBuffer = fs.readFileSync(exampleWrongModulePath);
    exampleWrongModule = new WebAssembly.Module(wrongModuleBuffer);

    const redDownModuleBuffer = fs.readFileSync(exampleModuleRedDownPath);
    exampleModuleRedDown = new WebAssembly.Module(redDownModuleBuffer);

    const greenRightModuleBuffer = fs.readFileSync(exampleModuleGreenRightPath);
    exampleModuleGreenRight = new WebAssembly.Module(greenRightModuleBuffer);
});

it("Should fail with wrong canvas size", async () => {
    expect.assertions(8);

    await expect(DefaultCanvasEngine.newInstance(0, 20, [exampleModule])).rejects.toBeTruthy();
    await expect(DefaultCanvasEngine.newInstance(-20, 1, [exampleModule])).rejects.toBeTruthy();
    await expect(DefaultCanvasEngine.newInstance(20, 0, [exampleModule])).rejects.toBeTruthy();
    await expect(DefaultCanvasEngine.newInstance(1, -20, [exampleModule])).rejects.toBeTruthy();

    await expect(DefaultCanvasEngine.newInstance(1, 1, [exampleModule])).resolves.toBeTruthy();
    await expect(DefaultCanvasEngine.newInstance(90, 1, [exampleModule])).resolves.toBeTruthy();
    await expect(DefaultCanvasEngine.newInstance(1, 90, [exampleModule])).resolves.toBeTruthy();
    await expect(DefaultCanvasEngine.newInstance(400, 400, [exampleModule])).resolves.toBeTruthy();
});

it("Should fail without any modules", async () => {
    expect.assertions(1);

    await expect(DefaultCanvasEngine.newInstance(1, 1, [])).rejects.toBeTruthy();
});

it("Should fail with a wrong module", async () => {
    expect.assertions(2);

    await expect(DefaultCanvasEngine.newInstance(1, 1, [exampleWrongModule])).rejects.toBeTruthy();
    await expect(DefaultCanvasEngine.newInstance(1, 1, [exampleModule, exampleWrongModule, exampleModule])).rejects.toBeTruthy();
});

it("Should instantiate", async () => {
    expect.assertions(1);

    await expect(DefaultCanvasEngine.newInstance(1, 1, [exampleModule])).resolves.toBeTruthy();
});

it("Should simulate solo ticks correctly for up-down movement", async () => {
    const engine = await DefaultCanvasEngine.newInstance(3, 3, [exampleModuleRedDown]);

    const WHITE = 0xFFFFFFFF;
    const RED = 0xFF0000FF;

    // The example module always walks down and colors the canvas red
    expect(engine.getState()).toEqual([
        [WHITE, WHITE, WHITE],
        [WHITE, WHITE, WHITE],
        [WHITE, WHITE, WHITE]
    ]);

    engine.runNextTick();

    expect(engine.getState()).toEqual([
        [WHITE, WHITE, WHITE],
        [WHITE, RED, WHITE],
        [WHITE, WHITE, WHITE]
    ]);

    engine.runNextTick();

    expect(engine.getState()).toEqual([
        [WHITE, WHITE, WHITE],
        [WHITE, RED, WHITE],
        [WHITE, RED, WHITE]
    ]);

    engine.runNextTick();

    expect(engine.getState()).toEqual([
        [WHITE, RED, WHITE],
        [WHITE, RED, WHITE],
        [WHITE, RED, WHITE]
    ]);

    engine.runNextTick();

    expect(engine.getState()).toEqual([
        [WHITE, RED, WHITE],
        [WHITE, RED, WHITE],
        [WHITE, RED, WHITE]
    ]);

});

it("Should simulate solo ticks correctly for left-right movement", async () => {
    const engine = await DefaultCanvasEngine.newInstance(3, 3, [exampleModuleGreenRight]);

    const WHITE = 0xFFFFFFFF;
    const GREEN = 0x00FF00FF;

    // The example module always walks right and colors the canvas green
    expect(engine.getState()).toEqual([
        [WHITE, WHITE, WHITE],
        [WHITE, WHITE, WHITE],
        [WHITE, WHITE, WHITE]
    ]);

    engine.runNextTick();

    expect(engine.getState()).toEqual([
        [WHITE, WHITE, WHITE],
        [WHITE, GREEN, WHITE],
        [WHITE, WHITE, WHITE]
    ]);

    engine.runNextTick();

    expect(engine.getState()).toEqual([
        [WHITE, WHITE, WHITE],
        [WHITE, GREEN, GREEN],
        [WHITE, WHITE, WHITE]
    ]);

    engine.runNextTick();

    expect(engine.getState()).toEqual([
        [WHITE, WHITE, WHITE],
        [GREEN, GREEN, GREEN],
        [WHITE, WHITE, WHITE]
    ]);

    engine.runNextTick();

    expect(engine.getState()).toEqual([
        [WHITE, WHITE, WHITE],
        [GREEN, GREEN, GREEN],
        [WHITE, WHITE, WHITE]
    ]);

});

it("Should simulate duo ticks correctly", async () => {
    const engine = await DefaultCanvasEngine.newInstance(3, 3, [exampleModuleRedDown, exampleModuleGreenRight]);

    const WHITE = 0xFFFFFFFF;
    const RED = 0xFF0000FF;
    const GREEN = 0x00FF00FF;

    expect(engine.getState()).toEqual([
        [WHITE, WHITE, WHITE],
        [WHITE, WHITE, WHITE],
        [WHITE, WHITE, WHITE]
    ]);

    engine.runNextTick();

    // Red's move
    expect(engine.getState()).toEqual([
        [WHITE, WHITE, WHITE],
        [WHITE, RED, WHITE],
        [WHITE, WHITE, WHITE]
    ]);

    engine.runNextTick();

    // Green's move
    expect(engine.getState()).toEqual([
        [WHITE, WHITE, WHITE],
        [WHITE, GREEN, WHITE],
        [WHITE, WHITE, WHITE]
    ]);

    engine.runNextTick();

    // Red's move
    expect(engine.getState()).toEqual([
        [WHITE, WHITE, WHITE],
        [WHITE, GREEN, WHITE],
        [WHITE, RED, WHITE]
    ]);

    engine.runNextTick();

    // Green's move
    expect(engine.getState()).toEqual([
        [WHITE, WHITE, WHITE],
        [WHITE, GREEN, GREEN],
        [WHITE, RED, WHITE]
    ]);

    engine.runNextTick();

    // Red's move
    expect(engine.getState()).toEqual([
        [WHITE, RED, WHITE],
        [WHITE, GREEN, GREEN],
        [WHITE, RED, WHITE]
    ]);
    
    engine.runNextTick();

    // Green's move
    expect(engine.getState()).toEqual([
        [WHITE, RED, WHITE],
        [GREEN, GREEN, GREEN],
        [WHITE, RED, WHITE]
    ]);

    engine.runNextTick();

    // Red's move
    expect(engine.getState()).toEqual([
        [WHITE, RED, WHITE],
        [GREEN, RED, GREEN],
        [WHITE, RED, WHITE]
    ]);

    engine.runNextTick();

    // Green's move
    expect(engine.getState()).toEqual([
        [WHITE, RED, WHITE],
        [GREEN, GREEN, GREEN],
        [WHITE, RED, WHITE]
    ]);
});

it("Should count ticks correctly", async () => {
    const engine = await DefaultCanvasEngine.newInstance(3, 3, [exampleModuleRedDown, exampleModuleGreenRight]);

    expect(engine.getTick()).toEqual(0);

    engine.runNextTick();
    engine.runNextTick();
    engine.runNextTick();

    expect(engine.getTick()).toEqual(3);

    engine.runNextTick();
    engine.runNextTick();
    engine.runNextTick();
    engine.runNextTick();
    engine.runNextTick();

    expect(engine.getTick()).toEqual(8);
});