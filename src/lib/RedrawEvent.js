export class RedrawEvent extends CustomEvent {
  static type = "redraw";

  constructor() {
    super(RedrawEvent.type, { bubbles: true });
  }

  static addEventListenerTo(element, listener) {
    element.addEventListener(RedrawEvent.type, listener);
  }
}
