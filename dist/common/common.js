"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCommonModuleImports = void 0;
function getCommonModuleImports(getInstance) {
    return {
        log: getLogFunction(getInstance)
    };
}
exports.getCommonModuleImports = getCommonModuleImports;
function getLogFunction(getInstance) {
    return function log(strPtr) {
        var memory = getInstance().exports.memory;
        console.log(memory.buffer.byteLength);
        console.log(strPtr);
    };
}
