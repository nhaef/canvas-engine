#include <stdio.h>
#include <emscripten.h>

ex

int g = 233;

EMSCRIPTEN_KEEPALIVE void init(int wivdth, int height) {
    g++;
}

EMSCRIPTEN_KEEPALIVE void next() {
}

EMSCRIPTEN_KEEPALIVE void getLastActionColor() {
}

EMSCRIPTEN_KEEPALIVE void getLastActionDirection() {
}