import { $ } from "../lib/createElement.js";
import { formattedDueDate } from "../lib/date.js";
import { TodoModel } from "./todo.js";

export class TodoModalController {
  /**
   * @param {TodoModel} todo - This should be a live object that reflects the changes
   */
  constructor(todo) {
    this.todo = todo;
  }

  static createInputSection({ name, type, labelText, ...attributes }) {
    const inputId = crypto.randomUUID();
    const $inputSection = $("div", { class: "todo-form_input-section" })(
      $("label", { for: inputId })(labelText),
      $("input", { name, type, id: inputId, ...attributes })()
    );
    return $inputSection;
  }

  #createView() {
    const $editForm = $("form", {
      class: "modal-content todo-form",
      action: "/",
      method: "dialog",
    })(
      $("h3")("Input Todo"),
      TodoModalController.createInputSection({
        name: "title",
        type: "text",
        labelText: "Title: ",
        value: this.todo.title,
        required: "",
      }),
      TodoModalController.createInputSection({
        name: "description",
        type: "text",
        labelText: "Description: ",
        value: this.todo.description,
        required: "",
      }),
      TodoModalController.createInputSection({
        name: "dueDate",
        type: "date",
        labelText: "Due Date: ",
        value: formattedDueDate(this.todo.dueDate),
        required: "",
      }),
      TodoModalController.createInputSection({
        name: "priority",
        type: "number",
        labelText: "Priority: ",
        value: this.todo.priority,
        required: "",
      }),
      $("menu", { class: "todo-form_action-menu" })(
        $("button", { value: "cancel", formnovalidate: "" })("Cancel"),
        $("button", { value: "update" })("Update")
      )
    );
    const $editDialog = $("dialog", {
      class: "todo-edit",
      modal: "",
      open: "",
    })($editForm);
    $editDialog.addEventListener("close", () => {
      if ($editDialog.returnValue === "update") {
        const editFormData = new FormData($editForm);
        // arrow function should be used
        this.todo.replaceWith(Object.fromEntries(editFormData.entries()));
      }
      $editDialog.dispatchEvent(new CustomEvent("redraw", { bubbles: true }));
      $editDialog.remove();
    });
    return $editDialog;
  }

  showModal() {
    document.body.appendChild(this.#createView());
  }
}
