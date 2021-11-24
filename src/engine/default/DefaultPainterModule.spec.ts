import * as fs from "fs";
import * as path from "path";

import { DefaultPainterModule } from "./DefaultPainterModule";

const exampleModulePath = path.join(path.dirname(path.dirname(path.dirname(__dirname))), "test-assets", "DefaultPainter.wasm");
const exampleWrongModulePath = path.join(path.dirname(path.dirname(path.dirname(__dirname))), "test-assets", "DefaultPainterWrong.wasm");
const exampleModuleRedDownPath = path.join(path.dirname(path.dirname(path.dirname(__dirname))), "test-assets", "DefaultPainterRedDown.wasm");
const exampleModuleGreenRightPath = path.join(path.dirname(path.dirname(path.dirname(__dirname))), "test-assets", "DefaultPainterGreenRight.wasm");

const exampleModule = fs.readFileSync(exampleModulePath);
const exampleWrongModule = fs.readFileSync(exampleWrongModulePath);
const exampleModuleRedDown = fs.readFileSync(exampleModuleRedDownPath);
const exampleModuleGreenRight = fs.readFileSync(exampleModuleGreenRightPath);

it("Should validate correctly", () => {
    expect.assertions(4);

    expect(() => new DefaultPainterModule(exampleModule)).not.toThrow();
    expect(() => new DefaultPainterModule(exampleWrongModule)).toThrow();
    expect(() => new DefaultPainterModule(exampleModuleRedDown)).not.toThrow();
    expect(() => new DefaultPainterModule(exampleModuleGreenRight)).not.toThrow();
});

it("Should instantiate WASM correctly", async () => {
    expect.assertions(1);

    await expect(new DefaultPainterModule(exampleModule).newInstance()).resolves.toBeTruthy();
});