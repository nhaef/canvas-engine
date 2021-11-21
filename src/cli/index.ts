import * as fs from 'fs';

import { DefaultCanvasEngine } from "../engines/default/DefaultCanvasEngine";

/**
 * Given an argument like "--width <value>", returns the value.
 * @param argumentName 
 * @returns 
 */
function getArgumentValue(argumentName: string) {
    const argumentIndex = process.argv.indexOf(argumentName);

    if (argumentIndex === -1) return undefined;
    if (argumentIndex + 1 >= process.argv.length) throw new Error(`Missing value for argument ${argumentName}`);

    return process.argv[argumentIndex + 1];
}

function printHelpAndExit() {
    console.log("Use --mode to set the PainterEngine mode (defaults to \"default\")");
    console.log("Use --width <value> to set the width of the canvas (defaults to 16)");
    console.log("Use --height <value> to set the height of the canvas (defaults to 16)");
    console.log("Use --ticks <value> to set the number of ticks to simulate (defaults to 1024)");
    console.log("Use --painters <filePath1>, <filePath2>, .. to set the painter modules which should be playing (required)");

    process.exit(0);
}

async function runCli() {
    // If help argument is present, print help
    if (process.argv.indexOf("--help") !== -1) return printHelpAndExit();

    // Read arguments from the command line
    const mode = getArgumentValue("--mode") || "default";
    const ticks = Number(getArgumentValue("--ticks")) || 1024;
    const width = Number(getArgumentValue("--width")) || 16;
    const height = Number(getArgumentValue("--height")) || 16;

    // Read comma separated list of painter module file paths
    const painterModuleFilePaths = getArgumentValue("--painters")?.split(",");

    if (painterModuleFilePaths === undefined) return printHelpAndExit();

    // Read modules from file system
    const painterModules = painterModuleFilePaths.map(filePath => new WebAssembly.Module(fs.readFileSync(filePath)));

    // Run the canvas engine given the mode and painter module file names
    switch (mode) {
        case "default":
            const defaultEngine = new DefaultCanvasEngine(width, height, painterModules);
            for (let i = 0; i < ticks; i++) {
                console.log(`Running tick ${i}`);
                await defaultEngine.runNextTick();
                const img = defaultEngine.getStateAsBMP();
                img.write(`./output/output-${i}.bmp`);
            }
    }
}

runCli();