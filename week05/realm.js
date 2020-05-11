let queue = [
    eval,
    isFinite,
    isNaN,
    parseFloat,
    parseInt,
    decodeURI,
    decodeURIComponent,
    encodeURI,
    encodeURIComponent,
    Array,
    Date,
    RegExp,
    Promise,
    Proxy,
    Map,
    WeakMap,
    Set,
    WeakSet,
    Function,
    Boolean,
    String,
    Number,
    Symbol,
    Object,
    Error,
    EvalError,
    RangeError,
    ReferenceError,
    SyntaxError,
    TypeError,
    URIError,
    ArrayBuffer,
    SharedArrayBuffer,
    DataView,
    Float32Array,
    Float64Array,
    Int8Array,
    Int16Array,
    Int32Array,
    Uint8Array,
    Uint16Array,
    Uint32Array,
    Uint8ClampedArray,
    Atomics,
    JSON,
    Math,
    Reflect
];

let set = new Set();

let current;
// 广度优先搜索，查找全局对象的所有属性和Getter和Setter，
// 获得JavaScript中所有的固有对象，即创建这些全局对象时，还有哪些对象是被同时创建的
while(queue.length) {
    current = queue.shift(); // 删除数组中的第一个元素，并返回
    if (set.has(current)) {
        continue;
    }
    set.add(current);

    for (let p of Object.getOwnPropertyNames(current)) {
         // 返回current对象p属性的描述: value, writable, get, set, configurable, enumerable
        let property = Object.getOwnPropertyDescriptor(current, p);
        if (property.hasOwnProperty("value") && property.value instanceof Object) {
            queue.push(property.value);
        }
        if (property.hasOwnProperty("get")) {
            queue.push(property.get);
        }
        if (property.hasOwnProperty("set")) {
            queue.push(property.set);
        }
    }
}

