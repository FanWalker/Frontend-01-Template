import { createElement, Text, Wrapper } from './createElement';
import { Carousel } from './carousel.view';



/**
 * 
 * @param {构造器函数} Cls 
 * @param {属性对象} attributes 
 */
/*
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
class Carousel {
  constructor(config) {
    // this.root = document.createElement('div');
    this.children = [];
  }
  setAttribute(name, value) {
    this[name] = value;
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
    this.render().mountTo(parent);
  }
  render() {
    let children = this.data.map( url => {
      let element = <img src={url} />;
      element.addEventListener("dragstart", event => event.preventDefault());
      return element;
    });

    let root = <div class="carousel">
      { children }
    </div>
    
    let position = 0;

    let nextPic = () => {
      let nextPosition = (position + 1) % this.data.length;

      let current = children[position];
      let next = children[nextPosition];

      current.style.transition = "ease 0s";
      next.style.transition = "ease 0s";

      current.style.transform = `translateX(${- 100 * position}%)`;
      next.style.transform = `translateX(${100 - 100 * nextPosition}%)`;


      // requestAnimationFrame(function(){
      //   requestAnimationFrame(function(){

      //   })
      // })

      setTimeout(() => {
        current.style.transition = "ease 0.5s";
        next.style.transition = "ease 0.5s";

        current.style.transform = `translateX(${- 100 - 100 * position}%)`;
        next.style.transform = `translateX(${- 100 * nextPosition}%)`;

        position = nextPosition;
      }, 16);

      setTimeout(nextPic, 3000); 
    }

    setTimeout(nextPic, 3000); 

    return root;
  }
}
*/
// <cls id="a" /> 小写cls会转为字符串
// let component = <Cls id="a" />

// let component = <p id="a" class="b">
//   <Div></Div>
//   <Div></Div>
//   <Div></Div>
// </p>

// let component = <div>text</div>

// let component = <MyComponent>
//   <div>{new Wrapper('span')}</div>
// </MyComponent>Carousel
let component = <Carousel data={[
  "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
  "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
  "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
  "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg",
]}/>

component.mountTo(document.body);
console.log(component);
// component.setAttribute("id", a);