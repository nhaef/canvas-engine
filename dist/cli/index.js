"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
var DefaultCanvasEngine_1 = require("../engines/default/DefaultCanvasEngine");
/**
 * Given an argument like "--width <value>", returns the value.
 * @param argumentName
 * @returns
 */
function getArgumentValue(argumentName) {
    var argumentIndex = process.argv.indexOf(argumentName);
    if (argumentIndex === -1)
        return undefined;
    if (argumentIndex + 1 >= process.argv.length)
        throw new Error("Missing value for argument " + argumentName);
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
function runCli() {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var mode, ticks, width, height, painterModuleFilePaths, painterModules, _b, defaultEngine, i, img;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    // If help argument is present, print help
                    if (process.argv.indexOf("--help") !== -1)
                        return [2 /*return*/, printHelpAndExit()];
                    mode = getArgumentValue("--mode") || "default";
                    ticks = Number(getArgumentValue("--ticks")) || 1024;
                    width = Number(getArgumentValue("--width")) || 16;
                    height = Number(getArgumentValue("--height")) || 16;
                    painterModuleFilePaths = (_a = getArgumentValue("--painters")) === null || _a === void 0 ? void 0 : _a.split(",");
                    if (painterModuleFilePaths === undefined)
                        return [2 /*return*/, printHelpAndExit()];
                    painterModules = painterModuleFilePaths.map(function (filePath) { return new WebAssembly.Module(fs.readFileSync(filePath)); });
                    _b = mode;
                    switch (_b) {
                        case "default": return [3 /*break*/, 1];
                    }
                    return [3 /*break*/, 5];
                case 1:
                    defaultEngine = new DefaultCanvasEngine_1.DefaultCanvasEngine(width, height, painterModules);
                    i = 0;
                    _c.label = 2;
                case 2:
                    if (!(i < ticks)) return [3 /*break*/, 5];
                    console.log("Running tick " + i);
                    return [4 /*yield*/, defaultEngine.runNextTick()];
                case 3:
                    _c.sent();
                    img = defaultEngine.getStateAsBMP();
                    img.write("./output/output-" + i + ".bmp");
                    _c.label = 4;
                case 4:
                    i++;
                    return [3 /*break*/, 2];
                case 5: return [2 /*return*/];
            }
        });
    });
}
runCli();
