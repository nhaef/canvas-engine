"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getASCommon = void 0;
function getASCommon(getInstance) {
    return {
        log: getLogFunction(getInstance)
    };
}
exports.getASCommon = getASCommon;
function getLogFunction(getInstance) {
    return function log(strPtr) {
        var memory = getInstance().exports.memory;
        console.log(memory.buffer.byteLength);
        console.log(strPtr);
    };
}
