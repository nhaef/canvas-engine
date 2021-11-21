import * as fs from 'fs';
import * as path from 'path';
import { DefaultCanvasEngine } from "./DefaultCanvasEngine"

const exampleModulePath = path.join(path.dirname(path.dirname(path.dirname(__dirname))), "test-assets", "DefaultPainter.wasm");
const exampleWrongModulePath = path.join(path.dirname(path.dirname(path.dirname(__dirname))), "test-assets", "DefaultPainterWrong.wasm");

var exampleModule: WebAssembly.Module;
var exampleWrongModule: WebAssembly.Module;

beforeEach(() => {
    // Read example wasm from files
    const moduleBuffer = fs.readFileSync(exampleModulePath);
    exampleModule = new WebAssembly.Module(moduleBuffer);

    const wrongModuleBuffer = fs.readFileSync(exampleWrongModulePath);
    exampleWrongModule = new WebAssembly.Module(wrongModuleBuffer);
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
