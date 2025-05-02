export function $(tagName, attributes = {}) {
  return function createElement(...children) {
    const element = document.createElement(tagName);
    for (const attr in attributes) {
      const value = attributes[attr];
      element.setAttribute(attr, value);
    }
    element.append(...children);
    return element;
  };
}
