import { TodoModel } from "./todo.js";
import { ProjectController, ProjectModel } from "./project.js";
import { $ } from "../lib/createElement.js";

export class MainModel {
  constructor() {
    this.defaultProject = new ProjectModel({
      name: "default",
      id: crypto.randomUUID(),
    });
    this.projects = [this.defaultProject];
  }

  createProject({ name, id }) {
    this.projects.push(new ProjectModel({ name, id }));
  }

  getAllProjects() {
    return this.projects.map((p) => p.clone());
  }

  getDefaultProject() {
    return this.defaultProject;
  }

  deleteProject(projectId) {
    // TODO: handle case when project is empty?
    this.projects = this.projects.filter((project) => project.id !== projectId);
  }
}

export class MainController {
  constructor(mainModel) {
    this.model = mainModel;
  }

  createView() {
    return $("ul")(
      ...this.model
        .getAllProjects()
        .map((project) => new ProjectController(project).createView())
        .map(($view) => $("li")($view))
    );
  }
}
