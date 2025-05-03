import { TodoModel } from "./todo.js";
import { ProjectController, ProjectModel } from "./project.js";
import { $ } from "../lib/createElement.js";
import { RedrawEvent } from "../lib/RedrawEvent.js";

export class MainModel {
  constructor() {
    this.defaultProject = new ProjectModel({
      name: "default",
      id: crypto.randomUUID(),
    });
    this.projects = [this.defaultProject];
  }

  static parse(mainJson) {
    const model = new MainModel();
    model.projects = mainJson.projects.map(ProjectModel.parse);
    return model;
  }

  serialize() {
    return {
      projects: this.projects.map((p) => p.serialize()),
    };
  }

  createProject({ name, id }) {
    this.projects.push(new ProjectModel({ name, id }));
  }

  getAllProjects() {
    return this.projects;
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

  #createNewProjectButton() {}

  createView() {
    const $newProjectButton = $("button")("new project");
    const $newProjectDialog = $("dialog", { id: "new-project-dialog" })(
      $("form", { action: "#", method: "dialog" })(
        $("label", { for: "new-project-name" })(),
        $("input", { id: "new-project-name", name: "name" })(),
        $("button")("create")
      )
    );
    $newProjectButton.addEventListener("click", () => {
      $newProjectDialog.show();
    });
    $newProjectDialog.addEventListener("close", () => {
      const newProjectName = document.getElementById("new-project-name")?.value;
      this.model.createProject({
        name: newProjectName,
        id: crypto.randomUUID(),
      });
      document.dispatchEvent(new RedrawEvent());
    });
    return $("div", { class: "main-container" })(
      $("h1")("Odin Todo List"),
      $("menu", { class: "main-menu" })($newProjectButton, $newProjectDialog),
      $("ul", { class: "project_list" })(
        ...this.model
          .getAllProjects()
          .map((project) => new ProjectController(project).createView())
          .map(($view) => $("li")($view))
      )
    );
  }
}
