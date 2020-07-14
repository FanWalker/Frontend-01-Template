/**
 * 
 * @param {构造器函数} Cls 
 * @param {属性对象} attributes 
 */
function createElement(Cls, attributes, ...children) {
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

  for (let child of children) {
    console.log('children');
    if (typeof child === "string") {
      child = new Text(child);
    }
    o.appendChild(child);
  }

  return o;
}

class Text {
  constructor(text) {
    this.root = document.createTextNode(text);
    this.children = [];
  }
  mountTo(parent) {
    parent.appendChild(this.root);
  }
}

class Wrapper {
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

}
class MyComponent {
  constructor(config) {
    // this.root = document.createElement('div');
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
  // mountTo(parent) {
  //   console.log('Parent::mountTo', parent);
  //   parent.appendChild(this.root);
  //   for (let child of this.children) {
  //     child.mountTo(this.root);
  //   }
  // }
  mountTo(parent) {
    this.slot = <div></div>
    for (let child of this.children) {
      this.slot.appendChild(child);
    }
    this.render().mountTo(parent);
  }
  render() {
    return <article>
      <header>i'm a header</header>
      {this.slot}
      <footer>i'm a footer</footer>
    </article>
  }
}

// <cls id="a" /> 小写cls会转为字符串
// let component = <Cls id="a" />

// let component = <p id="a" class="b">
//   <Div></Div>
//   <Div></Div>
//   <Div></Div>
// </p>

// let component = <div>text</div>

let component = <MyComponent>
  <div>{new Wrapper('span')}</div>
</MyComponent>

component.mountTo(document.body);
console.log(component);
// component.setAttribute("id", a);