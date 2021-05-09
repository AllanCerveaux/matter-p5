import { Mouse } from '../utils/Mouse';

export class Camera {
  _x: number;
  _y: number;
  translatePos: { x: number; y: number };
  startDragOffset: { x: number; y: number };
  scale: number = 1.0;
  scaleMultiplier: number = 0.8;
  mouse: Mouse;

  constructor() {
    this.mouse = new Mouse();
    this.mouse.on('mousemove');
    this.startDragOffset = {
      x: 0,
      y: 0
    };
    this.translatePos = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    };
  }

  translate(mouseX: number, mouseY: number) {
    this.translatePos.x = mouseX - this.startDragOffset.x;
    this.translatePos.y = mouseY - this.startDragOffset.y;
  }

  dragOffset(mouseX: number, mouseY: number) {
    this.startDragOffset.x = mouseX - this.translatePos.x;
    this.startDragOffset.y = mouseY - this.translatePos.y;
  }

  zoomOut() {
    this.scale *= this.scaleMultiplier;
  }

  zoomIn() {
    console.log(this.mouse.x, this.mouse.y);
    this.scale /= this.scaleMultiplier;
  }
}
