import "./index.css";
import { TodoModel } from "./mvc/todo.js";
import { MainController, MainModel } from "./mvc/main.js";

function $appContent() {
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
  const model = new MainModel();
  todos.forEach((todo) => model.getDefaultProject().createTodo(todo));
  const controller = new MainController(model);
  return controller.createView();
}

function initApp() {
  const app = document.getElementById("app");
  app?.replaceChildren($appContent());
}

document.addEventListener("DOMContentLoaded", initApp);
