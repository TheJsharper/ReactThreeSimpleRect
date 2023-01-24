import { Vector2 } from "three";

class SelectionHelper {
  private element: HTMLDivElement;
  private renderer: THREE.WebGLRenderer;
  private startPoint: Vector2;
  private pointTopLeft: Vector2;
  private pointBottomRight: Vector2;
  public isDown: boolean;

  constructor(renderer: THREE.WebGLRenderer, cssClassName: any) {
    this.element = document.createElement("div");
    this.element.classList.add(cssClassName);
    this.element.style.pointerEvents = "none";

    this.renderer = renderer;

    this.startPoint = new Vector2();
    this.pointTopLeft = new Vector2();
    this.pointBottomRight = new Vector2();

    this.isDown = false;

    const onPointerDown = (event: PointerEvent) => {
      this.isDown = true;
      this.onSelectStart(event);
      return;
    };

    const onPointerMove = (event: PointerEvent) => {
      if (this.isDown) {
        this.onSelectMove(event);
      }
      return;
    };

    const onPointerUp = (event: PointerEvent) => {
      this.isDown = false;
      this.onSelectOver();
      return true;
    };

    this.renderer.domElement.addEventListener("pointerdown", onPointerDown);
    this.renderer.domElement.addEventListener("pointermove", onPointerMove);
    this.renderer.domElement.addEventListener("pointerup", onPointerUp);
  }

  dispose() {
    this.renderer.domElement.removeEventListener(
      "onpointerdown",
      onPointerDown,
      true
    );
    this.renderer.domElement.removeEventListener(
      "onpointermove",
      onPointerMove,
      true
    );
    this.renderer.domElement.removeEventListener(
      //"onpointerup",
      "pointerup",
      onPointerUp,
      true
    );
  }

  onSelectStart(event: any) {
    this.element.style.display = "none";

    this.renderer.domElement?.parentElement?.appendChild(this.element);

    this.element.style.left = event.clientX + "px";
    this.element.style.top = event.clientY + "px";
    this.element.style.width = "0px";
    this.element.style.height = "0px";

    this.startPoint.x = event.clientX;
    this.startPoint.y = event.clientY;
  }

  onSelectMove(event: any) {
    this.element.style.display = "block";

    this.pointBottomRight.x = Math.max(this.startPoint.x, event.clientX);
    this.pointBottomRight.y = Math.max(this.startPoint.y, event.clientY);
    this.pointTopLeft.x = Math.min(this.startPoint.x, event.clientX);
    this.pointTopLeft.y = Math.min(this.startPoint.y, event.clientY);

    this.element.style.left = this.pointTopLeft.x + "px";
    this.element.style.top = this.pointTopLeft.y + "px";
    this.element.style.width =
      this.pointBottomRight.x - this.pointTopLeft.x + "px";
    this.element.style.height =
      this.pointBottomRight.y - this.pointTopLeft.y + "px";
  }

  onSelectOver() {
    this.element.parentElement?.removeChild(this.element);
  }
}

export { SelectionHelper };
