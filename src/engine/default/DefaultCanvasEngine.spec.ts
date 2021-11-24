import { DefaultCanvasEngine } from '../default/DefaultCanvasEngine';
import { Direction } from '../types/Direction';
import { DefaultPainterInstance } from './DefaultPainterInstance';

const WHITE = 0xFFFFFFFF;
const RED = 0xFF0000FF;
const GREEN = 0x00FF00FF;

var mockPainterInstanceRedLeft: DefaultPainterInstance;
var mockPainterInstanceGreenDown: DefaultPainterInstance;

beforeEach(() => {
    mockPainterInstanceRedLeft = {
        exports: {
            init: (width: number, height: number) => {},
            next: () => {},
            getLastActionColor: () => RED,
            getLastActionDirection: () => Direction.Left,
        }
    }
    mockPainterInstanceGreenDown = {
        exports: {
            init: (width: number, height: number) => {},
            next: () => {},
            getLastActionColor: () => GREEN,
            getLastActionDirection: () => Direction.Down,
        }
    }
});

it("Should fail with wrong canvas size", () => {
    expect.assertions(8);

    expect(() => new DefaultCanvasEngine(0, 20, [mockPainterInstanceRedLeft])).toThrow();
    expect(() => new DefaultCanvasEngine(-20, 1, [mockPainterInstanceRedLeft])).toThrow();
    expect(() => new DefaultCanvasEngine(20, 0, [mockPainterInstanceRedLeft])).toThrow();
    expect(() => new DefaultCanvasEngine(-20, 1, [mockPainterInstanceRedLeft])).toThrow();

    expect(() => new DefaultCanvasEngine(1, 1, [mockPainterInstanceRedLeft])).not.toThrow();
    expect(() => new DefaultCanvasEngine(90, 1, [mockPainterInstanceRedLeft])).not.toThrow();
    expect(() => new DefaultCanvasEngine(1, 90, [mockPainterInstanceRedLeft])).not.toThrow();
    expect(() => new DefaultCanvasEngine(400, 400, [mockPainterInstanceRedLeft])).not.toThrow();
});

it("Should fail without any modules", () => {
    expect.assertions(1);

    expect(() => new DefaultCanvasEngine(0, 20, [])).toThrow();
});

it("Should not fail when instantiating", () => {
    expect.assertions(2);

    expect(() => new DefaultCanvasEngine(3, 3, [mockPainterInstanceRedLeft])).not.toThrow();
    expect(() => new DefaultCanvasEngine(3, 3, [mockPainterInstanceRedLeft, mockPainterInstanceGreenDown])).not.toThrow();
});

it("Should simulate solo-ticks correctly", () => {
    expect.assertions(6);

    const engine = new DefaultCanvasEngine(3, 3, [mockPainterInstanceRedLeft]);

    // State should be exactly width * height long
    expect(engine.getState().length).toBe(3 * 3);

    // State should initialize with all cells white
    expect(engine.getState().every(color => color === WHITE)).toBeTruthy();

    // Simulate a step
    engine.next();

    // Only the center shell should be red
    expect(engine.getState().toString()).toEqual([
        WHITE, WHITE, WHITE,
        WHITE, RED, WHITE,
        WHITE, WHITE, WHITE
    ].toString());

    engine.next();
    expect(engine.getState().toString()).toEqual([
        WHITE, WHITE, WHITE,
        RED, RED, WHITE,
        WHITE, WHITE, WHITE
    ].toString());

    engine.next();
    expect(engine.getState().toString()).toEqual([
        WHITE, WHITE, WHITE,
        RED, RED, RED,
        WHITE, WHITE, WHITE
    ].toString());

    engine.next();
    engine.next();
    engine.next();

    expect(engine.getState().toString()).toEqual([
        WHITE, WHITE, WHITE,
        RED, RED, RED,
        WHITE, WHITE, WHITE
    ].toString());
});

it("Should simulate solo-ticks correctly", () => {
    expect.assertions(6);

    const engine = new DefaultCanvasEngine(3, 3, [mockPainterInstanceGreenDown]);

    // State should be exactly width * height long
    expect(engine.getState().length).toBe(3 * 3);

    // State should initialize with all cells white
    expect(engine.getState().every(color => color === WHITE)).toBeTruthy();

    // Simulate a step
    engine.next();

    // Only the center shell should be green
    expect(engine.getState().toString()).toEqual([
        WHITE, WHITE, WHITE,
        WHITE, GREEN, WHITE,
        WHITE, WHITE, WHITE
    ].toString());

    engine.next();
    expect(engine.getState().toString()).toEqual([
        WHITE, WHITE, WHITE,
        WHITE, GREEN, WHITE,
        WHITE, GREEN, WHITE
    ].toString());

    engine.next();
    expect(engine.getState().toString()).toEqual([
        WHITE, GREEN, WHITE,
        WHITE, GREEN, WHITE,
        WHITE, GREEN, WHITE
    ].toString());

    engine.next();
    engine.next();
    engine.next();

    expect(engine.getState().toString()).toEqual([
        WHITE, GREEN, WHITE,
        WHITE, GREEN, WHITE,
        WHITE, GREEN, WHITE
    ].toString());
});

it("Should simulate duo-ticks correctly", () => {
    expect.assertions(6);

    const engine = new DefaultCanvasEngine(3, 3, [mockPainterInstanceGreenDown, mockPainterInstanceRedLeft]);

    // State should be exactly width * height long
    expect(engine.getState().length).toBe(3 * 3);

    // State should initialize with all cells white
    expect(engine.getState().every(color => color === WHITE)).toBeTruthy();

    // Simulate a step
    engine.next();

    expect(engine.getState().toString()).toEqual([
        WHITE, WHITE, WHITE,
        WHITE, GREEN, WHITE,
        WHITE, WHITE, WHITE
    ].toString());

    engine.next();

    expect(engine.getState().toString()).toEqual([
        WHITE, WHITE, WHITE,
        WHITE, RED, WHITE,
        WHITE, WHITE, WHITE
    ].toString());

    engine.next();

    expect(engine.getState().toString()).toEqual([
        WHITE, WHITE, WHITE,
        WHITE, RED, WHITE,
        WHITE, GREEN, WHITE
    ].toString());

    engine.next();

    expect(engine.getState().toString()).toEqual([
        WHITE, WHITE, WHITE,
        RED, RED, WHITE,
        WHITE, GREEN, WHITE
    ].toString());
});

