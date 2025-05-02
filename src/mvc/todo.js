import { $ } from "../lib/createElement.js";
import { formattedDueDate } from "../lib/date.js";
import { TodoModalController } from "./todo-modal.js";

export class TodoModel {
  constructor({ title, description, dueDate, priority, id }) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.id = id;
  }

  clone() {
    return new TodoModel(this);
  }

  replaceWith(newModel) {
    Object.assign(this, newModel);
  }
}

export class TodoController {
  constructor(todoModel) {
    this.model = todoModel;
  }


  #createEditButton() {
    const $button = $("button")("edit");
    $button.addEventListener("click", () => {
      new TodoModalController(this.model).showModal();
    });
    return $button;
  }

  createView() {
    const { title, description, priority, id } = this.model;
    return $("div", { "data-todo-id": id })(
      $("h3")(title),
      $("p")(description),
      $("div")(`due: ${formattedDueDate(this.model.dueDate)}`),
      $("div")(`priority: ${priority}`),
      this.#createEditButton()
    );
  }
}
