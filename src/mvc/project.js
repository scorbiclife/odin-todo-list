import { $ } from "../lib/createElement.js";
import { TodoController } from "./todo.js";

export class ProjectModel {
  constructor({ name, id }) {
    this.todos = [];
    this.name = name;
    this.id = id;
  }

  clone() {
    const result = new ProjectModel(this);
    result.todos = this.todos.map((t) => t.clone());
    return result;
  }

  createTodo(todo) {
    this.todos.push(todo);
  }

  getAllTodos() {
    return this.todos;
  }

  deleteTodo(todo) {
    this.todos = this.todos.filter((t) => t !== todo);
  }
}

export class ProjectController {
  constructor(projectModel) {
    this.model = projectModel;
  }

  #createNewProjectButton() {
    const $button = $("button")("new");
    $button.addEventListener("click", () => {
      debugger;
    })
    return $button;
  }

  createView() {
    return $("div", { "data-project-id": this.model.id })(
      $("header")($("h2")(this.model.name), this.#createNewProjectButton()),
      $("ul", { class: "todo_list" })(
        ...this.model
          .getAllTodos()
          .map((todo) => new TodoController(todo).createView())
          .map(($view) => $("li")($view))
      )
    );
  }
}
