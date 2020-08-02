import { createElement, Text, Wrapper } from './createElement';
import { Timeline, Animation } from './animation';
import { ease, linear } from './cubicBezier';

import {enableGesture} from './gesture';

export class ListView {
  constructor(config) {
    // this.root = document.createElement('div');
    this.children = [];
  }
  setAttribute(name, value) {
    this[name] = value;
  }

  getAttribute(name) {
    return this[name];
  }

  appendChild(child) {
    // console.log('Parent::appendChild', child);
    // child.mountTo(this.root);
    this.children.push(child);
  }

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
    let data = this.getAttribute("data");

    return <div class="list-view" style="width: 300px">
      {
        data.map(this.children[0])
      }
    </div>;
  }
}

export const obj = {};