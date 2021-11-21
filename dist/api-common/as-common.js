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
    return function log(strPtrBit) {
        var memory = getInstance().exports.memory;
        readStringFromMemory(strPtrBit / 32, memory);
    };
}
function readStringFromMemory(strPtr, memory) {
    var RTID = strPtr + 2;
    var RTSIZE = strPtr + 1;
    var memoryView = new Int32Array(memory.buffer);
    var id = memoryView[RTID];
    var strSize = memoryView[RTSIZE];
    console.log(id);
    console.log(strSize);
}
