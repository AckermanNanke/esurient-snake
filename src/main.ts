import { esurientSnake } from "./esurientSnake";
import './style.css';

const snakeClass = new esurientSnake();

/**
 * 节流函数
 * 防止一直点击蛇不会动
 * 时间设为与蛇移动时间一致
 */
function throttle(func: Function, wait: number) {
  let preTime = 0;
  return function (this: any) {
    let now = Date.now();
    if (Date.now() - preTime > wait) {
      func.apply(this, arguments);
      preTime = now;
    }
  }
}
/**
 * 监听键盘
 */
document.addEventListener("keydown", throttle((event: KeyboardEvent) => {
  // 鼠标监听
  // let currentX = event.offsetX;
  // let currentY = event.offsetY;
  // startSnake.snakeMove(currentX, currentY);
  if (snakeClass.isPause) {
    snakeClass.snakeMove(snakeClass.direction!);
    snakeClass.isPause = false
  } else if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.code)) {
    snakeClass.snakeMove(event.code as "ArrowUp" | "ArrowDown" | "ArrowLeft" | "ArrowRight");
  }
}, 200))
/**
 * 开始
 */
document.getElementById("start")!.addEventListener("click", throttle(() => {
  if (snakeClass.isPause) {
    snakeClass.snakeMove(snakeClass.direction!);
    snakeClass.isPause = false
  } else {
    snakeClass.snakeMove("ArrowRight");
  }
}, 200))
/**
 * 暂停
 */
document.getElementById("pause")!.addEventListener("click", throttle(() => {
  clearInterval(Number(snakeClass.Timer));
  snakeClass.isPause = true
}, 200))
/**
 * 停止
 */
document.getElementById("stop")!.addEventListener("click", throttle(() => {
  snakeClass.reseteSurientSnake();
}, 200)) 