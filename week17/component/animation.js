export class Timeline {
  constructor() {
    this.animations = new Set();
    this.finishedAnimations = new Set();
    this.addTimes = new Map();
    this.requestID = null;

    this.state = 'inited';

    this.tick = () => {
      let t = Date.now() - this.startTime;
      // let animations = this.animations.filter(animation => !animation.finished);
      // console.log(animations);
      for (let animation of this.animations) {
        let {object, property, template, start, end, duration, delay, timingFunction} = animation;

        let addTime = this.addTimes.get(animation);

        if (t < delay +addTime) {
          continue;
        }
  
        let progression = timingFunction((t - delay - addTime) / duration); // 0-1之间的数
  
        
        if (t > duration + delay + addTime){
          progression = 1;
          // animation.finished = true;
          this.animations.delete(animation);
          this.finishedAnimations.add(animation);
        }
  
        // let value = start + progression * (end - start); // value是根据progress算出的当前值
        let value = animation.valueFromProgression(progression)
        // debugger;
        object[property] = template(value);

        // console.log('template(value)',object[property], template(value));
      }
      if (this.animations.size) {
        this.requestID = requestAnimationFrame(this.tick);
      } else {
        this.requestID = null;
      }
    }
  }

  pause() {
    if (this.state !== 'playing') {
      return ;
    }
    this.state = 'paused';
    this.pauseTime = Date.now();
    if (this.requestID !== null) {
      cancelAnimationFrame(this.requestID);
      this.requestID = null;
    }
  }

  resume() {
    if (this.state !== 'paused') {
      return ;
    }
    this.state = 'playing';
    this.startTime += Date.now() - this.pauseTime;
    this.tick();
  }

  reset() {
    if (this.state === 'playing') {
      this.pause();
    }
    this.animations = new Set;
    this.requestID = null;
    this.state = 'inited';
    this.startTime = Date.now();
    this.pauseTime = null;
    this.addTimes = new Map();
    this.finishedAnimations = new Set();
  }

  restart() {
    if (this.state === 'playing') {
      this.state = 'paused';
    }
    for (let animation of this.finishedAnimations) {
      this.animations.add(animation);
    }
    this.finishedAnimations = new Set();
    this.requestID = null;
    this.state = 'playing';
    this.startTime = Date.now();
    this.pauseTime = null;
    // this.addTimes = new Map();
    this.tick();
  }

  start() {
    if (this.state !== 'inited') {
      return ;
    }
    this.state = 'playing';
    this.startTime = Date.now();
    this.tick();
  }
  
  add(animation, addTime) {
    this.animations.add(animation);
    // animation.finished = false;
    // debugger;
    if (this.state === 'playing' && this.requestID === null) {
      this.tick();
    }
    if (this.state === 'playing')
      // animation.addTime = addTime !== void 0 ? addTime : Date.now() - this.startTime;
      this.addTimes.set(animation, addTime !== void 0 ? addTime : Date.now() - this.startTime);
    else 
      // animation.addTime = addTime !== void 0 ? addTime : 0;
      this.addTimes.set(animation, addTime !== void 0 ? addTime : 0);
  }
}

export class Animation {
  constructor({
    object,
    property,
    template,
    start,
    end,
    duration,
    delay, 
    timingFunction
  }) {
    this.object = object;
    this.template = template;
    this.property = property;
    this.start = start;
    this.end = end;
    this.duration = duration;
    this.delay = delay;
    this.timingFunction = timingFunction
    //  || ((start, end) => {
    //   return (t) => start + (t / duration) * (end - start);
    // })
  }
  valueFromProgression(progression) {
    return this.start + progression * (this.end - this.start)
  }
}

export class ColorAnimation {
  constructor({
      object,
      property,
      template = (v => `rgba(${v.r}, ${v.g}, ${v.b}, ${v.a})`),
      start,
      end,
      duration,
      delay, 
      timingFunction
  }) {
      this.object = object
      this.property = property
      this.template = template
      this.start = start
      this.end = end
      this.duration = duration
      this.delay = delay
      this.timingFunction = timingFunction
      
  }

  valueFromProgression(progression) {
      return {
          r: this.start.r + progression * (this.end.r - this.start.r),
          g: this.start.g + progression * (this.end.g - this.start.g),
          b: this.start.b + progression * (this.end.b - this.start.b),
          a: this.start.a + progression * (this.end.a - this.start.a)
      }
  }
}