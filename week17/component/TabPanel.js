import { createElement, Text, Wrapper } from './createElement';
import { Timeline, Animation } from './animation';
import { ease, linear } from './cubicBezier';

import {enableGesture} from './gesture';

export class TabPanel {
  constructor(config) {
    // this.root = document.createElement('div');
    this.children = [];
  }
  setAttribute(name, value) {
    this[name] = value;
  }
  appendChild(child) {
    // console.log('Parent::appendChild', child);
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

  select(i) {
    for (let view of this.childrenViews) {
      view.style.display = "none";
    }
    this.childrenViews[i].style.display = "";

    for (let view of this.titleView) {
      view.classList.remove("selected");
    }
    this.titleView[i].classList.add("selected");
  }

  mountTo(parent) {
    this.render().mountTo(parent);
  }
  render() {
    this.childrenViews = this.children.map(child => <div style="width:300px;min-height:300px">{child}</div>);
    this.titleView = this.children.map((child, i) => <span onClick={() => this.select(i)}
      style="background-color:lightgreen;display:inline-block;font-size:18px;margin-right:10px;">{child.getAttribute("title")}</span>);

    for (let view of this.children) {
      console.log('view', view);
    }

    console.log(this.childrenViews);
    setTimeout(() => this.select(0), 16);

    return <div class="tabpanel" style="width: 300px">
      <h1 style="width:300px;margin:0">{this.titleView}</h1>
        <div  style="border: 1px solid lightgreen;">
          {this.childrenViews}
        </div>
    </div>;
  }
}

export const obj = {};