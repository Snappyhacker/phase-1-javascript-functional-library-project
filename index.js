// index.js

function myEach(collection, callback) {
    if (Array.isArray(collection)) {
        for (let i = 0; i < collection.length; i++) {
            callback(collection[i]);
        }
    } else {
        for (const key in collection) {
            callback(collection[key]);
        }
    }
    return collection;
}

function myMap(collection, callback) {
    const result = [];
    myEach(collection, (value) => {
        result.push(callback(value));
    });
    return result;
}

function myReduce(collection, callback, acc) {
    let isObject = typeof collection === 'object' && !Array.isArray(collection);
    let startIndex = 0;

    if (acc === undefined) {
        if (isObject) {
            acc = Object.values(collection)[0];
            startIndex = 1;
        } else {
            acc = collection[0];
            startIndex = 1;
        }
    }

    for (let i = startIndex; i < (isObject ? Object.values(collection).length : collection.length); i++) {
        const value = isObject ? Object.values(collection)[i] : collection[i];
        acc = callback(acc, value, collection);
    }

    return acc;
}

function myFind(collection, predicate) {
    for (let i = 0; i < collection.length; i++) {
        if (predicate(collection[i])) {
            return collection[i];
        }
    }
    return undefined;
}

function myFilter(collection, predicate) {
    const result = [];
    myEach(collection, (value) => {
        if (predicate(value)) {
            result.push(value);
        }
    });
    return result;
}

function mySize(collection) {
    return Array.isArray(collection) ? collection.length : Object.keys(collection).length;
}

function myFirst(collection, n) {
    return n ? collection.slice(0, n) : collection[0];
}

function myLast(collection, n) {
    return n ? collection.slice(-n) : collection[collection.length - 1];
}

function myKeys(object) {
    return Object.keys(object);
}

function myValues(object) {
    return Object.values(object);
}

// Helper functions for testing
function arraysEqual(arrA, arrB) {
    if (arrA.length !== arrB.length) return false;
    for (let idx = 0; idx < arrA.length; idx++) {
        if (Array.isArray(arrA[idx]) && Array.isArray(arrB[idx])) {
            arraysEqual(arrA[idx], arrB[idx]);
        } else if (arrA[idx] !== arrB[idx]) {
            return false;
        }
    }
    return true;
}

function objectsEqual(objA, objB) {
    return JSON.stringify(objA) === JSON.stringify(objB);
}
