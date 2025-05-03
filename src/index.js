import "./index.css";
import { MainController, MainModel } from "./mvc/main.js";
import { RedrawEvent } from "./lib/RedrawEvent.js";

const model = (function getModelFromLocalStorage() {
  const mainModelString = localStorage.getItem("model");
  const mainModel = mainModelString
    ? MainModel.parse(JSON.parse(mainModelString))
    : new MainModel();
  return mainModel;
})();

function saveModelToLocalStorage(model) {
  localStorage.setItem("model", JSON.stringify(model.serialize()));
}

function drawApp() {
  const app = document.getElementById("app");
  const $app = new MainController(model).createView();
  app?.replaceChildren($app);
}

function syncApp() {
  saveModelToLocalStorage(model);
  drawApp();
}

function initPage() {
  drawApp();
  RedrawEvent.addEventListenerTo(document, syncApp);
}

document.addEventListener("DOMContentLoaded", initPage);
