
export function createElement(Cls, attributes, ...children) {
  // 从console可以看出父子组件的构建顺序是先子后父
  // console.log(arguments);
  // debugger;
  let o
  if (typeof Cls === "string") {
    o = new Wrapper(Cls);
  } else {
    o = new Cls()
  }
  for (let name in attributes) {
    // o[name] = attributes[name];
    o.setAttribute(name, attributes[name])
  }

  let visit = (children) => {
    for (let child of children) {
      console.log('children');
      if (typeof child === "object" && child instanceof Array) {
        visit(child);
        continue;
      }
      if (typeof child === "string") {
        child = new Text(child);
      }
      o.appendChild(child);
    }
  }
  visit(children);

  return o;
}

export class Text {
  constructor(text) {
    this.root = document.createTextNode(text);
    this.children = [];
  }
  mountTo(parent) {
    parent.appendChild(this.root);
  }
}

export class Wrapper {
  constructor(type) {
    this.root = document.createElement(type);
    this.children = [];
  }
  setAttribute(name, value) {
    this.root.setAttribute(name, value);
  }
  appendChild(child) {
    console.log('Parent::appendChild', child);
    // child.mountTo(this.root);
    this.children.push(child);
  }
  mountTo(parent) {
    console.log('Parent::mountTo', parent);
    parent.appendChild(this.root);
    for (let child of this.children) {
      child.mountTo(this.root);
    }
  }
  addEventListener(type, handler, config) {
    this.root.addEventListener(...arguments);
  }
  get style() {
    return this.root.style;
  }

}