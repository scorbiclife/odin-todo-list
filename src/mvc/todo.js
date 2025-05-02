import { format } from "date-fns";
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

  replaceWith(newModel) {
    Object.assign(this, newModel);
  }
}

export class TodoController {
  constructor(todoModel) {
    this.model = todoModel;
  }

  formattedDueDate() {
    return format(this.model.dueDate, "yyyy-MM-dd");
  }

  #createEditDialog() {
    const createInputSection=({ name, type, labelText, ...attributes }) => {
      const inputId = crypto.randomUUID();
      const $inputSection = $("div")(
        $("label", { for: inputId })(labelText),
        $("input", { name, type, id: inputId, ...attributes })()
      );
      return $inputSection;
    }
    const $editForm = $("form", {
      class: "modal-content",
      action: "/",
      method: "dialog",
    })(
      $("h3")("Input Todo"),
      createInputSection({
        name: "title",
        type: "text",
        labelText: "Title: ",
        value: this.model.title,
        required: "",
      }),
      createInputSection({
        name: "description",
        type: "text",
        labelText: "Description: ",
        value: this.model.description,
        required: "",
      }),
      createInputSection({
        name: "dueDate",
        type: "date",
        labelText: "Due Date: ",
        value: this.formattedDueDate(),
        required: "",
      }),
      createInputSection({
        name: "priority",
        type: "number",
        labelText: "Priority: ",
        value: this.model.priority,
        required: "",
      }),
      $("div")(
        $("button", { value: "cancel", formnovalidate: "" })("Cancel"),
        $("button", { value: "create" })("Create")
      )
    );
    const $editDialog = $("dialog", {
      class: "todo-edit",
      modal: "",
      open: "",
    })($editForm);
    $editDialog.addEventListener("close", () => {
      // arrow function should be used
      const editFormData = new FormData($editForm);
      this.model.replaceWith(Object.fromEntries(editFormData.entries()));
      $editDialog.dispatchEvent(new CustomEvent("redraw", { bubbles: true }));
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
    const { title, description, priority, id } = this.model;
    return $("div", { "data-todo-id": id })(
      $("h3")(title),
      $("p")(description),
      $("div")(`due: ${this.formattedDueDate()}`),
      $("div")(`priority: ${priority}`),
      this.#createEditButton()
    );
  }
}
