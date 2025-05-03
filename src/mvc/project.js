import { $ } from "../lib/createElement.js";
import { TodoModalController } from "./todo-modal.js";
import { TodoController, TodoModel } from "./todo.js";

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

  addTodo(todo) {
    this.todos.push(todo);
  }

  getAllTodos() {
    return this.todos;
  }

  deleteTodoById(todoId) {
    this.todos = this.todos.filter((todo) => todo.id !== todoId);
  }
}

export class ProjectController {
  constructor(projectModel) {
    this.model = projectModel;
  }

  #createNewTodoButton() {
    const $button = $("button")("new");
    $button.addEventListener("click", () => {
      const createdTodo = TodoModel.createEmptyTodo();
      this.model.addTodo(createdTodo);
      new TodoModalController(createdTodo).showModal();
    });
    return $button;
  }

  createView() {
    const $view = $("div", { "data-project-id": this.model.id })(
      $("header")($("h2")(this.model.name), this.#createNewTodoButton()),
      $("ul", { class: "todo_list" })(
        ...this.model
          .getAllTodos()
          .map((todo) => new TodoController(todo).createView())
          .map(($view) => $("li")($view))
      )
    );
    $view.addEventListener("click", (event) => {
      if (event.target.dataset.action !== "remove-todo") {
        return;
      }
      this.model.deleteTodoById(event.target.dataset.todoId);
      $view.dispatchEvent(new CustomEvent("redraw", { bubbles: true }));
    });
    return $view;
  }
}
