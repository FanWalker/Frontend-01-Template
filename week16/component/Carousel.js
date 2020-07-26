import { createElement, Text, Wrapper } from './createElement';
import { Timeline, Animation } from './animation';
import { ease, linear } from './cubicBezier';

import {enableGesture} from './gesture';

export class Carousel {
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
    let position = 0;

    let timeline = new Timeline;

    timeline.start();
  
    let nextPicStopHandler = null;

    let children = this.data.map( (url, currentPosition) => {

      let lastPosition = (currentPosition - 1 + this.data.length) % this.data.length;
      let nextPosition = (currentPosition + 1) % this.data.length;

      let offset = 0;

      let onStart = () => {
        timeline.pause();
        clearTimeout(nextPicStopHandler);

        let currentElement = children[currentPosition];

        let currentTransformValue = Number(currentElement.style.transform.match(/translateX\(([\s\S]+)px\)/)[1]);
        offset = currentTransformValue + 500 * currentPosition
      }
  
      let onPan = event => {
        
        let lastElement = children[lastPosition];
        let currentElement = children[currentPosition];
        let nextElement = children[nextPosition];

        let currentTransformValue = -500 * currentPosition + offset;
        let lastTransformValue = -500 - 500 * lastPosition + offset;
        let nextTransformValue = 500 - 500 * nextPosition + offset;

        let dx = event.clientX - event.startX;

        lastElement.style.transform = `translate(${lastTransformValue + dx}px)`;
        currentElement.style.transform = `translate(${currentTransformValue + dx}px)`;
        nextElement.style.transform = `translate(${nextTransformValue + dx}px)`;
      }
  
      let onPanend = event => {
        let direction = 0;
        let dx = event.clientX - event.startX;

        if (dx + offset > 250) {
          direction = 1;
        } else if (dx + offset < -250) {
          direction = -1;
        }

        timeline.reset();
        timeline.start();
        
        let lastElement = children[lastPosition];
        let currentElement = children[currentPosition];
        let nextElement = children[nextPosition];
        
        let lastAnimation = new Animation({
          object: lastElement.style,
          property: 'transform',
          template: v => `translateX(${v}px)`,
          start: -500 - 500 * lastPosition + offset + dx,
          end: -500 - 500 * lastPosition + direction * 500,
          duration: 500,
          delay: 0, 
          timingFunction: ease,
        });
          
        let currentAnimation = new Animation({
          object: currentElement.style,
          property: 'transform',
          template: v => `translateX(${v}px)`,
          start: -500 * currentPosition + offset + dx,
          end: -500 * currentPosition + direction * 500,
          duration: 500,
          delay: 0, 
          timingFunction: ease,
        });
        
        let nextAnimation = new Animation({
          object: nextElement.style,
          property: 'transform',
          template: v => `translateX(${v}px)`,
          start: 500 - 500 * nextPosition + offset + dx,
          end: 500 - 500 * nextPosition + direction * 500,
          duration: 500,
          delay: 0, 
          timingFunction: ease,
        });

        timeline.add(lastAnimation);
        timeline.add(currentAnimation);
        timeline.add(nextAnimation);

        position = (position - direction + this.data.length) % this.data.length;

        nextPicStopHandler = setTimeout(nextPic, 3000); 
      }

      let element = <img src={url} onStart={onStart} onPanend={onPanend} onPan={onPan} enableGesture={true} />;
      element.style.transform = 'translateX(0px)';
      element.addEventListener("dragstart", event => event.preventDefault());
      return element;
    });

    let root = <div class="carousel">
      { children }
    </div>
  
    let nextPic = () => {
      let nextPosition = (position + 1) % this.data.length;

      let current = children[position];
      let next = children[nextPosition];

      let currentAnimation = new Animation({
        object: current.style,
        property: 'transform',
        template: v => `translateX(${5 * v}px)`,
        start: - 100 * position,
        end: - 100 - 100 * position,
        duration: 500,
        delay: 0, 
        timingFunction: ease,
      });
      
      let nextAnimation = new Animation({
        object: next.style,
        property: 'transform',
        template: v => `translateX(${5 * v}px)`,
        start: 100 - 100 * nextPosition,
        end: - 100 * nextPosition,
        duration: 500,
        delay: 0, 
        timingFunction: ease,
      });

      timeline.add(currentAnimation);
      timeline.add(nextAnimation);
      
      position = nextPosition;
      // current.style.transition = "ease 0s";
      // next.style.transition = "ease 0s";

      // current.style.transform = `translateX(${- 100 * position}%)`;
      // next.style.transform = `translateX(${100 - 100 * nextPosition}%)`;


      // requestAnimationFrame(function(){
      //   requestAnimationFrame(function(){

      //   })
      // })

      // setTimeout(() => {
      //   current.style.transition = "ease 0.5s";
      //   next.style.transition = "ease 0.5s";

      //   current.style.transform = `translateX(${- 100 - 100 * position}%)`;
      //   next.style.transform = `translateX(${- 100 * nextPosition}%)`;

      //   position = nextPosition;
      // }, 16);

      nextPicStopHandler = setTimeout(nextPic, 3000); 
    }

    nextPicStopHandler = setTimeout(nextPic, 3000); 

    return root;
  }
}

export const obj = {};