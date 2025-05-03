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

  static createEmptyTodo() {
    return new TodoModel({
      title: "",
      description: "",
      dueDate: new Date(),
      priority: 0,
      id: crypto.randomUUID(),
    });
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

  #createRemoveButton() {
    return $("button", {
      "data-action": "remove-todo",
      "data-todo-id": this.model.id,
    })("remove");
  }

  createView() {
    const { title, description, priority, id } = this.model;
    return $("div", { "data-todo-id": id, class: "todo" })(
      $("h3")(title),
      $("p")(description),
      $("div")(`due: ${formattedDueDate(this.model.dueDate)}`),
      $("div")(`priority: ${priority}`),
      $("menu", { class: "action-menu" })(
        this.#createEditButton(),
        this.#createRemoveButton()
      )
    );
  }
}
