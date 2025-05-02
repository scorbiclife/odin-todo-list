import { $ } from "../lib/createElement.js";

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

  editTitle(newTitle) {
    this.title = newTitle;
  }

  editDescription(newDescription) {
    this.description = newDescription;
  }

  editDueDate(newDueDate) {
    this.dueDate = newDueDate;
  }

  editPriority(newPriority) {
    this.priority = newPriority;
  }
}

export class TodoController {
  constructor(todoModel) {
    this.model = todoModel;
  }

  createView() {
    const { title, description, dueDate, priority, id } = this.model;
    return $("div", { "data-todo-id": id })(
      $("h3")(title),
      $("p")(description),
      $("div")(`due: ${dueDate}`),
      $("div")(`priority: ${priority}`)
    );
  }
}
