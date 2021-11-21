"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultCanvasEngine = void 0;
var PainterDirection_1 = require("../../PainterDirection");
var DefaultPainter_1 = require("./DefaultPainter");
var jimp_1 = __importDefault(require("jimp"));
/**
 * Represents a 2D canvas that enables the painters to move around and draw on the canvas.
 */
var DefaultCanvasEngine = /** @class */ (function () {
    /**
     * Instantiate a new {@link DefaultCanvasEngine}
     * @param width the width in pixels of the canvas
     * @param height the height in pixels of the canvas
     * @param painters the painters to use
     */
    function DefaultCanvasEngine(width, height, painterModules) {
        if (painterModules.length < 1)
            throw new Error("No painters provided");
        this.tick = 0;
        this.width = width;
        this.height = height;
        this.painterModules = Object.assign({}, painterModules);
        this.painterInstances = {};
        this.painterPositions = Object.assign({}, painterModules.map(function () { return ({ x: Math.floor(width / 2), y: Math.floor(height / 2) }); }));
        this.state = DefaultCanvasEngine.createNewCanvasState(width, height);
    }
    /**
     * Get the {@link DefaultCanvasState} of the canvas as a bitmap image.
     */
    DefaultCanvasEngine.prototype.getStateAsBMP = function () {
        var img = new jimp_1.default(this.width, this.height);
        // Set image pixels
        for (var y = 0; y < this.height; y++) {
            for (var x = 0; x < this.width; x++) {
                img.setPixelColour(this.state[y][x], x, y);
            }
        }
        return img;
    };
    /**
     * Chooses the next painter and lets it paint on the canvas.
     */
    DefaultCanvasEngine.prototype.runNextTick = function () {
        return __awaiter(this, void 0, void 0, function () {
            var painterModuleIndex, painter, x, y, color, direction;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        painterModuleIndex = this.tick % Object.keys(this.painterModules).length;
                        return [4 /*yield*/, this.getPainterInstance(painterModuleIndex)];
                    case 1:
                        painter = _a.sent();
                        x = this.painterPositions[painterModuleIndex].x;
                        y = this.painterPositions[painterModuleIndex].y;
                        // Run the painter
                        painter.exports.next(this.state, x, y);
                        color = painter.exports.getLastActionColor();
                        direction = painter.exports.getLastActionDirection();
                        // Update the color of the canvas
                        this.state[y][x] = color;
                        // Update the position of the painter
                        switch (direction) {
                            case PainterDirection_1.PainterDirection.Up:
                                this.painterPositions[painterModuleIndex].y--;
                                break;
                            case PainterDirection_1.PainterDirection.Down:
                                this.painterPositions[painterModuleIndex].y++;
                                break;
                            case PainterDirection_1.PainterDirection.Left:
                                this.painterPositions[painterModuleIndex].x--;
                                break;
                            case PainterDirection_1.PainterDirection.Right:
                                this.painterPositions[painterModuleIndex].x++;
                                break;
                        }
                        // Update the tick
                        this.tick++;
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Returns an instance of the given painter. If the painter has not been instantiated yet, it will be instantiated.
     * @param painterModuleIndex the index of the painter module to instantiate
     * @returns the painter instance
     */
    DefaultCanvasEngine.prototype.getPainterInstance = function (painterModuleIndex) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.painterInstances[painterModuleIndex] === undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.instantiatePainter(painterModuleIndex)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        if (painterModuleIndex < 0 || painterModuleIndex >= Object.keys(this.painterModules).length)
                            throw new Error("Invalid painter module index");
                        _a.label = 3;
                    case 3: return [2 /*return*/, this.painterInstances[painterModuleIndex]];
                }
            });
        });
    };
    /**
     * Instantiate a new painter.
     * @param painterModuleIndex the index of the painter module to instantiate
     */
    DefaultCanvasEngine.prototype.instantiatePainter = function (painterModuleIndex) {
        return __awaiter(this, void 0, void 0, function () {
            var syncPainterGetter, painterModule, wasmInstance;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (painterModuleIndex < 0 || painterModuleIndex >= Object.keys(this.painterModules).length)
                            throw new Error("Invalid painter module index");
                        // Check if the painter has already been instantiated
                        if (this.painterInstances[painterModuleIndex] !== undefined)
                            throw new Error("Painter has already been instantiated!");
                        syncPainterGetter = function () { return _this.getPainterInstanceSync(painterModuleIndex); };
                        painterModule = this.painterModules[painterModuleIndex];
                        return [4 /*yield*/, WebAssembly.instantiate(painterModule, { "env": { "abort": function (msg) { return console.error("Painter " + painterModuleIndex + " aborted with message " + msg); } } })];
                    case 1:
                        wasmInstance = _a.sent();
                        if (!(0, DefaultPainter_1.objIsDefaultPainter)(wasmInstance))
                            throw new Error("Painter #" + painterModuleIndex + " is not valid");
                        // Save the painter instance
                        this.painterInstances[painterModuleIndex] = wasmInstance;
                        // Initialize the painter 
                        wasmInstance.exports.init(this.width, this.height);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Returns an instance of the given painter. If the painter has not been instantiated yet, the function will throw an error.
     * @param painterModuleIndex the index of the painter module to instantiate
     * @returns the painter instance
     */
    DefaultCanvasEngine.prototype.getPainterInstanceSync = function (painterModuleIndex) {
        if (painterModuleIndex < 0 || painterModuleIndex >= Object.keys(this.painterModules).length)
            throw new Error("Invalid painter module index");
        // Check if the painter has already been instantiated
        if (this.painterInstances[painterModuleIndex] === undefined)
            throw new Error("Painter #" + painterModuleIndex + " has not been instantiated yet");
        return this.painterInstances[painterModuleIndex];
    };
    /**
     * Creates a new canvas state with the given width and height filled with white.
     * @param width the width in pixels of the canvas
     * @param height the height in pixels of the canvas
     * @returns the new canvas state
     */
    DefaultCanvasEngine.createNewCanvasState = function (width, height) {
        var state = [];
        if (width < 1 || height < 1)
            throw new Error("Invalid canvas size");
        // Fill the canvas with white
        for (var y = 0; y < height; y++) {
            state[y] = [];
            for (var x = 0; x < width; x++) {
                state[y][x] = 0xFF0000FF;
            }
        }
        return state;
    };
    return DefaultCanvasEngine;
}());
exports.DefaultCanvasEngine = DefaultCanvasEngine;
