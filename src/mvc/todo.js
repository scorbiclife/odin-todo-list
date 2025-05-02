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

  #createEditDialog() {
    function createInputSection({ name, type, labelText, ...attributes }) {
      const inputId = crypto.randomUUID();
      const $inputSection = $("div")(
        $("label", { htmlFor: inputId })(labelText),
        $("input", { name, type, id: inputId, ...attributes })()
      );
      return $inputSection;
    }
    const $editDialog = $("dialog", {
      class: "todo-edit",
      modal: "",
      open: "",
    })(
      $("form", { class: "modal-content", action: "/", method: "dialog" })(
        $("h3")("Create Todo"),
        createInputSection({
          name: "title",
          type: "text",
          labelText: "Title: ",
          required: "",
        }),
        createInputSection({
          name: "description",
          type: "text",
          labelText: "Description: ",
          required: "",
        }),
        createInputSection({
          name: "due",
          type: "date",
          labelText: "Due Date: ",
          required: "",
        }),
        createInputSection({
          name: "priority",
          type: "number",
          labelText: "Priority: ",
          required: "",
          value: 0,
        }),
        $("div")(
          $("button", { value: "cancel", formnovalidate: "" })("Cancel"),
          $("button", { value: "create" })("Create")
        )
      )
    );
    $editDialog.addEventListener("close", () => {
      $editDialog.remove();
    });
    return $editDialog;
  }

  #createEditButton() {
    const $button = $("button")("edit");
    $button.addEventListener("click", () => {
      // click handler should be an arrow function
      // to use a statically bound `this` todo controller
      document.body.append(this.#createEditDialog());
    });
    return $button;
  }

  createView() {
    const { title, description, dueDate, priority, id } = this.model;
    return $("div", { "data-todo-id": id })(
      $("h3")(title),
      $("p")(description),
      $("div")(`due: ${dueDate}`),
      $("div")(`priority: ${priority}`),
      this.#createEditButton()
    );
  }
}
