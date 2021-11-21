"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.objIsDefaultPainter = void 0;
function objIsDefaultPainter(obj) {
    return true &&
        typeof obj.init === "function" &&
        typeof obj.next === "function" &&
        typeof obj.getLastActionColor === "function" &&
        typeof obj.getLastActionDirection === "function";
}
exports.objIsDefaultPainter = objIsDefaultPainter;
