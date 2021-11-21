enum PainterDirection {
    Up = 0,
    Down = 1,
    Left = 2,
    Right = 3
}

export function init(width: i32, height: i32): void {

}
export function next(): void {

}
export function getLastActionColor(): i32 {
    return 0x00FF00FF;
}
export function getLastActionDirection(): i32 {
    return PainterDirection.Right;
}