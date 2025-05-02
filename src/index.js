import "./index.css";
import { TodoModel } from "./mvc/todo.js";
import { MainController, MainModel } from "./mvc/main.js";

const model = (function createModel() {
  const model = new MainModel();
  const todos = [
    new TodoModel({
      title: "foo",
      description: "gotta show my vim foo",
      dueDate: new Date(),
      priority: 3,
      id: crypto.randomUUID(),
    }),
    new TodoModel({
      title: "bar",
      description: "vim has a high bar to entry",
      dueDate: new Date(),
      priority: 3,
      id: crypto.randomUUID(),
    }),
  ];
  todos.forEach((todo) => model.getDefaultProject().createTodo(todo));
  return model;
})();

function $appContent() {
  const controller = new MainController(model);
  return controller.createView();
}

function drawApp() {
  const app = document.getElementById("app");
  app?.replaceChildren($appContent());
}

function initPage() {
  drawApp();
  document.addEventListener("redraw", drawApp);
}

document.addEventListener("DOMContentLoaded", initPage);
