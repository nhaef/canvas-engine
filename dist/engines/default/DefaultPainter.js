"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.objIsDefaultPainter = void 0;
function objIsDefaultPainter(instance) {
    return true &&
        typeof instance.exports === "object" &&
        typeof instance.exports.init === "function" &&
        typeof instance.exports.next === "function" &&
        typeof instance.exports.getLastActionColor === "function" &&
        typeof instance.exports.getLastActionDirection === "function";
}
exports.objIsDefaultPainter = objIsDefaultPainter;
