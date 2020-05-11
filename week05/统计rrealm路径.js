//统计路径，所有realm对象
let globalProperties = [
    'eval',
    'isFinite',
    'isNaN',
    'parseFloat',
    'parseInt',
    'decodeURI',
    'decodeURIComponent',
    'encodeURI',
    'encodeURIComponent',
    'Array',
    'Date',
    'RegExp',
    'Promise',
    'Proxy',
    'Map',
    'WeakMap',
    'Set',
    'WeakSet',
    'Function',
    'Boolean',
    'String',
    'Number',
    'Symbol',
    'Object',
    'Error',
    'EvalError',
    'RangeError',
    'ReferenceError',
    'SyntaxError',
    'TypeError',
    'URIError',
    'ArrayBuffer',
    'SharedArrayBuffer',
    'DataView',
    'Float32Array',
    'Float64Array',
    'Int8Array',
    'Int16Array',
    'Int32Array',
    'Uint8Array',
    'Uint16Array',
    'Uint32Array',
    'Uint8ClampedArray',
    'Atomics',
    'JSON',
    'Math',
    'Reflect'
];

let que = [];

let set = new Set()

for (let p of globalProperties) {
    que.push({
        path: [p],
        object: this[p]
    });
}
let cur;
while(que.length) {
    cur = que.shift(); // 删除数组中的第一个元素，并返回
    console.log(cur.path.join('.'));
    if (set.has(cur.object)) {
        continue;
    }
    set.add(cur.object);
    // console.log('cur', cur);
    for (let p of Object.getOwnPropertyNames(cur.object)) {
        // console.log('p', p);
         // 返回cur对象p属性的描述: value, writable, get, set, configurable, enumerable
        let property = Object.getOwnPropertyDescriptor(cur.object, p);
        // console.log('property', property);
        // debugger;
        if (property.hasOwnProperty("value")
            && ((property.value !== null) && (typeof property.value === 'object') || typeof property.value === 'function')
            && property.value instanceof Object) {
            que.push({
                path: cur.path.concat([p]),
                object: property.value
            });
        }
        if (property.hasOwnProperty("get") && (typeof property.get === 'function')) {
            que.push({
                path: cur.path.concat([p]),
                object: property.get
            });
        }
        if (property.hasOwnProperty("set") && (typeof property.set === 'function')) {
            que.push({
                path: cur.path.concat([p]),
                object: property.set
            });
        }
    }
}