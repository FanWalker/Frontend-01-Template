export function enableGesture(element) {
  let contexts = Object.create(null);
  let MOUSE_SYMBOL = Symbol('mouse'); // 为了和touch的identifier不冲突

  if (document.ontouchstart !== null) {
    element.addEventListener('mousedown', (event) => {
      contexts[MOUSE_SYMBOL] = Object.create(null);

      start(event, contexts[MOUSE_SYMBOL]);
      let mousemove = event => {
        move(event, contexts[MOUSE_SYMBOL]);
      }
      let mouseend = event => {
        end(event, contexts[MOUSE_SYMBOL]);
        document.removeEventListener('mousemove', mousemove);
        document.removeEventListener('mouseup', mouseend);
      }
      document.addEventListener('mousemove', mousemove);
      document.addEventListener('mouseup', mouseend);
    })
  }

  element.addEventListener('touchstart', event => {
    for (let touch of event.changedTouches) {
      contexts[touch.identifier] = Object.create(null);
      start(touch, contexts[touch.identifier]);
    }
  })

  element.addEventListener('touchmove', event => {
    for (let touch of event.changedTouches) {
      move(touch, contexts[touch.identifier]);
    }
  })

  element.addEventListener('touchend', event => {
    for (let touch of event.changedTouches) {
      end(touch, contexts[touch.identifier]);
      delete contexts[touch.identifier];
    }
  })

  element.addEventListener('touchcancel', event => {
    for (let touch of event.changedTouches) {
      cancel(touch, contexts[touch.identifier]);
      delete contexts[touch.identifier];
    }
  })

  let start = (point, context) => {
    element.dispatchEvent(Object.assign(new CustomEvent('start'), {
      startX: context.startX,
      startY: context.startY,
      clientX: point.clientX,
      clientY: point.clientY,
    }));
  
    context.startX = point.clientX;
    context.startY = point.clientY;
    context.moves = [];
    context.isTap = true;
    context.isPan = false;
    context.isPress = false;
    context.timeoutHandler = setTimeout(() => {
      if (context.isPan) {
        return ;
      }
      context.isTap = false;
      context.isPan = false;
      context.isPress = true;
      console.log('pressstart');
      element.dispatchEvent(Object.assign(new CustomEvent('pressstart'), {}));
    }, 500)
  }
  let move = (point, context) => {
    let dx = point.clientX - context.startX, dy = point.clientY - context.startY;

    if (dx ** 2 + dy ** 2 > 100 && !context.isPan) {
      if (context.isPress) {
        console.log('presscancel');
        element.dispatchEvent(Object.assign(new CustomEvent('presscancel'), {}));
      }
      context.isTap = false;
      context.isPan = true;
      context.isPress = false;
      console.log('panstart');
      element.dispatchEvent(Object.assign(new CustomEvent('panstart'), {
        startX: context.startX,
        startY: context.startY,
        clientX: point.clientX,
        clientY: point.clientY,
      }));
    }

    context.moves = context.moves.filter(record => Date.now() - record.t < 300);

    if (context.isPan) {
      context.moves.push({
        dx,
        dy,
        t: Date.now(),
      });

      context.moves = context.moves.filter(record => Date.now() - record.t < 300);

      console.log('pan');
      
      element.dispatchEvent(Object.assign(new CustomEvent('pan'), {
        startX: context.startX,
        startY: context.startY,
        clientX: point.clientX,
        clientY: point.clientY,
      }));
    }

  }
  let end = (point, context) => {
    if (context.isPan) {
      let dx = point.clientX - context.startX, dy = point.clientY - context.startY;

      let record = context.moves[0];
      let speed = Math.sqrt((record.dx - dx) ** 2 + (record.dy - dy) ** 2) / (Date.now() - record.t);

      let isFlick = speed > 2.5

      if (isFlick) {
        console.log('flick');
        element.dispatchEvent(Object.assign(new CustomEvent('panend'), {
          startX: context.startX,
          startY: context.startY,
          clientX: point.clientX,
          clientY: point.clientY,
          speed: speed,
        }));
      }
    
      element.dispatchEvent(Object.assign(new CustomEvent('panend'), {
        startX: context.startX,
        startY: context.startY,
        clientX: point.clientX,
        clientY: point.clientY,
        speed: speed,
        isFlick: isFlick
      }));
      

    }
    if (context.isTap) {
      element.dispatchEvent(Object.assign(new CustomEvent('tap'), {}));
    }
    if (context.isPress) {
      element.dispatchEvent(Object.assign(new CustomEvent('pressend'), {}));
    }

    clearTimeout(context.timeoutHandler);
  }
  let cancel = (point, context) => {
    console.log('cancel', point.clientX, point.clientY);
    element.dispatchEvent(Object.assign(new CustomEvent('cancel'), {}));
    clearTimeout(context.timeoutHandler);
  }
}