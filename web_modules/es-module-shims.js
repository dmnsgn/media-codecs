import { g as getIteratorDirect, a as aCallable, b as asyncIteratorCreateProxy, c as anObject, f as functionCall, d as createIterResultObject, i as isObject, e as asyncIteratorClose, _ as _export, h as iteratorCreateProxy, j as callWithSafeIterationClosing, k as asyncIteratorIteration, l as iterate, o as objectDefineProperty, m as makeBuiltIn_1, n as global_1, p as objectGetPrototypeOf, w as wellKnownSymbol, u as uid, q as objectSetPrototypeOf, r as classof, s as isCallable, t as descriptors, v as hasOwnProperty_1, x as createNonEnumerableProperty, y as internalState, z as objectIsPrototypeOf, A as tryToString, B as defineBuiltIn, C as lengthOfArrayLike, D as toIntegerOrInfinity, E as toObject, F as indexedObject, G as functionBindContext, H as classofRaw, I as getBuiltIn, J as functionUncurryThis, K as fails, L as inspectSource, M as isNullOrUndefined, N as objectCreate, O as toPropertyKey, P as toPrimitive, Q as toAbsoluteIndex, R as commonjsGlobal } from './common/esnext.iterator.filter-e12367b4.js';

var AsyncIteratorProxy = asyncIteratorCreateProxy(function (Promise) {
  var state = this;
  var iterator = state.iterator;
  var mapper = state.mapper;

  return new Promise(function (resolve, reject) {
    var doneAndReject = function (error) {
      state.done = true;
      reject(error);
    };

    var ifAbruptCloseAsyncIterator = function (error) {
      asyncIteratorClose(iterator, doneAndReject, error, doneAndReject);
    };

    Promise.resolve(anObject(functionCall(state.next, iterator))).then(function (step) {
      try {
        if (anObject(step).done) {
          state.done = true;
          resolve(createIterResultObject(undefined, true));
        } else {
          var value = step.value;
          try {
            var result = mapper(value, state.counter++);

            var handler = function (mapped) {
              resolve(createIterResultObject(mapped, false));
            };

            if (isObject(result)) Promise.resolve(result).then(handler, ifAbruptCloseAsyncIterator);
            else handler(result);
          } catch (error2) { ifAbruptCloseAsyncIterator(error2); }
        }
      } catch (error) { doneAndReject(error); }
    }, doneAndReject);
  });
});

// `AsyncIterator.prototype.map` method
// https://github.com/tc39/proposal-iterator-helpers
var asyncIteratorMap = function map(mapper) {
  return new AsyncIteratorProxy(getIteratorDirect(this), {
    mapper: aCallable(mapper)
  });
};

// `AsyncIterator.prototype.map` method
// https://github.com/tc39/proposal-async-iterator-helpers
_export({ target: 'AsyncIterator', proto: true, real: true }, {
  map: asyncIteratorMap
});

var IteratorProxy = iteratorCreateProxy(function () {
  var iterator = this.iterator;
  var result = anObject(functionCall(this.next, iterator));
  var done = this.done = !!result.done;
  if (!done) return callWithSafeIterationClosing(iterator, this.mapper, [result.value, this.counter++], true);
});

// `Iterator.prototype.map` method
// https://github.com/tc39/proposal-iterator-helpers
var iteratorMap = function map(mapper) {
  return new IteratorProxy(getIteratorDirect(this), {
    mapper: aCallable(mapper)
  });
};

// `Iterator.prototype.map` method
// https://github.com/tc39/proposal-iterator-helpers
_export({ target: 'Iterator', proto: true, real: true }, {
  map: iteratorMap
});

var $some = asyncIteratorIteration.some;

// `AsyncIterator.prototype.some` method
// https://github.com/tc39/proposal-async-iterator-helpers
_export({ target: 'AsyncIterator', proto: true, real: true }, {
  some: function some(predicate) {
    return $some(this, predicate);
  }
});

// `Iterator.prototype.some` method
// https://github.com/tc39/proposal-iterator-helpers
_export({ target: 'Iterator', proto: true, real: true }, {
  some: function some(predicate) {
    var record = getIteratorDirect(this);
    var counter = 0;
    aCallable(predicate);
    return iterate(record, function (value, stop) {
      if (predicate(value, counter++)) return stop();
    }, { IS_RECORD: true, INTERRUPTED: true }).stopped;
  }
});

// eslint-disable-next-line es/no-typed-arrays -- safe
var arrayBufferBasicDetection = typeof ArrayBuffer != 'undefined' && typeof DataView != 'undefined';

var defineBuiltInAccessor = function (target, name, descriptor) {
  if (descriptor.get) makeBuiltIn_1(descriptor.get, name, { getter: true });
  if (descriptor.set) makeBuiltIn_1(descriptor.set, name, { setter: true });
  return objectDefineProperty.f(target, name, descriptor);
};

var enforceInternalState = internalState.enforce;
var getInternalState = internalState.get;
var Int8Array$1 = global_1.Int8Array;
var Int8ArrayPrototype = Int8Array$1 && Int8Array$1.prototype;
var Uint8ClampedArray = global_1.Uint8ClampedArray;
var Uint8ClampedArrayPrototype = Uint8ClampedArray && Uint8ClampedArray.prototype;
var TypedArray = Int8Array$1 && objectGetPrototypeOf(Int8Array$1);
var TypedArrayPrototype = Int8ArrayPrototype && objectGetPrototypeOf(Int8ArrayPrototype);
var ObjectPrototype = Object.prototype;
var TypeError$1 = global_1.TypeError;

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var TYPED_ARRAY_TAG = uid('TYPED_ARRAY_TAG');
var TYPED_ARRAY_CONSTRUCTOR = 'TypedArrayConstructor';
// Fixing native typed arrays in Opera Presto crashes the browser, see #595
var NATIVE_ARRAY_BUFFER_VIEWS = arrayBufferBasicDetection && !!objectSetPrototypeOf && classof(global_1.opera) !== 'Opera';
var TYPED_ARRAY_TAG_REQUIRED = false;
var NAME, Constructor, Prototype;

var TypedArrayConstructorsList = {
  Int8Array: 1,
  Uint8Array: 1,
  Uint8ClampedArray: 1,
  Int16Array: 2,
  Uint16Array: 2,
  Int32Array: 4,
  Uint32Array: 4,
  Float32Array: 4,
  Float64Array: 8
};

var BigIntArrayConstructorsList = {
  BigInt64Array: 8,
  BigUint64Array: 8
};

var isView = function isView(it) {
  if (!isObject(it)) return false;
  var klass = classof(it);
  return klass === 'DataView'
    || hasOwnProperty_1(TypedArrayConstructorsList, klass)
    || hasOwnProperty_1(BigIntArrayConstructorsList, klass);
};

var getTypedArrayConstructor = function (it) {
  var proto = objectGetPrototypeOf(it);
  if (!isObject(proto)) return;
  var state = getInternalState(proto);
  return (state && hasOwnProperty_1(state, TYPED_ARRAY_CONSTRUCTOR)) ? state[TYPED_ARRAY_CONSTRUCTOR] : getTypedArrayConstructor(proto);
};

var isTypedArray = function (it) {
  if (!isObject(it)) return false;
  var klass = classof(it);
  return hasOwnProperty_1(TypedArrayConstructorsList, klass)
    || hasOwnProperty_1(BigIntArrayConstructorsList, klass);
};

var aTypedArray = function (it) {
  if (isTypedArray(it)) return it;
  throw TypeError$1('Target is not a typed array');
};

var aTypedArrayConstructor = function (C) {
  if (isCallable(C) && (!objectSetPrototypeOf || objectIsPrototypeOf(TypedArray, C))) return C;
  throw TypeError$1(tryToString(C) + ' is not a typed array constructor');
};

var exportTypedArrayMethod = function (KEY, property, forced, options) {
  if (!descriptors) return;
  if (forced) for (var ARRAY in TypedArrayConstructorsList) {
    var TypedArrayConstructor = global_1[ARRAY];
    if (TypedArrayConstructor && hasOwnProperty_1(TypedArrayConstructor.prototype, KEY)) try {
      delete TypedArrayConstructor.prototype[KEY];
    } catch (error) {
      // old WebKit bug - some methods are non-configurable
      try {
        TypedArrayConstructor.prototype[KEY] = property;
      } catch (error2) { /* empty */ }
    }
  }
  if (!TypedArrayPrototype[KEY] || forced) {
    defineBuiltIn(TypedArrayPrototype, KEY, forced ? property
      : NATIVE_ARRAY_BUFFER_VIEWS && Int8ArrayPrototype[KEY] || property, options);
  }
};

var exportTypedArrayStaticMethod = function (KEY, property, forced) {
  var ARRAY, TypedArrayConstructor;
  if (!descriptors) return;
  if (objectSetPrototypeOf) {
    if (forced) for (ARRAY in TypedArrayConstructorsList) {
      TypedArrayConstructor = global_1[ARRAY];
      if (TypedArrayConstructor && hasOwnProperty_1(TypedArrayConstructor, KEY)) try {
        delete TypedArrayConstructor[KEY];
      } catch (error) { /* empty */ }
    }
    if (!TypedArray[KEY] || forced) {
      // V8 ~ Chrome 49-50 `%TypedArray%` methods are non-writable non-configurable
      try {
        return defineBuiltIn(TypedArray, KEY, forced ? property : NATIVE_ARRAY_BUFFER_VIEWS && TypedArray[KEY] || property);
      } catch (error) { /* empty */ }
    } else return;
  }
  for (ARRAY in TypedArrayConstructorsList) {
    TypedArrayConstructor = global_1[ARRAY];
    if (TypedArrayConstructor && (!TypedArrayConstructor[KEY] || forced)) {
      defineBuiltIn(TypedArrayConstructor, KEY, property);
    }
  }
};

for (NAME in TypedArrayConstructorsList) {
  Constructor = global_1[NAME];
  Prototype = Constructor && Constructor.prototype;
  if (Prototype) enforceInternalState(Prototype)[TYPED_ARRAY_CONSTRUCTOR] = Constructor;
  else NATIVE_ARRAY_BUFFER_VIEWS = false;
}

for (NAME in BigIntArrayConstructorsList) {
  Constructor = global_1[NAME];
  Prototype = Constructor && Constructor.prototype;
  if (Prototype) enforceInternalState(Prototype)[TYPED_ARRAY_CONSTRUCTOR] = Constructor;
}

// WebKit bug - typed arrays constructors prototype is Object.prototype
if (!NATIVE_ARRAY_BUFFER_VIEWS || !isCallable(TypedArray) || TypedArray === Function.prototype) {
  // eslint-disable-next-line no-shadow -- safe
  TypedArray = function TypedArray() {
    throw TypeError$1('Incorrect invocation');
  };
  if (NATIVE_ARRAY_BUFFER_VIEWS) for (NAME in TypedArrayConstructorsList) {
    if (global_1[NAME]) objectSetPrototypeOf(global_1[NAME], TypedArray);
  }
}

if (!NATIVE_ARRAY_BUFFER_VIEWS || !TypedArrayPrototype || TypedArrayPrototype === ObjectPrototype) {
  TypedArrayPrototype = TypedArray.prototype;
  if (NATIVE_ARRAY_BUFFER_VIEWS) for (NAME in TypedArrayConstructorsList) {
    if (global_1[NAME]) objectSetPrototypeOf(global_1[NAME].prototype, TypedArrayPrototype);
  }
}

// WebKit bug - one more object in Uint8ClampedArray prototype chain
if (NATIVE_ARRAY_BUFFER_VIEWS && objectGetPrototypeOf(Uint8ClampedArrayPrototype) !== TypedArrayPrototype) {
  objectSetPrototypeOf(Uint8ClampedArrayPrototype, TypedArrayPrototype);
}

if (descriptors && !hasOwnProperty_1(TypedArrayPrototype, TO_STRING_TAG)) {
  TYPED_ARRAY_TAG_REQUIRED = true;
  defineBuiltInAccessor(TypedArrayPrototype, TO_STRING_TAG, {
    configurable: true,
    get: function () {
      return isObject(this) ? this[TYPED_ARRAY_TAG] : undefined;
    }
  });
  for (NAME in TypedArrayConstructorsList) if (global_1[NAME]) {
    createNonEnumerableProperty(global_1[NAME], TYPED_ARRAY_TAG, NAME);
  }
}

var arrayBufferViewCore = {
  NATIVE_ARRAY_BUFFER_VIEWS: NATIVE_ARRAY_BUFFER_VIEWS,
  TYPED_ARRAY_TAG: TYPED_ARRAY_TAG_REQUIRED && TYPED_ARRAY_TAG,
  aTypedArray: aTypedArray,
  aTypedArrayConstructor: aTypedArrayConstructor,
  exportTypedArrayMethod: exportTypedArrayMethod,
  exportTypedArrayStaticMethod: exportTypedArrayStaticMethod,
  getTypedArrayConstructor: getTypedArrayConstructor,
  isView: isView,
  isTypedArray: isTypedArray,
  TypedArray: TypedArray,
  TypedArrayPrototype: TypedArrayPrototype
};

var aTypedArray$1 = arrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod$1 = arrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.at` method
// https://github.com/tc39/proposal-relative-indexing-method
exportTypedArrayMethod$1('at', function at(index) {
  var O = aTypedArray$1(this);
  var len = lengthOfArrayLike(O);
  var relativeIndex = toIntegerOrInfinity(index);
  var k = relativeIndex >= 0 ? relativeIndex : len + relativeIndex;
  return (k < 0 || k >= len) ? undefined : O[k];
});

// `Array.prototype.{ findLast, findLastIndex }` methods implementation
var createMethod = function (TYPE) {
  var IS_FIND_LAST_INDEX = TYPE == 1;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = indexedObject(O);
    var boundFunction = functionBindContext(callbackfn, that);
    var index = lengthOfArrayLike(self);
    var value, result;
    while (index-- > 0) {
      value = self[index];
      result = boundFunction(value, index, O);
      if (result) switch (TYPE) {
        case 0: return value; // findLast
        case 1: return index; // findLastIndex
      }
    }
    return IS_FIND_LAST_INDEX ? -1 : undefined;
  };
};

var arrayIterationFromLast = {
  // `Array.prototype.findLast` method
  // https://github.com/tc39/proposal-array-find-from-last
  findLast: createMethod(0),
  // `Array.prototype.findLastIndex` method
  // https://github.com/tc39/proposal-array-find-from-last
  findLastIndex: createMethod(1)
};

var $findLast = arrayIterationFromLast.findLast;

var aTypedArray$2 = arrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod$2 = arrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.findLast` method
// https://github.com/tc39/proposal-array-find-from-last
exportTypedArrayMethod$2('findLast', function findLast(predicate /* , thisArg */) {
  return $findLast(aTypedArray$2(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
});

var $findLastIndex = arrayIterationFromLast.findLastIndex;

var aTypedArray$3 = arrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod$3 = arrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.findLastIndex` method
// https://github.com/tc39/proposal-array-find-from-last
exportTypedArrayMethod$3('findLastIndex', function findLastIndex(predicate /* , thisArg */) {
  return $findLastIndex(aTypedArray$3(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
});

// `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
// eslint-disable-next-line es/no-array-isarray -- safe
var isArray = Array.isArray || function isArray(argument) {
  return classofRaw(argument) == 'Array';
};

var noop = function () { /* empty */ };
var empty = [];
var construct = getBuiltIn('Reflect', 'construct');
var constructorRegExp = /^\s*(?:class|function)\b/;
var exec = functionUncurryThis(constructorRegExp.exec);
var INCORRECT_TO_STRING = !constructorRegExp.exec(noop);

var isConstructorModern = function isConstructor(argument) {
  if (!isCallable(argument)) return false;
  try {
    construct(noop, empty, argument);
    return true;
  } catch (error) {
    return false;
  }
};

var isConstructorLegacy = function isConstructor(argument) {
  if (!isCallable(argument)) return false;
  switch (classof(argument)) {
    case 'AsyncFunction':
    case 'GeneratorFunction':
    case 'AsyncGeneratorFunction': return false;
  }
  try {
    // we can't check .prototype since constructors produced by .bind haven't it
    // `Function#toString` throws on some built-it function in some legacy engines
    // (for example, `DOMQuad` and similar in FF41-)
    return INCORRECT_TO_STRING || !!exec(constructorRegExp, inspectSource(argument));
  } catch (error) {
    return true;
  }
};

isConstructorLegacy.sham = true;

// `IsConstructor` abstract operation
// https://tc39.es/ecma262/#sec-isconstructor
var isConstructor = !construct || fails(function () {
  var called;
  return isConstructorModern(isConstructorModern.call)
    || !isConstructorModern(Object)
    || !isConstructorModern(function () { called = true; })
    || called;
}) ? isConstructorLegacy : isConstructorModern;

var SPECIES = wellKnownSymbol('species');
var $Array = Array;

// a part of `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate
var arraySpeciesConstructor = function (originalArray) {
  var C;
  if (isArray(originalArray)) {
    C = originalArray.constructor;
    // cross-realm fallback
    if (isConstructor(C) && (C === $Array || isArray(C.prototype))) C = undefined;
    else if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? $Array : C;
};

// `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate
var arraySpeciesCreate = function (originalArray, length) {
  return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
};

var push = functionUncurryThis([].push);

// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation
var createMethod$1 = function (TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var IS_FILTER_REJECT = TYPE == 7;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject($this);
    var self = indexedObject(O);
    var boundFunction = functionBindContext(callbackfn, that);
    var length = lengthOfArrayLike(self);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate;
    var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_REJECT ? create($this, 0) : undefined;
    var value, result;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);
      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
          case 3: return true;              // some
          case 5: return value;             // find
          case 6: return index;             // findIndex
          case 2: push(target, value);      // filter
        } else switch (TYPE) {
          case 4: return false;             // every
          case 7: push(target, value);      // filterReject
        }
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

var arrayIteration = {
  // `Array.prototype.forEach` method
  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  forEach: createMethod$1(0),
  // `Array.prototype.map` method
  // https://tc39.es/ecma262/#sec-array.prototype.map
  map: createMethod$1(1),
  // `Array.prototype.filter` method
  // https://tc39.es/ecma262/#sec-array.prototype.filter
  filter: createMethod$1(2),
  // `Array.prototype.some` method
  // https://tc39.es/ecma262/#sec-array.prototype.some
  some: createMethod$1(3),
  // `Array.prototype.every` method
  // https://tc39.es/ecma262/#sec-array.prototype.every
  every: createMethod$1(4),
  // `Array.prototype.find` method
  // https://tc39.es/ecma262/#sec-array.prototype.find
  find: createMethod$1(5),
  // `Array.prototype.findIndex` method
  // https://tc39.es/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod$1(6),
  // `Array.prototype.filterReject` method
  // https://github.com/tc39/proposal-array-filtering
  filterReject: createMethod$1(7)
};

var arrayFromConstructorAndList = function (Constructor, list) {
  var index = 0;
  var length = lengthOfArrayLike(list);
  var result = new Constructor(length);
  while (length > index) result[index] = list[index++];
  return result;
};

var $TypeError = TypeError;

// `Assert: IsConstructor(argument) is true`
var aConstructor = function (argument) {
  if (isConstructor(argument)) return argument;
  throw $TypeError(tryToString(argument) + ' is not a constructor');
};

var SPECIES$1 = wellKnownSymbol('species');

// `SpeciesConstructor` abstract operation
// https://tc39.es/ecma262/#sec-speciesconstructor
var speciesConstructor = function (O, defaultConstructor) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || isNullOrUndefined(S = anObject(C)[SPECIES$1]) ? defaultConstructor : aConstructor(S);
};

var aTypedArrayConstructor$1 = arrayBufferViewCore.aTypedArrayConstructor;
var getTypedArrayConstructor$1 = arrayBufferViewCore.getTypedArrayConstructor;

// a part of `TypedArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#typedarray-species-create
var typedArraySpeciesConstructor = function (originalArray) {
  return aTypedArrayConstructor$1(speciesConstructor(originalArray, getTypedArrayConstructor$1(originalArray)));
};

var typedArrayFromSpeciesAndList = function (instance, list) {
  return arrayFromConstructorAndList(typedArraySpeciesConstructor(instance), list);
};

var $filterReject = arrayIteration.filterReject;


var aTypedArray$4 = arrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod$4 = arrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.filterReject` method
// https://github.com/tc39/proposal-array-filtering
exportTypedArrayMethod$4('filterReject', function filterReject(callbackfn /* , thisArg */) {
  var list = $filterReject(aTypedArray$4(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  return typedArrayFromSpeciesAndList(this, list);
}, true);

var $Array$1 = Array;
var push$1 = functionUncurryThis([].push);

var arrayGroup = function ($this, callbackfn, that, specificConstructor) {
  var O = toObject($this);
  var self = indexedObject(O);
  var boundFunction = functionBindContext(callbackfn, that);
  var target = objectCreate(null);
  var length = lengthOfArrayLike(self);
  var index = 0;
  var Constructor, key, value;
  for (;length > index; index++) {
    value = self[index];
    key = toPropertyKey(boundFunction(value, index, O));
    // in some IE10 builds, `hasOwnProperty` returns incorrect result on integer keys
    // but since it's a `null` prototype object, we can safely use `in`
    if (key in target) push$1(target[key], value);
    else target[key] = [value];
  }
  // TODO: Remove this block from `core-js@4`
  if (specificConstructor) {
    Constructor = specificConstructor(O);
    if (Constructor !== $Array$1) {
      for (key in target) target[key] = arrayFromConstructorAndList(Constructor, target[key]);
    }
  } return target;
};

// TODO: Remove from `core-js@4`




var aTypedArray$5 = arrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod$5 = arrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.groupBy` method
// https://github.com/tc39/proposal-array-grouping
exportTypedArrayMethod$5('groupBy', function groupBy(callbackfn /* , thisArg */) {
  var thisArg = arguments.length > 1 ? arguments[1] : undefined;
  return arrayGroup(aTypedArray$5(this), callbackfn, thisArg, typedArraySpeciesConstructor);
}, true);

// https://tc39.es/proposal-change-array-by-copy/#sec-array.prototype.toReversed
// https://tc39.es/proposal-change-array-by-copy/#sec-%typedarray%.prototype.toReversed
var arrayToReversed = function (O, C) {
  var len = lengthOfArrayLike(O);
  var A = new C(len);
  var k = 0;
  for (; k < len; k++) A[k] = O[len - k - 1];
  return A;
};

var aTypedArray$6 = arrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod$6 = arrayBufferViewCore.exportTypedArrayMethod;
var getTypedArrayConstructor$2 = arrayBufferViewCore.getTypedArrayConstructor;

// `%TypedArray%.prototype.toReversed` method
// https://tc39.es/proposal-change-array-by-copy/#sec-%typedarray%.prototype.toReversed
exportTypedArrayMethod$6('toReversed', function toReversed() {
  return arrayToReversed(aTypedArray$6(this), getTypedArrayConstructor$2(this));
});

var aTypedArray$7 = arrayBufferViewCore.aTypedArray;
var getTypedArrayConstructor$3 = arrayBufferViewCore.getTypedArrayConstructor;
var exportTypedArrayMethod$7 = arrayBufferViewCore.exportTypedArrayMethod;
var sort = functionUncurryThis(arrayBufferViewCore.TypedArrayPrototype.sort);

// `%TypedArray%.prototype.toSorted` method
// https://tc39.es/proposal-change-array-by-copy/#sec-%typedarray%.prototype.toSorted
exportTypedArrayMethod$7('toSorted', function toSorted(compareFn) {
  if (compareFn !== undefined) aCallable(compareFn);
  var O = aTypedArray$7(this);
  var A = arrayFromConstructorAndList(getTypedArrayConstructor$3(O), O);
  return sort(A, compareFn);
});

var isBigIntArray = function (it) {
  var klass = classof(it);
  return klass == 'BigInt64Array' || klass == 'BigUint64Array';
};

var $TypeError$1 = TypeError;

// `ToBigInt` abstract operation
// https://tc39.es/ecma262/#sec-tobigint
var toBigInt = function (argument) {
  var prim = toPrimitive(argument, 'number');
  if (typeof prim == 'number') throw $TypeError$1("Can't convert number to bigint");
  // eslint-disable-next-line es/no-bigint -- safe
  return BigInt(prim);
};

// TODO: Remove from `core-js@4`








var aTypedArray$8 = arrayBufferViewCore.aTypedArray;
var getTypedArrayConstructor$4 = arrayBufferViewCore.getTypedArrayConstructor;
var exportTypedArrayMethod$8 = arrayBufferViewCore.exportTypedArrayMethod;
var max = Math.max;
var min = Math.min;

// some early implementations, like WebKit, does not follow the final semantic
var PROPER_ORDER = !fails(function () {
  // eslint-disable-next-line es/no-typed-arrays -- required for testing
  var array = new Int8Array([1]);

  var spliced = array.toSpliced(1, 0, {
    valueOf: function () {
      array[0] = 2;
      return 3;
    }
  });

  return spliced[0] !== 2 || spliced[1] !== 3;
});

// `%TypedArray%.prototype.toSpliced` method
// https://tc39.es/proposal-change-array-by-copy/#sec-%typedarray%.prototype.toSpliced
exportTypedArrayMethod$8('toSpliced', function toSpliced(start, deleteCount /* , ...items */) {
  var O = aTypedArray$8(this);
  var C = getTypedArrayConstructor$4(O);
  var len = lengthOfArrayLike(O);
  var actualStart = toAbsoluteIndex(start, len);
  var argumentsLength = arguments.length;
  var k = 0;
  var insertCount, actualDeleteCount, thisIsBigIntArray, convertedItems, value, newLen, A;
  if (argumentsLength === 0) {
    insertCount = actualDeleteCount = 0;
  } else if (argumentsLength === 1) {
    insertCount = 0;
    actualDeleteCount = len - actualStart;
  } else {
    actualDeleteCount = min(max(toIntegerOrInfinity(deleteCount), 0), len - actualStart);
    insertCount = argumentsLength - 2;
    if (insertCount) {
      convertedItems = new C(insertCount);
      thisIsBigIntArray = isBigIntArray(convertedItems);
      for (var i = 2; i < argumentsLength; i++) {
        value = arguments[i];
        // FF30- typed arrays doesn't properly convert objects to typed array values
        convertedItems[i - 2] = thisIsBigIntArray ? toBigInt(value) : +value;
      }
    }
  }
  newLen = len + insertCount - actualDeleteCount;
  A = new C(newLen);

  for (; k < actualStart; k++) A[k] = O[k];
  for (; k < actualStart + insertCount; k++) A[k] = convertedItems[k - actualStart];
  for (; k < newLen; k++) A[k] = O[k + actualDeleteCount - insertCount];

  return A;
}, !PROPER_ORDER);

// eslint-disable-next-line es/no-map -- safe
var MapPrototype = Map.prototype;

var mapHelpers = {
  // eslint-disable-next-line es/no-map -- safe
  Map: Map,
  set: functionUncurryThis(MapPrototype.set),
  get: functionUncurryThis(MapPrototype.get),
  has: functionUncurryThis(MapPrototype.has),
  remove: functionUncurryThis(MapPrototype['delete']),
  proto: MapPrototype
};

var iterateSimple = function (iterator, fn, $next) {
  var next = $next || iterator.next;
  var step, result;
  while (!(step = functionCall(next, iterator)).done) {
    result = fn(step.value);
    if (result !== undefined) return result;
  }
};

var Map$1 = mapHelpers.Map;
var MapPrototype$1 = mapHelpers.proto;
var forEach = functionUncurryThis(MapPrototype$1.forEach);
var entries = functionUncurryThis(MapPrototype$1.entries);
var next = entries(new Map$1()).next;

var mapIterate = function (map, fn, interruptible) {
  return interruptible ? iterateSimple(entries(map), function (entry) {
    return fn(entry[1], entry[0]);
  }, next) : forEach(map, fn);
};

var Map$2 = mapHelpers.Map;
var mapHas = mapHelpers.has;
var mapSet = mapHelpers.set;
var push$2 = functionUncurryThis([].push);

// `Array.prototype.uniqueBy` method
// https://github.com/tc39/proposal-array-unique
var arrayUniqueBy = function uniqueBy(resolver) {
  var that = toObject(this);
  var length = lengthOfArrayLike(that);
  var result = [];
  var map = new Map$2();
  var resolverFunction = !isNullOrUndefined(resolver) ? aCallable(resolver) : function (value) {
    return value;
  };
  var index, item, key;
  for (index = 0; index < length; index++) {
    item = that[index];
    key = resolverFunction(item);
    if (!mapHas(map, key)) mapSet(map, key, item);
  }
  mapIterate(map, function (value) {
    push$2(result, value);
  });
  return result;
};

var aTypedArray$9 = arrayBufferViewCore.aTypedArray;
var getTypedArrayConstructor$5 = arrayBufferViewCore.getTypedArrayConstructor;
var exportTypedArrayMethod$9 = arrayBufferViewCore.exportTypedArrayMethod;
var arrayUniqueBy$1 = functionUncurryThis(arrayUniqueBy);

// `%TypedArray%.prototype.uniqueBy` method
// https://github.com/tc39/proposal-array-unique
exportTypedArrayMethod$9('uniqueBy', function uniqueBy(resolver) {
  aTypedArray$9(this);
  return arrayFromConstructorAndList(getTypedArrayConstructor$5(this), arrayUniqueBy$1(this, resolver));
}, true);

var $RangeError = RangeError;

// https://tc39.es/proposal-change-array-by-copy/#sec-array.prototype.with
// https://tc39.es/proposal-change-array-by-copy/#sec-%typedarray%.prototype.with
var arrayWith = function (O, C, index, value) {
  var len = lengthOfArrayLike(O);
  var relativeIndex = toIntegerOrInfinity(index);
  var actualIndex = relativeIndex < 0 ? len + relativeIndex : relativeIndex;
  if (actualIndex >= len || actualIndex < 0) throw $RangeError('Incorrect index');
  var A = new C(len);
  var k = 0;
  for (; k < len; k++) A[k] = k === actualIndex ? value : O[k];
  return A;
};

var aTypedArray$a = arrayBufferViewCore.aTypedArray;
var getTypedArrayConstructor$6 = arrayBufferViewCore.getTypedArrayConstructor;
var exportTypedArrayMethod$a = arrayBufferViewCore.exportTypedArrayMethod;

var PROPER_ORDER$1 = !!function () {
  try {
    // eslint-disable-next-line no-throw-literal, es/no-typed-arrays, es/no-array-prototype-with -- required for testing
    new Int8Array(1)['with'](2, { valueOf: function () { throw 8; } });
  } catch (error) {
    // some early implementations, like WebKit, does not follow the final semantic
    // https://github.com/tc39/proposal-change-array-by-copy/pull/86
    return error === 8;
  }
}();

// `%TypedArray%.prototype.with` method
// https://tc39.es/proposal-change-array-by-copy/#sec-%typedarray%.prototype.with
exportTypedArrayMethod$a('with', { 'with': function (index, value) {
  var O = aTypedArray$a(this);
  var relativeIndex = toIntegerOrInfinity(index);
  var actualValue = isBigIntArray(O) ? toBigInt(value) : +value;
  return arrayWith(O, getTypedArrayConstructor$6(O), relativeIndex, actualValue);
} }['with'], !PROPER_ORDER$1);

/* ES Module Shims 1.7.1 */
(function () {
  const hasWindow = typeof window !== 'undefined';
  const hasDocument = typeof document !== 'undefined';
  const noop = () => {};
  const optionsScript = hasDocument ? document.querySelector('script[type=esms-options]') : undefined;
  const esmsInitOptions = optionsScript ? JSON.parse(optionsScript.innerHTML) : {};
  Object.assign(esmsInitOptions, self.esmsInitOptions || {});
  let shimMode = hasDocument ? !!esmsInitOptions.shimMode : true;
  const importHook = globalHook(shimMode && esmsInitOptions.onimport);
  const resolveHook = globalHook(shimMode && esmsInitOptions.resolve);
  let fetchHook = esmsInitOptions.fetch ? globalHook(esmsInitOptions.fetch) : fetch;
  const metaHook = esmsInitOptions.meta ? globalHook(shimMode && esmsInitOptions.meta) : noop;
  const mapOverrides = esmsInitOptions.mapOverrides;
  let nonce = esmsInitOptions.nonce;
  if (!nonce && hasDocument) {
    const nonceElement = document.querySelector('script[nonce]');
    if (nonceElement) nonce = nonceElement.nonce || nonceElement.getAttribute('nonce');
  }
  const onerror = globalHook(esmsInitOptions.onerror || noop);
  const onpolyfill = esmsInitOptions.onpolyfill ? globalHook(esmsInitOptions.onpolyfill) : () => {
    console.log('%c^^ Module TypeError above is polyfilled and can be ignored ^^', 'font-weight:900;color:#391');
  };
  const {
    revokeBlobURLs,
    noLoadEventRetriggers,
    enforceIntegrity
  } = esmsInitOptions;
  function globalHook(name) {
    return typeof name === 'string' ? self[name] : name;
  }
  const enable = Array.isArray(esmsInitOptions.polyfillEnable) ? esmsInitOptions.polyfillEnable : [];
  const cssModulesEnabled = enable.includes('css-modules');
  const jsonModulesEnabled = enable.includes('json-modules');
  const edge = !navigator.userAgentData && !!navigator.userAgent.match(/Edge\/\d+\.\d+/);
  const baseUrl = hasDocument ? document.baseURI : `${location.protocol}//${location.host}${location.pathname.includes('/') ? location.pathname.slice(0, location.pathname.lastIndexOf('/') + 1) : location.pathname}`;
  const createBlob = (source, type = 'text/javascript') => URL.createObjectURL(new Blob([source], {
    type
  }));
  let {
    skip
  } = esmsInitOptions;
  if (Array.isArray(skip)) {
    const l = skip.map(s => new URL(s, baseUrl).href);
    skip = s => l.some(i => i[i.length - 1] === '/' && s.startsWith(i) || s === i);
  } else if (typeof skip === 'string') {
    const r = new RegExp(skip);
    skip = s => r.test(s);
  }
  const eoop = err => setTimeout(() => {
    throw err;
  });
  const throwError = err => {
    (self.reportError || hasWindow && window.safari && console.error || eoop)(err), void onerror(err);
  };
  function fromParent(parent) {
    return parent ? ` imported from ${parent}` : '';
  }
  let importMapSrcOrLazy = false;
  function setImportMapSrcOrLazy() {
    importMapSrcOrLazy = true;
  }

  // shim mode is determined on initialization, no late shim mode
  if (!shimMode) {
    if (document.querySelectorAll('script[type=module-shim],script[type=importmap-shim],link[rel=modulepreload-shim]').length) {
      shimMode = true;
    } else {
      let seenScript = false;
      for (const script of document.querySelectorAll('script[type=module],script[type=importmap]')) {
        if (!seenScript) {
          if (script.type === 'module' && !script.ep) seenScript = true;
        } else if (script.type === 'importmap' && seenScript) {
          importMapSrcOrLazy = true;
          break;
        }
      }
    }
  }
  const backslashRegEx = /\\/g;
  function isURL(url) {
    if (url.indexOf(':') === -1) return false;
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  }
  function resolveUrl(relUrl, parentUrl) {
    return resolveIfNotPlainOrUrl(relUrl, parentUrl) || (isURL(relUrl) ? relUrl : resolveIfNotPlainOrUrl('./' + relUrl, parentUrl));
  }
  function resolveIfNotPlainOrUrl(relUrl, parentUrl) {
    const hIdx = parentUrl.indexOf('#'),
      qIdx = parentUrl.indexOf('?');
    if (hIdx + qIdx > -2) parentUrl = parentUrl.slice(0, hIdx === -1 ? qIdx : qIdx === -1 || qIdx > hIdx ? hIdx : qIdx);
    if (relUrl.indexOf('\\') !== -1) relUrl = relUrl.replace(backslashRegEx, '/');
    // protocol-relative
    if (relUrl[0] === '/' && relUrl[1] === '/') {
      return parentUrl.slice(0, parentUrl.indexOf(':') + 1) + relUrl;
    }
    // relative-url
    else if (relUrl[0] === '.' && (relUrl[1] === '/' || relUrl[1] === '.' && (relUrl[2] === '/' || relUrl.length === 2 && (relUrl += '/')) || relUrl.length === 1 && (relUrl += '/')) || relUrl[0] === '/') {
      const parentProtocol = parentUrl.slice(0, parentUrl.indexOf(':') + 1);
      // Disabled, but these cases will give inconsistent results for deep backtracking
      //if (parentUrl[parentProtocol.length] !== '/')
      //  throw new Error('Cannot resolve');
      // read pathname from parent URL
      // pathname taken to be part after leading "/"
      let pathname;
      if (parentUrl[parentProtocol.length + 1] === '/') {
        // resolving to a :// so we need to read out the auth and host
        if (parentProtocol !== 'file:') {
          pathname = parentUrl.slice(parentProtocol.length + 2);
          pathname = pathname.slice(pathname.indexOf('/') + 1);
        } else {
          pathname = parentUrl.slice(8);
        }
      } else {
        // resolving to :/ so pathname is the /... part
        pathname = parentUrl.slice(parentProtocol.length + (parentUrl[parentProtocol.length] === '/'));
      }
      if (relUrl[0] === '/') return parentUrl.slice(0, parentUrl.length - pathname.length - 1) + relUrl;

      // join together and split for removal of .. and . segments
      // looping the string instead of anything fancy for perf reasons
      // '../../../../../z' resolved to 'x/y' is just 'z'
      const segmented = pathname.slice(0, pathname.lastIndexOf('/') + 1) + relUrl;
      const output = [];
      let segmentIndex = -1;
      for (let i = 0; i < segmented.length; i++) {
        // busy reading a segment - only terminate on '/'
        if (segmentIndex !== -1) {
          if (segmented[i] === '/') {
            output.push(segmented.slice(segmentIndex, i + 1));
            segmentIndex = -1;
          }
          continue;
        }
        // new segment - check if it is relative
        else if (segmented[i] === '.') {
          // ../ segment
          if (segmented[i + 1] === '.' && (segmented[i + 2] === '/' || i + 2 === segmented.length)) {
            output.pop();
            i += 2;
            continue;
          }
          // ./ segment
          else if (segmented[i + 1] === '/' || i + 1 === segmented.length) {
            i += 1;
            continue;
          }
        }
        // it is the start of a new segment
        while (segmented[i] === '/') i++;
        segmentIndex = i;
      }
      // finish reading out the last segment
      if (segmentIndex !== -1) output.push(segmented.slice(segmentIndex));
      return parentUrl.slice(0, parentUrl.length - pathname.length) + output.join('');
    }
  }
  function resolveAndComposeImportMap(json, baseUrl, parentMap) {
    const outMap = {
      imports: Object.assign({}, parentMap.imports),
      scopes: Object.assign({}, parentMap.scopes)
    };
    if (json.imports) resolveAndComposePackages(json.imports, outMap.imports, baseUrl, parentMap);
    if (json.scopes) for (let s in json.scopes) {
      const resolvedScope = resolveUrl(s, baseUrl);
      resolveAndComposePackages(json.scopes[s], outMap.scopes[resolvedScope] || (outMap.scopes[resolvedScope] = {}), baseUrl, parentMap);
    }
    return outMap;
  }
  function getMatch(path, matchObj) {
    if (matchObj[path]) return path;
    let sepIndex = path.length;
    do {
      const segment = path.slice(0, sepIndex + 1);
      if (segment in matchObj) return segment;
    } while ((sepIndex = path.lastIndexOf('/', sepIndex - 1)) !== -1);
  }
  function applyPackages(id, packages) {
    const pkgName = getMatch(id, packages);
    if (pkgName) {
      const pkg = packages[pkgName];
      if (pkg === null) return;
      return pkg + id.slice(pkgName.length);
    }
  }
  function resolveImportMap(importMap, resolvedOrPlain, parentUrl) {
    let scopeUrl = parentUrl && getMatch(parentUrl, importMap.scopes);
    while (scopeUrl) {
      const packageResolution = applyPackages(resolvedOrPlain, importMap.scopes[scopeUrl]);
      if (packageResolution) return packageResolution;
      scopeUrl = getMatch(scopeUrl.slice(0, scopeUrl.lastIndexOf('/')), importMap.scopes);
    }
    return applyPackages(resolvedOrPlain, importMap.imports) || resolvedOrPlain.indexOf(':') !== -1 && resolvedOrPlain;
  }
  function resolveAndComposePackages(packages, outPackages, baseUrl, parentMap) {
    for (let p in packages) {
      const resolvedLhs = resolveIfNotPlainOrUrl(p, baseUrl) || p;
      if ((!shimMode || !mapOverrides) && outPackages[resolvedLhs] && outPackages[resolvedLhs] !== packages[resolvedLhs]) {
        throw Error(`Rejected map override "${resolvedLhs}" from ${outPackages[resolvedLhs]} to ${packages[resolvedLhs]}.`);
      }
      let target = packages[p];
      if (typeof target !== 'string') continue;
      const mapped = resolveImportMap(parentMap, resolveIfNotPlainOrUrl(target, baseUrl) || target, baseUrl);
      if (mapped) {
        outPackages[resolvedLhs] = mapped;
        continue;
      }
      console.warn(`Mapping "${p}" -> "${packages[p]}" does not resolve`);
    }
  }
  let dynamicImport = !hasDocument && (0, eval)('u=>import(u)');
  let supportsDynamicImport;
  const dynamicImportCheck = hasDocument && new Promise(resolve => {
    const s = Object.assign(document.createElement('script'), {
      src: createBlob('self._d=u=>import(u)'),
      ep: true
    });
    s.setAttribute('nonce', nonce);
    s.addEventListener('load', () => {
      if (!(supportsDynamicImport = !!(dynamicImport = self._d))) {
        let err;
        window.addEventListener('error', _err => err = _err);
        dynamicImport = (url, opts) => new Promise((resolve, reject) => {
          const s = Object.assign(document.createElement('script'), {
            type: 'module',
            src: createBlob(`import*as m from'${url}';self._esmsi=m`)
          });
          err = undefined;
          s.ep = true;
          if (nonce) s.setAttribute('nonce', nonce);
          // Safari is unique in supporting module script error events
          s.addEventListener('error', cb);
          s.addEventListener('load', cb);
          function cb(_err) {
            document.head.removeChild(s);
            if (self._esmsi) {
              resolve(self._esmsi, baseUrl);
              self._esmsi = undefined;
            } else {
              reject(!(_err instanceof Event) && _err || err && err.error || new Error(`Error loading ${opts && opts.errUrl || url} (${s.src}).`));
              err = undefined;
            }
          }
          document.head.appendChild(s);
        });
      }
      document.head.removeChild(s);
      delete self._d;
      resolve();
    });
    document.head.appendChild(s);
  });

  // support browsers without dynamic import support (eg Firefox 6x)
  let supportsJsonAssertions = false;
  let supportsCssAssertions = false;
  const supports = hasDocument && HTMLScriptElement.supports;
  let supportsImportMaps = supports && supports.name === 'supports' && supports('importmap');
  let supportsImportMeta = supportsDynamicImport;
  const importMetaCheck = 'import.meta';
  const cssModulesCheck = `import"x"assert{type:"css"}`;
  const jsonModulesCheck = `import"x"assert{type:"json"}`;
  let featureDetectionPromise = Promise.resolve(dynamicImportCheck).then(() => {
    if (!supportsDynamicImport) return;
    if (!hasDocument) return Promise.all([supportsImportMaps || dynamicImport(createBlob(importMetaCheck)).then(() => supportsImportMeta = true, noop), cssModulesEnabled && dynamicImport(createBlob(cssModulesCheck.replace('x', createBlob('', 'text/css')))).then(() => supportsCssAssertions = true, noop), jsonModulesEnabled && dynamicImport(createBlob(jsonModulescheck.replace('x', createBlob('{}', 'text/json')))).then(() => supportsJsonAssertions = true, noop)]);
    return new Promise(resolve => {
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.setAttribute('nonce', nonce);
      function cb({
        data
      }) {
        // failed feature detection (security policy) -> revert to default assumptions
        if (Array.isArray(data)) {
          supportsImportMaps = data[0];
          supportsImportMeta = data[1];
          supportsCssAssertions = data[2];
          supportsJsonAssertions = data[3];
        }
        resolve();
        document.head.removeChild(iframe);
        window.removeEventListener('message', cb, false);
      }
      window.addEventListener('message', cb, false);
      const importMapTest = `<script nonce=${nonce || ''}>b=(s,type='text/javascript')=>URL.createObjectURL(new Blob([s],{type}));document.head.appendChild(Object.assign(document.createElement('script'),{type:'importmap',nonce:"${nonce}",innerText:\`{"imports":{"x":"\${b('')}"}}\`}));Promise.all([${supportsImportMaps ? 'true,true' : `'x',b('${importMetaCheck}')`}, ${cssModulesEnabled ? `b('${cssModulesCheck}'.replace('x',b('','text/css')))` : 'false'}, ${jsonModulesEnabled ? `b('${jsonModulesCheck}'.replace('x',b('{}','text/json')))` : 'false'}].map(x =>typeof x==='string'?import(x).then(x =>!!x,()=>false):x)).then(a=>parent.postMessage(a,'*'))<${''}/script>`;

      // Safari will call onload eagerly on head injection, but we don't want the Wechat
      // path to trigger before setting srcdoc, therefore we track the timing
      let readyForOnload = false,
        onloadCalledWhileNotReady = false;
      function doOnload() {
        if (!readyForOnload) {
          onloadCalledWhileNotReady = true;
          return;
        }
        // WeChat browser doesn't support setting srcdoc scripts
        // But iframe sandboxes don't support contentDocument so we do this as a fallback
        const doc = iframe.contentDocument;
        if (doc && doc.head.childNodes.length === 0) {
          const s = doc.createElement('script');
          if (nonce) s.setAttribute('nonce', nonce);
          s.innerHTML = importMapTest.slice(15 + (nonce ? nonce.length : 0), -9);
          doc.head.appendChild(s);
        }
      }
      iframe.onload = doOnload;
      // WeChat browser requires append before setting srcdoc
      document.head.appendChild(iframe);

      // setting srcdoc is not supported in React native webviews on iOS
      // setting src to a blob URL results in a navigation event in webviews
      // document.write gives usability warnings
      readyForOnload = true;
      if ('srcdoc' in iframe) iframe.srcdoc = importMapTest;else iframe.contentDocument.write(importMapTest);
      // retrigger onload for Safari only if necessary
      if (onloadCalledWhileNotReady) doOnload();
    });
  });

  /* es-module-lexer 1.2.1 */
  let e,
    a,
    r,
    i = 2 << 19;
  const s = 1 === new Uint8Array(new Uint16Array([1]).buffer)[0] ? function (e, a) {
      const r = e.length;
      let i = 0;
      for (; i < r;) a[i] = e.charCodeAt(i++);
    } : function (e, a) {
      const r = e.length;
      let i = 0;
      for (; i < r;) {
        const r = e.charCodeAt(i);
        a[i++] = (255 & r) << 8 | r >>> 8;
      }
    },
    t = "xportmportlassetaromsyncunctionssertvoyiedelecontininstantybreareturdebuggeawaithrwhileforifcatcfinallels";
  let c$1, f, n;
  function parse(l, k = "@") {
    c$1 = l, f = k;
    const u = 2 * c$1.length + (2 << 18);
    if (u > i || !e) {
      for (; u > i;) i *= 2;
      a = new ArrayBuffer(i), s(t, new Uint16Array(a, 16, 105)), e = function (e, a, r) {
        "use asm";

        var i = new e.Int8Array(r),
          s = new e.Int16Array(r),
          t = new e.Int32Array(r),
          c = new e.Uint8Array(r),
          f = new e.Uint16Array(r),
          n = 1024;
        function b() {
          var e = 0,
            a = 0,
            r = 0,
            c = 0,
            b = 0,
            u = 0,
            w = 0;
          w = n;
          n = n + 10240 | 0;
          i[795] = 1;
          s[395] = 0;
          s[396] = 0;
          t[67] = t[2];
          i[796] = 0;
          t[66] = 0;
          i[794] = 0;
          t[68] = w + 2048;
          t[69] = w;
          i[797] = 0;
          e = (t[3] | 0) + -2 | 0;
          t[70] = e;
          a = e + (t[64] << 1) | 0;
          t[71] = a;
          e: while (1) {
            r = e + 2 | 0;
            t[70] = r;
            if (e >>> 0 >= a >>> 0) {
              b = 18;
              break;
            }
            a: do {
              switch (s[r >> 1] | 0) {
                case 9:
                case 10:
                case 11:
                case 12:
                case 13:
                case 32:
                  break;
                case 101:
                  {
                    if ((((s[396] | 0) == 0 ? H(r) | 0 : 0) ? (m(e + 4 | 0, 16, 10) | 0) == 0 : 0) ? (l(), (i[795] | 0) == 0) : 0) {
                      b = 9;
                      break e;
                    } else b = 17;
                    break;
                  }
                case 105:
                  {
                    if (H(r) | 0 ? (m(e + 4 | 0, 26, 10) | 0) == 0 : 0) {
                      k();
                      b = 17;
                    } else b = 17;
                    break;
                  }
                case 59:
                  {
                    b = 17;
                    break;
                  }
                case 47:
                  switch (s[e + 4 >> 1] | 0) {
                    case 47:
                      {
                        P();
                        break a;
                      }
                    case 42:
                      {
                        y(1);
                        break a;
                      }
                    default:
                      {
                        b = 16;
                        break e;
                      }
                  }
                default:
                  {
                    b = 16;
                    break e;
                  }
              }
            } while (0);
            if ((b | 0) == 17) {
              b = 0;
              t[67] = t[70];
            }
            e = t[70] | 0;
            a = t[71] | 0;
          }
          if ((b | 0) == 9) {
            e = t[70] | 0;
            t[67] = e;
            b = 19;
          } else if ((b | 0) == 16) {
            i[795] = 0;
            t[70] = e;
            b = 19;
          } else if ((b | 0) == 18) if (!(i[794] | 0)) {
            e = r;
            b = 19;
          } else e = 0;
          do {
            if ((b | 0) == 19) {
              e: while (1) {
                a = e + 2 | 0;
                t[70] = a;
                c = a;
                if (e >>> 0 >= (t[71] | 0) >>> 0) {
                  b = 82;
                  break;
                }
                a: do {
                  switch (s[a >> 1] | 0) {
                    case 9:
                    case 10:
                    case 11:
                    case 12:
                    case 13:
                    case 32:
                      break;
                    case 101:
                      {
                        if (((s[396] | 0) == 0 ? H(a) | 0 : 0) ? (m(e + 4 | 0, 16, 10) | 0) == 0 : 0) {
                          l();
                          b = 81;
                        } else b = 81;
                        break;
                      }
                    case 105:
                      {
                        if (H(a) | 0 ? (m(e + 4 | 0, 26, 10) | 0) == 0 : 0) {
                          k();
                          b = 81;
                        } else b = 81;
                        break;
                      }
                    case 99:
                      {
                        if ((H(a) | 0 ? (m(e + 4 | 0, 36, 8) | 0) == 0 : 0) ? V(s[e + 12 >> 1] | 0) | 0 : 0) {
                          i[797] = 1;
                          b = 81;
                        } else b = 81;
                        break;
                      }
                    case 40:
                      {
                        c = t[68] | 0;
                        a = s[396] | 0;
                        b = a & 65535;
                        t[c + (b << 3) >> 2] = 1;
                        r = t[67] | 0;
                        s[396] = a + 1 << 16 >> 16;
                        t[c + (b << 3) + 4 >> 2] = r;
                        b = 81;
                        break;
                      }
                    case 41:
                      {
                        a = s[396] | 0;
                        if (!(a << 16 >> 16)) {
                          b = 36;
                          break e;
                        }
                        a = a + -1 << 16 >> 16;
                        s[396] = a;
                        r = s[395] | 0;
                        if (r << 16 >> 16 != 0 ? (u = t[(t[69] | 0) + ((r & 65535) + -1 << 2) >> 2] | 0, (t[u + 20 >> 2] | 0) == (t[(t[68] | 0) + ((a & 65535) << 3) + 4 >> 2] | 0)) : 0) {
                          a = u + 4 | 0;
                          if (!(t[a >> 2] | 0)) t[a >> 2] = c;
                          t[u + 12 >> 2] = e + 4;
                          s[395] = r + -1 << 16 >> 16;
                          b = 81;
                        } else b = 81;
                        break;
                      }
                    case 123:
                      {
                        b = t[67] | 0;
                        c = t[61] | 0;
                        e = b;
                        do {
                          if ((s[b >> 1] | 0) == 41 & (c | 0) != 0 ? (t[c + 4 >> 2] | 0) == (b | 0) : 0) {
                            a = t[62] | 0;
                            t[61] = a;
                            if (!a) {
                              t[57] = 0;
                              break;
                            } else {
                              t[a + 28 >> 2] = 0;
                              break;
                            }
                          }
                        } while (0);
                        c = t[68] | 0;
                        r = s[396] | 0;
                        b = r & 65535;
                        t[c + (b << 3) >> 2] = (i[797] | 0) == 0 ? 2 : 6;
                        s[396] = r + 1 << 16 >> 16;
                        t[c + (b << 3) + 4 >> 2] = e;
                        i[797] = 0;
                        b = 81;
                        break;
                      }
                    case 125:
                      {
                        e = s[396] | 0;
                        if (!(e << 16 >> 16)) {
                          b = 49;
                          break e;
                        }
                        c = t[68] | 0;
                        b = e + -1 << 16 >> 16;
                        s[396] = b;
                        if ((t[c + ((b & 65535) << 3) >> 2] | 0) == 4) {
                          h();
                          b = 81;
                        } else b = 81;
                        break;
                      }
                    case 39:
                      {
                        d(39);
                        b = 81;
                        break;
                      }
                    case 34:
                      {
                        d(34);
                        b = 81;
                        break;
                      }
                    case 47:
                      switch (s[e + 4 >> 1] | 0) {
                        case 47:
                          {
                            P();
                            break a;
                          }
                        case 42:
                          {
                            y(1);
                            break a;
                          }
                        default:
                          {
                            e = t[67] | 0;
                            c = s[e >> 1] | 0;
                            r: do {
                              if (!(U(c) | 0)) {
                                switch (c << 16 >> 16) {
                                  case 41:
                                    if (D(t[(t[68] | 0) + (f[396] << 3) + 4 >> 2] | 0) | 0) {
                                      b = 69;
                                      break r;
                                    } else {
                                      b = 66;
                                      break r;
                                    }
                                  case 125:
                                    break;
                                  default:
                                    {
                                      b = 66;
                                      break r;
                                    }
                                }
                                a = t[68] | 0;
                                r = f[396] | 0;
                                if (!(p(t[a + (r << 3) + 4 >> 2] | 0) | 0) ? (t[a + (r << 3) >> 2] | 0) != 6 : 0) b = 66;else b = 69;
                              } else switch (c << 16 >> 16) {
                                case 46:
                                  if (((s[e + -2 >> 1] | 0) + -48 & 65535) < 10) {
                                    b = 66;
                                    break r;
                                  } else {
                                    b = 69;
                                    break r;
                                  }
                                case 43:
                                  if ((s[e + -2 >> 1] | 0) == 43) {
                                    b = 66;
                                    break r;
                                  } else {
                                    b = 69;
                                    break r;
                                  }
                                case 45:
                                  if ((s[e + -2 >> 1] | 0) == 45) {
                                    b = 66;
                                    break r;
                                  } else {
                                    b = 69;
                                    break r;
                                  }
                                default:
                                  {
                                    b = 69;
                                    break r;
                                  }
                              }
                            } while (0);
                            r: do {
                              if ((b | 0) == 66) {
                                b = 0;
                                if (!(o(e) | 0)) {
                                  switch (c << 16 >> 16) {
                                    case 0:
                                      {
                                        b = 69;
                                        break r;
                                      }
                                    case 47:
                                      {
                                        if (i[796] | 0) {
                                          b = 69;
                                          break r;
                                        }
                                        break;
                                      }
                                    default:
                                      {}
                                  }
                                  r = t[3] | 0;
                                  a = c;
                                  do {
                                    if (e >>> 0 <= r >>> 0) break;
                                    e = e + -2 | 0;
                                    t[67] = e;
                                    a = s[e >> 1] | 0;
                                  } while (!(E(a) | 0));
                                  if (F(a) | 0) {
                                    do {
                                      if (e >>> 0 <= r >>> 0) break;
                                      e = e + -2 | 0;
                                      t[67] = e;
                                    } while (F(s[e >> 1] | 0) | 0);
                                    if (j(e) | 0) {
                                      g();
                                      i[796] = 0;
                                      b = 81;
                                      break a;
                                    } else e = 1;
                                  } else e = 1;
                                } else b = 69;
                              }
                            } while (0);
                            if ((b | 0) == 69) {
                              g();
                              e = 0;
                            }
                            i[796] = e;
                            b = 81;
                            break a;
                          }
                      }
                    case 96:
                      {
                        c = t[68] | 0;
                        r = s[396] | 0;
                        b = r & 65535;
                        t[c + (b << 3) + 4 >> 2] = t[67];
                        s[396] = r + 1 << 16 >> 16;
                        t[c + (b << 3) >> 2] = 3;
                        h();
                        b = 81;
                        break;
                      }
                    default:
                      b = 81;
                  }
                } while (0);
                if ((b | 0) == 81) {
                  b = 0;
                  t[67] = t[70];
                }
                e = t[70] | 0;
              }
              if ((b | 0) == 36) {
                T();
                e = 0;
                break;
              } else if ((b | 0) == 49) {
                T();
                e = 0;
                break;
              } else if ((b | 0) == 82) {
                e = (i[794] | 0) == 0 ? (s[395] | s[396]) << 16 >> 16 == 0 : 0;
                break;
              }
            }
          } while (0);
          n = w;
          return e | 0;
        }
        function l() {
          var e = 0,
            a = 0,
            r = 0,
            c = 0,
            f = 0,
            n = 0,
            b = 0,
            l = 0,
            k = 0,
            o = 0,
            h = 0,
            A = 0,
            C = 0,
            g = 0;
          l = t[70] | 0;
          k = t[63] | 0;
          g = l + 12 | 0;
          t[70] = g;
          r = w(1) | 0;
          e = t[70] | 0;
          if (!((e | 0) == (g | 0) ? !(I(r) | 0) : 0)) C = 3;
          e: do {
            if ((C | 0) == 3) {
              a: do {
                switch (r << 16 >> 16) {
                  case 123:
                    {
                      t[70] = e + 2;
                      e = w(1) | 0;
                      r = t[70] | 0;
                      while (1) {
                        if (W(e) | 0) {
                          d(e);
                          e = (t[70] | 0) + 2 | 0;
                          t[70] = e;
                        } else {
                          q(e) | 0;
                          e = t[70] | 0;
                        }
                        w(1) | 0;
                        e = v(r, e) | 0;
                        if (e << 16 >> 16 == 44) {
                          t[70] = (t[70] | 0) + 2;
                          e = w(1) | 0;
                        }
                        a = r;
                        r = t[70] | 0;
                        if (e << 16 >> 16 == 125) {
                          C = 15;
                          break;
                        }
                        if ((r | 0) == (a | 0)) {
                          C = 12;
                          break;
                        }
                        if (r >>> 0 > (t[71] | 0) >>> 0) {
                          C = 14;
                          break;
                        }
                      }
                      if ((C | 0) == 12) {
                        T();
                        break e;
                      } else if ((C | 0) == 14) {
                        T();
                        break e;
                      } else if ((C | 0) == 15) {
                        t[70] = r + 2;
                        break a;
                      }
                      break;
                    }
                  case 42:
                    {
                      t[70] = e + 2;
                      w(1) | 0;
                      g = t[70] | 0;
                      v(g, g) | 0;
                      break;
                    }
                  default:
                    {
                      i[795] = 0;
                      switch (r << 16 >> 16) {
                        case 100:
                          {
                            l = e + 14 | 0;
                            t[70] = l;
                            switch ((w(1) | 0) << 16 >> 16) {
                              case 97:
                                {
                                  a = t[70] | 0;
                                  if ((m(a + 2 | 0, 56, 8) | 0) == 0 ? (f = a + 10 | 0, F(s[f >> 1] | 0) | 0) : 0) {
                                    t[70] = f;
                                    w(0) | 0;
                                    C = 22;
                                  }
                                  break;
                                }
                              case 102:
                                {
                                  C = 22;
                                  break;
                                }
                              case 99:
                                {
                                  a = t[70] | 0;
                                  if (((m(a + 2 | 0, 36, 8) | 0) == 0 ? (c = a + 10 | 0, g = s[c >> 1] | 0, V(g) | 0 | g << 16 >> 16 == 123) : 0) ? (t[70] = c, n = w(1) | 0, n << 16 >> 16 != 123) : 0) {
                                    A = n;
                                    C = 31;
                                  }
                                  break;
                                }
                              default:
                                {}
                            }
                            r: do {
                              if ((C | 0) == 22 ? (b = t[70] | 0, (m(b + 2 | 0, 64, 14) | 0) == 0) : 0) {
                                r = b + 16 | 0;
                                a = s[r >> 1] | 0;
                                if (!(V(a) | 0)) switch (a << 16 >> 16) {
                                  case 40:
                                  case 42:
                                    break;
                                  default:
                                    break r;
                                }
                                t[70] = r;
                                a = w(1) | 0;
                                if (a << 16 >> 16 == 42) {
                                  t[70] = (t[70] | 0) + 2;
                                  a = w(1) | 0;
                                }
                                if (a << 16 >> 16 != 40) {
                                  A = a;
                                  C = 31;
                                }
                              }
                            } while (0);
                            if ((C | 0) == 31 ? (o = t[70] | 0, q(A) | 0, h = t[70] | 0, h >>> 0 > o >>> 0) : 0) {
                              $(e, l, o, h);
                              t[70] = (t[70] | 0) + -2;
                              break e;
                            }
                            $(e, l, 0, 0);
                            t[70] = e + 12;
                            break e;
                          }
                        case 97:
                          {
                            t[70] = e + 10;
                            w(0) | 0;
                            e = t[70] | 0;
                            C = 35;
                            break;
                          }
                        case 102:
                          {
                            C = 35;
                            break;
                          }
                        case 99:
                          {
                            if ((m(e + 2 | 0, 36, 8) | 0) == 0 ? (a = e + 10 | 0, E(s[a >> 1] | 0) | 0) : 0) {
                              t[70] = a;
                              g = w(1) | 0;
                              C = t[70] | 0;
                              q(g) | 0;
                              g = t[70] | 0;
                              $(C, g, C, g);
                              t[70] = (t[70] | 0) + -2;
                              break e;
                            }
                            e = e + 4 | 0;
                            t[70] = e;
                            break;
                          }
                        case 108:
                        case 118:
                          break;
                        default:
                          break e;
                      }
                      if ((C | 0) == 35) {
                        t[70] = e + 16;
                        e = w(1) | 0;
                        if (e << 16 >> 16 == 42) {
                          t[70] = (t[70] | 0) + 2;
                          e = w(1) | 0;
                        }
                        C = t[70] | 0;
                        q(e) | 0;
                        g = t[70] | 0;
                        $(C, g, C, g);
                        t[70] = (t[70] | 0) + -2;
                        break e;
                      }
                      e = e + 4 | 0;
                      t[70] = e;
                      i[795] = 0;
                      r: while (1) {
                        t[70] = e + 2;
                        g = w(1) | 0;
                        e = t[70] | 0;
                        switch ((q(g) | 0) << 16 >> 16) {
                          case 91:
                          case 123:
                            break r;
                          default:
                            {}
                        }
                        a = t[70] | 0;
                        if ((a | 0) == (e | 0)) break e;
                        $(e, a, e, a);
                        if ((w(1) | 0) << 16 >> 16 != 44) break;
                        e = t[70] | 0;
                      }
                      t[70] = (t[70] | 0) + -2;
                      break e;
                    }
                }
              } while (0);
              g = (w(1) | 0) << 16 >> 16 == 102;
              e = t[70] | 0;
              if (g ? (m(e + 2 | 0, 50, 6) | 0) == 0 : 0) {
                t[70] = e + 8;
                u(l, w(1) | 0);
                e = (k | 0) == 0 ? 232 : k + 16 | 0;
                while (1) {
                  e = t[e >> 2] | 0;
                  if (!e) break e;
                  t[e + 12 >> 2] = 0;
                  t[e + 8 >> 2] = 0;
                  e = e + 16 | 0;
                }
              }
              t[70] = e + -2;
            }
          } while (0);
          return;
        }
        function k() {
          var e = 0,
            a = 0,
            r = 0,
            c = 0,
            f = 0,
            n = 0;
          f = t[70] | 0;
          e = f + 12 | 0;
          t[70] = e;
          e: do {
            switch ((w(1) | 0) << 16 >> 16) {
              case 40:
                {
                  a = t[68] | 0;
                  n = s[396] | 0;
                  r = n & 65535;
                  t[a + (r << 3) >> 2] = 5;
                  e = t[70] | 0;
                  s[396] = n + 1 << 16 >> 16;
                  t[a + (r << 3) + 4 >> 2] = e;
                  if ((s[t[67] >> 1] | 0) != 46) {
                    t[70] = e + 2;
                    n = w(1) | 0;
                    A(f, t[70] | 0, 0, e);
                    a = t[61] | 0;
                    r = t[69] | 0;
                    f = s[395] | 0;
                    s[395] = f + 1 << 16 >> 16;
                    t[r + ((f & 65535) << 2) >> 2] = a;
                    switch (n << 16 >> 16) {
                      case 39:
                        {
                          d(39);
                          break;
                        }
                      case 34:
                        {
                          d(34);
                          break;
                        }
                      default:
                        {
                          t[70] = (t[70] | 0) + -2;
                          break e;
                        }
                    }
                    e = (t[70] | 0) + 2 | 0;
                    t[70] = e;
                    switch ((w(1) | 0) << 16 >> 16) {
                      case 44:
                        {
                          t[70] = (t[70] | 0) + 2;
                          w(1) | 0;
                          f = t[61] | 0;
                          t[f + 4 >> 2] = e;
                          n = t[70] | 0;
                          t[f + 16 >> 2] = n;
                          i[f + 24 >> 0] = 1;
                          t[70] = n + -2;
                          break e;
                        }
                      case 41:
                        {
                          s[396] = (s[396] | 0) + -1 << 16 >> 16;
                          n = t[61] | 0;
                          t[n + 4 >> 2] = e;
                          t[n + 12 >> 2] = (t[70] | 0) + 2;
                          i[n + 24 >> 0] = 1;
                          s[395] = (s[395] | 0) + -1 << 16 >> 16;
                          break e;
                        }
                      default:
                        {
                          t[70] = (t[70] | 0) + -2;
                          break e;
                        }
                    }
                  }
                  break;
                }
              case 46:
                {
                  t[70] = (t[70] | 0) + 2;
                  if ((w(1) | 0) << 16 >> 16 == 109 ? (a = t[70] | 0, (m(a + 2 | 0, 44, 6) | 0) == 0) : 0) {
                    e = t[67] | 0;
                    if (!(G(e) | 0) ? (s[e >> 1] | 0) == 46 : 0) break e;
                    A(f, f, a + 8 | 0, 2);
                  }
                  break;
                }
              case 42:
              case 39:
              case 34:
                {
                  c = 18;
                  break;
                }
              case 123:
                {
                  e = t[70] | 0;
                  if (s[396] | 0) {
                    t[70] = e + -2;
                    break e;
                  }
                  while (1) {
                    if (e >>> 0 >= (t[71] | 0) >>> 0) break;
                    e = w(1) | 0;
                    if (!(W(e) | 0)) {
                      if (e << 16 >> 16 == 125) {
                        c = 33;
                        break;
                      }
                    } else d(e);
                    e = (t[70] | 0) + 2 | 0;
                    t[70] = e;
                  }
                  if ((c | 0) == 33) t[70] = (t[70] | 0) + 2;
                  n = (w(1) | 0) << 16 >> 16 == 102;
                  e = t[70] | 0;
                  if (n ? m(e + 2 | 0, 50, 6) | 0 : 0) {
                    T();
                    break e;
                  }
                  t[70] = e + 8;
                  e = w(1) | 0;
                  if (W(e) | 0) {
                    u(f, e);
                    break e;
                  } else {
                    T();
                    break e;
                  }
                }
              default:
                if ((t[70] | 0) == (e | 0)) t[70] = f + 10;else c = 18;
            }
          } while (0);
          do {
            if ((c | 0) == 18) {
              if (s[396] | 0) {
                t[70] = (t[70] | 0) + -2;
                break;
              }
              e = t[71] | 0;
              a = t[70] | 0;
              while (1) {
                if (a >>> 0 >= e >>> 0) {
                  c = 25;
                  break;
                }
                r = s[a >> 1] | 0;
                if (W(r) | 0) {
                  c = 23;
                  break;
                }
                n = a + 2 | 0;
                t[70] = n;
                a = n;
              }
              if ((c | 0) == 23) {
                u(f, r);
                break;
              } else if ((c | 0) == 25) {
                T();
                break;
              }
            }
          } while (0);
          return;
        }
        function u(e, a) {
          e = e | 0;
          a = a | 0;
          var r = 0,
            i = 0;
          r = (t[70] | 0) + 2 | 0;
          switch (a << 16 >> 16) {
            case 39:
              {
                d(39);
                i = 5;
                break;
              }
            case 34:
              {
                d(34);
                i = 5;
                break;
              }
            default:
              T();
          }
          do {
            if ((i | 0) == 5) {
              A(e, r, t[70] | 0, 1);
              t[70] = (t[70] | 0) + 2;
              a = w(0) | 0;
              e = a << 16 >> 16 == 97;
              if (e) {
                r = t[70] | 0;
                if (m(r + 2 | 0, 78, 10) | 0) i = 11;
              } else {
                r = t[70] | 0;
                if (!(((a << 16 >> 16 == 119 ? (s[r + 2 >> 1] | 0) == 105 : 0) ? (s[r + 4 >> 1] | 0) == 116 : 0) ? (s[r + 6 >> 1] | 0) == 104 : 0)) i = 11;
              }
              if ((i | 0) == 11) {
                t[70] = r + -2;
                break;
              }
              t[70] = r + ((e ? 6 : 4) << 1);
              if ((w(1) | 0) << 16 >> 16 != 123) {
                t[70] = r;
                break;
              }
              e = t[70] | 0;
              a = e;
              e: while (1) {
                t[70] = a + 2;
                a = w(1) | 0;
                switch (a << 16 >> 16) {
                  case 39:
                    {
                      d(39);
                      t[70] = (t[70] | 0) + 2;
                      a = w(1) | 0;
                      break;
                    }
                  case 34:
                    {
                      d(34);
                      t[70] = (t[70] | 0) + 2;
                      a = w(1) | 0;
                      break;
                    }
                  default:
                    a = q(a) | 0;
                }
                if (a << 16 >> 16 != 58) {
                  i = 20;
                  break;
                }
                t[70] = (t[70] | 0) + 2;
                switch ((w(1) | 0) << 16 >> 16) {
                  case 39:
                    {
                      d(39);
                      break;
                    }
                  case 34:
                    {
                      d(34);
                      break;
                    }
                  default:
                    {
                      i = 24;
                      break e;
                    }
                }
                t[70] = (t[70] | 0) + 2;
                switch ((w(1) | 0) << 16 >> 16) {
                  case 125:
                    {
                      i = 29;
                      break e;
                    }
                  case 44:
                    break;
                  default:
                    {
                      i = 28;
                      break e;
                    }
                }
                t[70] = (t[70] | 0) + 2;
                if ((w(1) | 0) << 16 >> 16 == 125) {
                  i = 29;
                  break;
                }
                a = t[70] | 0;
              }
              if ((i | 0) == 20) {
                t[70] = r;
                break;
              } else if ((i | 0) == 24) {
                t[70] = r;
                break;
              } else if ((i | 0) == 28) {
                t[70] = r;
                break;
              } else if ((i | 0) == 29) {
                i = t[61] | 0;
                t[i + 16 >> 2] = e;
                t[i + 12 >> 2] = (t[70] | 0) + 2;
                break;
              }
            }
          } while (0);
          return;
        }
        function o(e) {
          e = e | 0;
          e: do {
            switch (s[e >> 1] | 0) {
              case 100:
                switch (s[e + -2 >> 1] | 0) {
                  case 105:
                    {
                      e = O(e + -4 | 0, 88, 2) | 0;
                      break e;
                    }
                  case 108:
                    {
                      e = O(e + -4 | 0, 92, 3) | 0;
                      break e;
                    }
                  default:
                    {
                      e = 0;
                      break e;
                    }
                }
              case 101:
                switch (s[e + -2 >> 1] | 0) {
                  case 115:
                    switch (s[e + -4 >> 1] | 0) {
                      case 108:
                        {
                          e = B(e + -6 | 0, 101) | 0;
                          break e;
                        }
                      case 97:
                        {
                          e = B(e + -6 | 0, 99) | 0;
                          break e;
                        }
                      default:
                        {
                          e = 0;
                          break e;
                        }
                    }
                  case 116:
                    {
                      e = O(e + -4 | 0, 98, 4) | 0;
                      break e;
                    }
                  case 117:
                    {
                      e = O(e + -4 | 0, 106, 6) | 0;
                      break e;
                    }
                  default:
                    {
                      e = 0;
                      break e;
                    }
                }
              case 102:
                {
                  if ((s[e + -2 >> 1] | 0) == 111 ? (s[e + -4 >> 1] | 0) == 101 : 0) switch (s[e + -6 >> 1] | 0) {
                    case 99:
                      {
                        e = O(e + -8 | 0, 118, 6) | 0;
                        break e;
                      }
                    case 112:
                      {
                        e = O(e + -8 | 0, 130, 2) | 0;
                        break e;
                      }
                    default:
                      {
                        e = 0;
                        break e;
                      }
                  } else e = 0;
                  break;
                }
              case 107:
                {
                  e = O(e + -2 | 0, 134, 4) | 0;
                  break;
                }
              case 110:
                {
                  e = e + -2 | 0;
                  if (B(e, 105) | 0) e = 1;else e = O(e, 142, 5) | 0;
                  break;
                }
              case 111:
                {
                  e = B(e + -2 | 0, 100) | 0;
                  break;
                }
              case 114:
                {
                  e = O(e + -2 | 0, 152, 7) | 0;
                  break;
                }
              case 116:
                {
                  e = O(e + -2 | 0, 166, 4) | 0;
                  break;
                }
              case 119:
                switch (s[e + -2 >> 1] | 0) {
                  case 101:
                    {
                      e = B(e + -4 | 0, 110) | 0;
                      break e;
                    }
                  case 111:
                    {
                      e = O(e + -4 | 0, 174, 3) | 0;
                      break e;
                    }
                  default:
                    {
                      e = 0;
                      break e;
                    }
                }
              default:
                e = 0;
            }
          } while (0);
          return e | 0;
        }
        function h() {
          var e = 0,
            a = 0,
            r = 0,
            i = 0;
          a = t[71] | 0;
          r = t[70] | 0;
          e: while (1) {
            e = r + 2 | 0;
            if (r >>> 0 >= a >>> 0) {
              a = 10;
              break;
            }
            switch (s[e >> 1] | 0) {
              case 96:
                {
                  a = 7;
                  break e;
                }
              case 36:
                {
                  if ((s[r + 4 >> 1] | 0) == 123) {
                    a = 6;
                    break e;
                  }
                  break;
                }
              case 92:
                {
                  e = r + 4 | 0;
                  break;
                }
              default:
                {}
            }
            r = e;
          }
          if ((a | 0) == 6) {
            e = r + 4 | 0;
            t[70] = e;
            a = t[68] | 0;
            i = s[396] | 0;
            r = i & 65535;
            t[a + (r << 3) >> 2] = 4;
            s[396] = i + 1 << 16 >> 16;
            t[a + (r << 3) + 4 >> 2] = e;
          } else if ((a | 0) == 7) {
            t[70] = e;
            r = t[68] | 0;
            i = (s[396] | 0) + -1 << 16 >> 16;
            s[396] = i;
            if ((t[r + ((i & 65535) << 3) >> 2] | 0) != 3) T();
          } else if ((a | 0) == 10) {
            t[70] = e;
            T();
          }
          return;
        }
        function w(e) {
          e = e | 0;
          var a = 0,
            r = 0,
            i = 0;
          r = t[70] | 0;
          e: do {
            a = s[r >> 1] | 0;
            a: do {
              if (a << 16 >> 16 != 47) {
                if (e) {
                  if (V(a) | 0) break;else break e;
                } else if (F(a) | 0) break;else break e;
              } else switch (s[r + 2 >> 1] | 0) {
                case 47:
                  {
                    P();
                    break a;
                  }
                case 42:
                  {
                    y(e);
                    break a;
                  }
                default:
                  {
                    a = 47;
                    break e;
                  }
              }
            } while (0);
            i = t[70] | 0;
            r = i + 2 | 0;
            t[70] = r;
          } while (i >>> 0 < (t[71] | 0) >>> 0);
          return a | 0;
        }
        function d(e) {
          e = e | 0;
          var a = 0,
            r = 0,
            i = 0,
            c = 0;
          c = t[71] | 0;
          a = t[70] | 0;
          while (1) {
            i = a + 2 | 0;
            if (a >>> 0 >= c >>> 0) {
              a = 9;
              break;
            }
            r = s[i >> 1] | 0;
            if (r << 16 >> 16 == e << 16 >> 16) {
              a = 10;
              break;
            }
            if (r << 16 >> 16 == 92) {
              r = a + 4 | 0;
              if ((s[r >> 1] | 0) == 13) {
                a = a + 6 | 0;
                a = (s[a >> 1] | 0) == 10 ? a : r;
              } else a = r;
            } else if (Z(r) | 0) {
              a = 9;
              break;
            } else a = i;
          }
          if ((a | 0) == 9) {
            t[70] = i;
            T();
          } else if ((a | 0) == 10) t[70] = i;
          return;
        }
        function v(e, a) {
          e = e | 0;
          a = a | 0;
          var r = 0,
            i = 0,
            c = 0,
            f = 0;
          r = t[70] | 0;
          i = s[r >> 1] | 0;
          f = (e | 0) == (a | 0);
          c = f ? 0 : e;
          f = f ? 0 : a;
          if (i << 16 >> 16 == 97) {
            t[70] = r + 4;
            r = w(1) | 0;
            e = t[70] | 0;
            if (W(r) | 0) {
              d(r);
              a = (t[70] | 0) + 2 | 0;
              t[70] = a;
            } else {
              q(r) | 0;
              a = t[70] | 0;
            }
            i = w(1) | 0;
            r = t[70] | 0;
          }
          if ((r | 0) != (e | 0)) $(e, a, c, f);
          return i | 0;
        }
        function A(e, a, r, s) {
          e = e | 0;
          a = a | 0;
          r = r | 0;
          s = s | 0;
          var c = 0,
            f = 0;
          c = t[65] | 0;
          t[65] = c + 32;
          f = t[61] | 0;
          t[((f | 0) == 0 ? 228 : f + 28 | 0) >> 2] = c;
          t[62] = f;
          t[61] = c;
          t[c + 8 >> 2] = e;
          if (2 == (s | 0)) e = r;else e = 1 == (s | 0) ? r + 2 | 0 : 0;
          t[c + 12 >> 2] = e;
          t[c >> 2] = a;
          t[c + 4 >> 2] = r;
          t[c + 16 >> 2] = 0;
          t[c + 20 >> 2] = s;
          i[c + 24 >> 0] = 1 == (s | 0) & 1;
          t[c + 28 >> 2] = 0;
          return;
        }
        function C() {
          var e = 0,
            a = 0,
            r = 0;
          r = t[71] | 0;
          a = t[70] | 0;
          e: while (1) {
            e = a + 2 | 0;
            if (a >>> 0 >= r >>> 0) {
              a = 6;
              break;
            }
            switch (s[e >> 1] | 0) {
              case 13:
              case 10:
                {
                  a = 6;
                  break e;
                }
              case 93:
                {
                  a = 7;
                  break e;
                }
              case 92:
                {
                  e = a + 4 | 0;
                  break;
                }
              default:
                {}
            }
            a = e;
          }
          if ((a | 0) == 6) {
            t[70] = e;
            T();
            e = 0;
          } else if ((a | 0) == 7) {
            t[70] = e;
            e = 93;
          }
          return e | 0;
        }
        function g() {
          var e = 0,
            a = 0,
            r = 0;
          e: while (1) {
            e = t[70] | 0;
            a = e + 2 | 0;
            t[70] = a;
            if (e >>> 0 >= (t[71] | 0) >>> 0) {
              r = 7;
              break;
            }
            switch (s[a >> 1] | 0) {
              case 13:
              case 10:
                {
                  r = 7;
                  break e;
                }
              case 47:
                break e;
              case 91:
                {
                  C() | 0;
                  break;
                }
              case 92:
                {
                  t[70] = e + 4;
                  break;
                }
              default:
                {}
            }
          }
          if ((r | 0) == 7) T();
          return;
        }
        function p(e) {
          e = e | 0;
          switch (s[e >> 1] | 0) {
            case 62:
              {
                e = (s[e + -2 >> 1] | 0) == 61;
                break;
              }
            case 41:
            case 59:
              {
                e = 1;
                break;
              }
            case 104:
              {
                e = O(e + -2 | 0, 200, 4) | 0;
                break;
              }
            case 121:
              {
                e = O(e + -2 | 0, 208, 6) | 0;
                break;
              }
            case 101:
              {
                e = O(e + -2 | 0, 220, 3) | 0;
                break;
              }
            default:
              e = 0;
          }
          return e | 0;
        }
        function y(e) {
          e = e | 0;
          var a = 0,
            r = 0,
            i = 0,
            c = 0,
            f = 0;
          c = (t[70] | 0) + 2 | 0;
          t[70] = c;
          r = t[71] | 0;
          while (1) {
            a = c + 2 | 0;
            if (c >>> 0 >= r >>> 0) break;
            i = s[a >> 1] | 0;
            if (!e ? Z(i) | 0 : 0) break;
            if (i << 16 >> 16 == 42 ? (s[c + 4 >> 1] | 0) == 47 : 0) {
              f = 8;
              break;
            }
            c = a;
          }
          if ((f | 0) == 8) {
            t[70] = a;
            a = c + 4 | 0;
          }
          t[70] = a;
          return;
        }
        function m(e, a, r) {
          e = e | 0;
          a = a | 0;
          r = r | 0;
          var s = 0,
            t = 0;
          e: do {
            if (!r) e = 0;else {
              while (1) {
                s = i[e >> 0] | 0;
                t = i[a >> 0] | 0;
                if (s << 24 >> 24 != t << 24 >> 24) break;
                r = r + -1 | 0;
                if (!r) {
                  e = 0;
                  break e;
                } else {
                  e = e + 1 | 0;
                  a = a + 1 | 0;
                }
              }
              e = (s & 255) - (t & 255) | 0;
            }
          } while (0);
          return e | 0;
        }
        function I(e) {
          e = e | 0;
          e: do {
            switch (e << 16 >> 16) {
              case 38:
              case 37:
              case 33:
                {
                  e = 1;
                  break;
                }
              default:
                if ((e & -8) << 16 >> 16 == 40 | (e + -58 & 65535) < 6) e = 1;else {
                  switch (e << 16 >> 16) {
                    case 91:
                    case 93:
                    case 94:
                      {
                        e = 1;
                        break e;
                      }
                    default:
                      {}
                  }
                  e = (e + -123 & 65535) < 4;
                }
            }
          } while (0);
          return e | 0;
        }
        function U(e) {
          e = e | 0;
          e: do {
            switch (e << 16 >> 16) {
              case 38:
              case 37:
              case 33:
                break;
              default:
                if (!((e + -58 & 65535) < 6 | (e + -40 & 65535) < 7 & e << 16 >> 16 != 41)) {
                  switch (e << 16 >> 16) {
                    case 91:
                    case 94:
                      break e;
                    default:
                      {}
                  }
                  return e << 16 >> 16 != 125 & (e + -123 & 65535) < 4 | 0;
                }
            }
          } while (0);
          return 1;
        }
        function x(e) {
          e = e | 0;
          var a = 0;
          a = s[e >> 1] | 0;
          e: do {
            if ((a + -9 & 65535) >= 5) {
              switch (a << 16 >> 16) {
                case 160:
                case 32:
                  {
                    a = 1;
                    break e;
                  }
                default:
                  {}
              }
              if (I(a) | 0) return a << 16 >> 16 != 46 | (G(e) | 0) | 0;else a = 0;
            } else a = 1;
          } while (0);
          return a | 0;
        }
        function S(e) {
          e = e | 0;
          var a = 0,
            r = 0,
            i = 0,
            c = 0;
          r = n;
          n = n + 16 | 0;
          i = r;
          t[i >> 2] = 0;
          t[64] = e;
          a = t[3] | 0;
          c = a + (e << 1) | 0;
          e = c + 2 | 0;
          s[c >> 1] = 0;
          t[i >> 2] = e;
          t[65] = e;
          t[57] = 0;
          t[61] = 0;
          t[59] = 0;
          t[58] = 0;
          t[63] = 0;
          t[60] = 0;
          n = r;
          return a | 0;
        }
        function O(e, a, r) {
          e = e | 0;
          a = a | 0;
          r = r | 0;
          var i = 0,
            s = 0;
          i = e + (0 - r << 1) | 0;
          s = i + 2 | 0;
          e = t[3] | 0;
          if (s >>> 0 >= e >>> 0 ? (m(s, a, r << 1) | 0) == 0 : 0) {
            if ((s | 0) == (e | 0)) e = 1;else e = x(i) | 0;
          } else e = 0;
          return e | 0;
        }
        function $(e, a, r, i) {
          e = e | 0;
          a = a | 0;
          r = r | 0;
          i = i | 0;
          var s = 0,
            c = 0;
          s = t[65] | 0;
          t[65] = s + 20;
          c = t[63] | 0;
          t[((c | 0) == 0 ? 232 : c + 16 | 0) >> 2] = s;
          t[63] = s;
          t[s >> 2] = e;
          t[s + 4 >> 2] = a;
          t[s + 8 >> 2] = r;
          t[s + 12 >> 2] = i;
          t[s + 16 >> 2] = 0;
          return;
        }
        function j(e) {
          e = e | 0;
          switch (s[e >> 1] | 0) {
            case 107:
              {
                e = O(e + -2 | 0, 134, 4) | 0;
                break;
              }
            case 101:
              {
                if ((s[e + -2 >> 1] | 0) == 117) e = O(e + -4 | 0, 106, 6) | 0;else e = 0;
                break;
              }
            default:
              e = 0;
          }
          return e | 0;
        }
        function B(e, a) {
          e = e | 0;
          a = a | 0;
          var r = 0;
          r = t[3] | 0;
          if (r >>> 0 <= e >>> 0 ? (s[e >> 1] | 0) == a << 16 >> 16 : 0) {
            if ((r | 0) == (e | 0)) r = 1;else r = E(s[e + -2 >> 1] | 0) | 0;
          } else r = 0;
          return r | 0;
        }
        function E(e) {
          e = e | 0;
          e: do {
            if ((e + -9 & 65535) < 5) e = 1;else {
              switch (e << 16 >> 16) {
                case 32:
                case 160:
                  {
                    e = 1;
                    break e;
                  }
                default:
                  {}
              }
              e = e << 16 >> 16 != 46 & (I(e) | 0);
            }
          } while (0);
          return e | 0;
        }
        function P() {
          var e = 0,
            a = 0,
            r = 0;
          e = t[71] | 0;
          r = t[70] | 0;
          e: while (1) {
            a = r + 2 | 0;
            if (r >>> 0 >= e >>> 0) break;
            switch (s[a >> 1] | 0) {
              case 13:
              case 10:
                break e;
              default:
                r = a;
            }
          }
          t[70] = a;
          return;
        }
        function q(e) {
          e = e | 0;
          while (1) {
            if (V(e) | 0) break;
            if (I(e) | 0) break;
            e = (t[70] | 0) + 2 | 0;
            t[70] = e;
            e = s[e >> 1] | 0;
            if (!(e << 16 >> 16)) {
              e = 0;
              break;
            }
          }
          return e | 0;
        }
        function z() {
          var e = 0;
          e = t[(t[59] | 0) + 20 >> 2] | 0;
          switch (e | 0) {
            case 1:
              {
                e = -1;
                break;
              }
            case 2:
              {
                e = -2;
                break;
              }
            default:
              e = e - (t[3] | 0) >> 1;
          }
          return e | 0;
        }
        function D(e) {
          e = e | 0;
          if (!(O(e, 180, 5) | 0) ? !(O(e, 190, 3) | 0) : 0) e = O(e, 196, 2) | 0;else e = 1;
          return e | 0;
        }
        function F(e) {
          e = e | 0;
          switch (e << 16 >> 16) {
            case 160:
            case 32:
            case 12:
            case 11:
            case 9:
              {
                e = 1;
                break;
              }
            default:
              e = 0;
          }
          return e | 0;
        }
        function G(e) {
          e = e | 0;
          if ((s[e >> 1] | 0) == 46 ? (s[e + -2 >> 1] | 0) == 46 : 0) e = (s[e + -4 >> 1] | 0) == 46;else e = 0;
          return e | 0;
        }
        function H(e) {
          e = e | 0;
          if ((t[3] | 0) == (e | 0)) e = 1;else e = x(e + -2 | 0) | 0;
          return e | 0;
        }
        function J() {
          var e = 0;
          e = t[(t[60] | 0) + 12 >> 2] | 0;
          if (!e) e = -1;else e = e - (t[3] | 0) >> 1;
          return e | 0;
        }
        function K() {
          var e = 0;
          e = t[(t[59] | 0) + 12 >> 2] | 0;
          if (!e) e = -1;else e = e - (t[3] | 0) >> 1;
          return e | 0;
        }
        function L() {
          var e = 0;
          e = t[(t[60] | 0) + 8 >> 2] | 0;
          if (!e) e = -1;else e = e - (t[3] | 0) >> 1;
          return e | 0;
        }
        function M() {
          var e = 0;
          e = t[(t[59] | 0) + 16 >> 2] | 0;
          if (!e) e = -1;else e = e - (t[3] | 0) >> 1;
          return e | 0;
        }
        function N() {
          var e = 0;
          e = t[(t[59] | 0) + 4 >> 2] | 0;
          if (!e) e = -1;else e = e - (t[3] | 0) >> 1;
          return e | 0;
        }
        function Q() {
          var e = 0;
          e = t[59] | 0;
          e = t[((e | 0) == 0 ? 228 : e + 28 | 0) >> 2] | 0;
          t[59] = e;
          return (e | 0) != 0 | 0;
        }
        function R() {
          var e = 0;
          e = t[60] | 0;
          e = t[((e | 0) == 0 ? 232 : e + 16 | 0) >> 2] | 0;
          t[60] = e;
          return (e | 0) != 0 | 0;
        }
        function T() {
          i[794] = 1;
          t[66] = (t[70] | 0) - (t[3] | 0) >> 1;
          t[70] = (t[71] | 0) + 2;
          return;
        }
        function V(e) {
          e = e | 0;
          return (e | 128) << 16 >> 16 == 160 | (e + -9 & 65535) < 5 | 0;
        }
        function W(e) {
          e = e | 0;
          return e << 16 >> 16 == 39 | e << 16 >> 16 == 34 | 0;
        }
        function X() {
          return (t[(t[59] | 0) + 8 >> 2] | 0) - (t[3] | 0) >> 1 | 0;
        }
        function Y() {
          return (t[(t[60] | 0) + 4 >> 2] | 0) - (t[3] | 0) >> 1 | 0;
        }
        function Z(e) {
          e = e | 0;
          return e << 16 >> 16 == 13 | e << 16 >> 16 == 10 | 0;
        }
        function _() {
          return (t[t[59] >> 2] | 0) - (t[3] | 0) >> 1 | 0;
        }
        function ee() {
          return (t[t[60] >> 2] | 0) - (t[3] | 0) >> 1 | 0;
        }
        function ae() {
          return c[(t[59] | 0) + 24 >> 0] | 0 | 0;
        }
        function re(e) {
          e = e | 0;
          t[3] = e;
          return;
        }
        function ie() {
          return (i[795] | 0) != 0 | 0;
        }
        function se() {
          return t[66] | 0;
        }
        function te(e) {
          e = e | 0;
          n = e + 992 + 15 & -16;
          return 992;
        }
        return {
          su: te,
          ai: M,
          e: se,
          ee: Y,
          ele: J,
          els: L,
          es: ee,
          f: ie,
          id: z,
          ie: N,
          ip: ae,
          is: _,
          p: b,
          re: R,
          ri: Q,
          sa: S,
          se: K,
          ses: re,
          ss: X
        };
      }("undefined" != typeof self ? self : commonjsGlobal, {}, a), r = e.su(i - (2 << 17));
    }
    const h = c$1.length + 1;
    e.ses(r), e.sa(h - 1), s(c$1, new Uint16Array(a, r, h)), e.p() || (n = e.e(), o());
    const w = [],
      d = [];
    for (; e.ri();) {
      const a = e.is(),
        r = e.ie(),
        i = e.ai(),
        s = e.id(),
        t = e.ss(),
        f = e.se();
      let n;
      e.ip() && (n = b(-1 === s ? a : a + 1, c$1.charCodeAt(-1 === s ? a - 1 : a))), w.push({
        n: n,
        s: a,
        e: r,
        ss: t,
        se: f,
        d: s,
        a: i
      });
    }
    for (; e.re();) {
      const a = e.es(),
        r = e.ee(),
        i = e.els(),
        s = e.ele(),
        t = c$1.charCodeAt(a),
        f = i >= 0 ? c$1.charCodeAt(i) : -1;
      d.push({
        s: a,
        e: r,
        ls: i,
        le: s,
        n: 34 === t || 39 === t ? b(a + 1, t) : c$1.slice(a, r),
        ln: i < 0 ? void 0 : 34 === f || 39 === f ? b(i + 1, f) : c$1.slice(i, s)
      });
    }
    return [w, d, !!e.f()];
  }
  function b(e, a) {
    n = e;
    let r = "",
      i = n;
    for (;;) {
      n >= c$1.length && o();
      const e = c$1.charCodeAt(n);
      if (e === a) break;
      92 === e ? (r += c$1.slice(i, n), r += l(), i = n) : (8232 === e || 8233 === e || u(e) && o(), ++n);
    }
    return r += c$1.slice(i, n++), r;
  }
  function l() {
    let e = c$1.charCodeAt(++n);
    switch (++n, e) {
      case 110:
        return "\n";
      case 114:
        return "\r";
      case 120:
        return String.fromCharCode(k(2));
      case 117:
        return function () {
          const e = c$1.charCodeAt(n);
          let a;
          123 === e ? (++n, a = k(c$1.indexOf("}", n) - n), ++n, a > 1114111 && o()) : a = k(4);
          return a <= 65535 ? String.fromCharCode(a) : (a -= 65536, String.fromCharCode(55296 + (a >> 10), 56320 + (1023 & a)));
        }();
      case 116:
        return "\t";
      case 98:
        return "\b";
      case 118:
        return "\v";
      case 102:
        return "\f";
      case 13:
        10 === c$1.charCodeAt(n) && ++n;
      case 10:
        return "";
      case 56:
      case 57:
        o();
      default:
        if (e >= 48 && e <= 55) {
          let a = c$1.substr(n - 1, 3).match(/^[0-7]+/)[0],
            r = parseInt(a, 8);
          return r > 255 && (a = a.slice(0, -1), r = parseInt(a, 8)), n += a.length - 1, e = c$1.charCodeAt(n), "0" === a && 56 !== e && 57 !== e || o(), String.fromCharCode(r);
        }
        return u(e) ? "" : String.fromCharCode(e);
    }
  }
  function k(e) {
    const a = n;
    let r = 0,
      i = 0;
    for (let a = 0; a < e; ++a, ++n) {
      let e,
        s = c$1.charCodeAt(n);
      if (95 !== s) {
        if (s >= 97) e = s - 97 + 10;else if (s >= 65) e = s - 65 + 10;else {
          if (!(s >= 48 && s <= 57)) break;
          e = s - 48;
        }
        if (e >= 16) break;
        i = s, r = 16 * r + e;
      } else 95 !== i && 0 !== a || o(), i = s;
    }
    return 95 !== i && n - a === e || o(), r;
  }
  function u(e) {
    return 13 === e || 10 === e;
  }
  function o() {
    throw Object.assign(Error(`Parse error ${f}:${c$1.slice(0, n).split("\n").length}:${n - c$1.lastIndexOf("\n", n - 1)}`), {
      idx: n
    });
  }
  async function _resolve(id, parentUrl) {
    const urlResolved = resolveIfNotPlainOrUrl(id, parentUrl);
    return {
      r: resolveImportMap(importMap, urlResolved || id, parentUrl) || throwUnresolved(id, parentUrl),
      // b = bare specifier
      b: !urlResolved && !isURL(id)
    };
  }
  const resolve = resolveHook ? async (id, parentUrl) => {
    let result = resolveHook(id, parentUrl, defaultResolve);
    // will be deprecated in next major
    if (result && result.then) result = await result;
    return result ? {
      r: result,
      b: !resolveIfNotPlainOrUrl(id, parentUrl) && !isURL(id)
    } : _resolve(id, parentUrl);
  } : _resolve;

  // importShim('mod');
  // importShim('mod', { opts });
  // importShim('mod', { opts }, parentUrl);
  // importShim('mod', parentUrl);
  async function importShim(id, ...args) {
    // parentUrl if present will be the last argument
    let parentUrl = args[args.length - 1];
    if (typeof parentUrl !== 'string') parentUrl = baseUrl;
    // needed for shim check
    await initPromise;
    if (importHook) await importHook(id, typeof args[1] !== 'string' ? args[1] : {}, parentUrl);
    if (acceptingImportMaps || shimMode || !baselinePassthrough) {
      if (hasDocument) processScriptsAndPreloads(true);
      if (!shimMode) acceptingImportMaps = false;
    }
    await importMapPromise;
    return topLevelLoad((await resolve(id, parentUrl)).r, {
      credentials: 'same-origin'
    });
  }
  self.importShim = importShim;
  function defaultResolve(id, parentUrl) {
    return resolveImportMap(importMap, resolveIfNotPlainOrUrl(id, parentUrl) || id, parentUrl) || throwUnresolved(id, parentUrl);
  }
  function throwUnresolved(id, parentUrl) {
    throw Error(`Unable to resolve specifier '${id}'${fromParent(parentUrl)}`);
  }
  const resolveSync = (id, parentUrl = baseUrl) => {
    parentUrl = `${parentUrl}`;
    const result = resolveHook && resolveHook(id, parentUrl, defaultResolve);
    return result && !result.then ? result : defaultResolve(id, parentUrl);
  };
  function metaResolve(id, parentUrl = this.url) {
    return resolveSync(id, parentUrl);
  }
  importShim.resolve = resolveSync;
  importShim.getImportMap = () => JSON.parse(JSON.stringify(importMap));
  importShim.addImportMap = importMapIn => {
    if (!shimMode) throw new Error('Unsupported in polyfill mode.');
    importMap = resolveAndComposeImportMap(importMapIn, baseUrl, importMap);
  };
  const registry = importShim._r = {};
  async function loadAll(load, seen) {
    if (load.b || seen[load.u]) return;
    seen[load.u] = 1;
    await load.L;
    await Promise.all(load.d.map(dep => loadAll(dep, seen)));
    if (!load.n) load.n = load.d.some(dep => dep.n);
  }
  let importMap = {
    imports: {},
    scopes: {}
  };
  let baselinePassthrough;
  const initPromise = featureDetectionPromise.then(() => {
    baselinePassthrough = esmsInitOptions.polyfillEnable !== true && supportsDynamicImport && supportsImportMeta && supportsImportMaps && (!jsonModulesEnabled || supportsJsonAssertions) && (!cssModulesEnabled || supportsCssAssertions) && !importMapSrcOrLazy;
    if (hasDocument) {
      if (!supportsImportMaps) {
        const supports = HTMLScriptElement.supports || (type => type === 'classic' || type === 'module');
        HTMLScriptElement.supports = type => type === 'importmap' || supports(type);
      }
      if (shimMode || !baselinePassthrough) {
        new MutationObserver(mutations => {
          for (const mutation of mutations) {
            if (mutation.type !== 'childList') continue;
            for (const node of mutation.addedNodes) {
              if (node.tagName === 'SCRIPT') {
                if (node.type === (shimMode ? 'module-shim' : 'module')) processScript(node, true);
                if (node.type === (shimMode ? 'importmap-shim' : 'importmap')) processImportMap(node, true);
              } else if (node.tagName === 'LINK' && node.rel === (shimMode ? 'modulepreload-shim' : 'modulepreload')) {
                processPreload(node);
              }
            }
          }
        }).observe(document, {
          childList: true,
          subtree: true
        });
        processScriptsAndPreloads();
        if (document.readyState === 'complete') {
          readyStateCompleteCheck();
        } else {
          async function readyListener() {
            await initPromise;
            processScriptsAndPreloads();
            if (document.readyState === 'complete') {
              readyStateCompleteCheck();
              document.removeEventListener('readystatechange', readyListener);
            }
          }
          document.addEventListener('readystatechange', readyListener);
        }
      }
    }
    return undefined;
  });
  let importMapPromise = initPromise;
  let firstPolyfillLoad = true;
  let acceptingImportMaps = true;
  async function topLevelLoad(url, fetchOpts, source, nativelyLoaded, lastStaticLoadPromise) {
    if (!shimMode) acceptingImportMaps = false;
    await initPromise;
    await importMapPromise;
    if (importHook) await importHook(url, typeof fetchOpts !== 'string' ? fetchOpts : {}, '');
    // early analysis opt-out - no need to even fetch if we have feature support
    if (!shimMode && baselinePassthrough) {
      // for polyfill case, only dynamic import needs a return value here, and dynamic import will never pass nativelyLoaded
      if (nativelyLoaded) return null;
      await lastStaticLoadPromise;
      return dynamicImport(source ? createBlob(source) : url, {
        errUrl: url || source
      });
    }
    const load = getOrCreateLoad(url, fetchOpts, null, source);
    const seen = {};
    await loadAll(load, seen);
    lastLoad = undefined;
    resolveDeps(load, seen);
    await lastStaticLoadPromise;
    if (source && !shimMode && !load.n) {
      if (nativelyLoaded) return;
      if (revokeBlobURLs) revokeObjectURLs(Object.keys(seen));
      return await dynamicImport(createBlob(source), {
        errUrl: source
      });
    }
    if (firstPolyfillLoad && !shimMode && load.n && nativelyLoaded) {
      onpolyfill();
      firstPolyfillLoad = false;
    }
    const module = await dynamicImport(!shimMode && !load.n && nativelyLoaded ? load.u : load.b, {
      errUrl: load.u
    });
    // if the top-level load is a shell, run its update function
    if (load.s) (await dynamicImport(load.s)).u$_(module);
    if (revokeBlobURLs) revokeObjectURLs(Object.keys(seen));
    // when tla is supported, this should return the tla promise as an actual handle
    // so readystate can still correspond to the sync subgraph exec completions
    return module;
  }
  function revokeObjectURLs(registryKeys) {
    let batch = 0;
    const keysLength = registryKeys.length;
    const schedule = self.requestIdleCallback ? self.requestIdleCallback : self.requestAnimationFrame;
    schedule(cleanup);
    function cleanup() {
      const batchStartIndex = batch * 100;
      if (batchStartIndex > keysLength) return;
      for (const key of registryKeys.slice(batchStartIndex, batchStartIndex + 100)) {
        const load = registry[key];
        if (load) URL.revokeObjectURL(load.b);
      }
      batch++;
      schedule(cleanup);
    }
  }
  function urlJsString(url) {
    return `'${url.replace(/'/g, "\\'")}'`;
  }
  let lastLoad;
  function resolveDeps(load, seen) {
    if (load.b || !seen[load.u]) return;
    seen[load.u] = 0;
    for (const dep of load.d) resolveDeps(dep, seen);
    const [imports, exports] = load.a;

    // "execution"
    const source = load.S;

    // edge doesnt execute sibling in order, so we fix this up by ensuring all previous executions are explicit dependencies
    let resolvedSource = edge && lastLoad ? `import '${lastLoad}';` : '';
    if (!imports.length) {
      resolvedSource += source;
    } else {
      // once all deps have loaded we can inline the dependency resolution blobs
      // and define this blob
      let lastIndex = 0,
        depIndex = 0,
        dynamicImportEndStack = [];
      function pushStringTo(originalIndex) {
        while (dynamicImportEndStack[dynamicImportEndStack.length - 1] < originalIndex) {
          const dynamicImportEnd = dynamicImportEndStack.pop();
          resolvedSource += `${source.slice(lastIndex, dynamicImportEnd)}, ${urlJsString(load.r)}`;
          lastIndex = dynamicImportEnd;
        }
        resolvedSource += source.slice(lastIndex, originalIndex);
        lastIndex = originalIndex;
      }
      for (const {
        s: start,
        ss: statementStart,
        se: statementEnd,
        d: dynamicImportIndex
      } of imports) {
        // dependency source replacements
        if (dynamicImportIndex === -1) {
          let depLoad = load.d[depIndex++],
            blobUrl = depLoad.b,
            cycleShell = !blobUrl;
          if (cycleShell) {
            // circular shell creation
            if (!(blobUrl = depLoad.s)) {
              blobUrl = depLoad.s = createBlob(`export function u$_(m){${depLoad.a[1].map(({
                s,
                e
              }, i) => {
                const q = depLoad.S[s] === '"' || depLoad.S[s] === "'";
                return `e$_${i}=m${q ? `[` : '.'}${depLoad.S.slice(s, e)}${q ? `]` : ''}`;
              }).join(',')}}${depLoad.a[1].length ? `let ${depLoad.a[1].map((_, i) => `e$_${i}`).join(',')};` : ''}export {${depLoad.a[1].map(({
                s,
                e
              }, i) => `e$_${i} as ${depLoad.S.slice(s, e)}`).join(',')}}\n//# sourceURL=${depLoad.r}?cycle`);
            }
          }
          pushStringTo(start - 1);
          resolvedSource += `/*${source.slice(start - 1, statementEnd)}*/${urlJsString(blobUrl)}`;

          // circular shell execution
          if (!cycleShell && depLoad.s) {
            resolvedSource += `;import*as m$_${depIndex} from'${depLoad.b}';import{u$_ as u$_${depIndex}}from'${depLoad.s}';u$_${depIndex}(m$_${depIndex})`;
            depLoad.s = undefined;
          }
          lastIndex = statementEnd;
        }
        // import.meta
        else if (dynamicImportIndex === -2) {
          load.m = {
            url: load.r,
            resolve: metaResolve
          };
          metaHook(load.m, load.u);
          pushStringTo(start);
          resolvedSource += `importShim._r[${urlJsString(load.u)}].m`;
          lastIndex = statementEnd;
        }
        // dynamic import
        else {
          pushStringTo(statementStart + 6);
          resolvedSource += `Shim(`;
          dynamicImportEndStack.push(statementEnd - 1);
          lastIndex = start;
        }
      }

      // support progressive cycle binding updates (try statement avoids tdz errors)
      if (load.s) resolvedSource += `\n;import{u$_}from'${load.s}';try{u$_({${exports.filter(e => e.ln).map(({
        s,
        e,
        ln
      }) => `${source.slice(s, e)}:${ln}`).join(',')}})}catch(_){};\n`;
      pushStringTo(source.length);
    }
    let hasSourceURL = false;
    resolvedSource = resolvedSource.replace(sourceMapURLRegEx, (match, isMapping, url) => (hasSourceURL = !isMapping, match.replace(url, () => new URL(url, load.r))));
    if (!hasSourceURL) resolvedSource += '\n//# sourceURL=' + load.r;
    load.b = lastLoad = createBlob(resolvedSource);
    load.S = undefined;
  }

  // ; and // trailer support added for Ruby on Rails 7 source maps compatibility
  // https://github.com/guybedford/es-module-shims/issues/228
  const sourceMapURLRegEx = /\n\/\/# source(Mapping)?URL=([^\n]+)\s*((;|\/\/[^#][^\n]*)\s*)*$/;
  const jsContentType = /^(text|application)\/(x-)?javascript(;|$)/;
  const jsonContentType = /^(text|application)\/json(;|$)/;
  const cssContentType = /^(text|application)\/css(;|$)/;
  const cssUrlRegEx = /url\(\s*(?:(["'])((?:\\.|[^\n\\"'])+)\1|((?:\\.|[^\s,"'()\\])+))\s*\)/g;

  // restrict in-flight fetches to a pool of 100
  let p = [];
  let c = 0;
  function pushFetchPool() {
    if (++c > 100) return new Promise(r => p.push(r));
  }
  function popFetchPool() {
    c--;
    if (p.length) p.shift()();
  }
  async function doFetch(url, fetchOpts, parent) {
    if (enforceIntegrity && !fetchOpts.integrity) throw Error(`No integrity for ${url}${fromParent(parent)}.`);
    const poolQueue = pushFetchPool();
    if (poolQueue) await poolQueue;
    try {
      var res = await fetchHook(url, fetchOpts);
    } catch (e) {
      e.message = `Unable to fetch ${url}${fromParent(parent)} - see network log for details.\n` + e.message;
      throw e;
    } finally {
      popFetchPool();
    }
    if (!res.ok) throw Error(`${res.status} ${res.statusText} ${res.url}${fromParent(parent)}`);
    return res;
  }
  async function fetchModule(url, fetchOpts, parent) {
    const res = await doFetch(url, fetchOpts, parent);
    const contentType = res.headers.get('content-type');
    if (jsContentType.test(contentType)) return {
      r: res.url,
      s: await res.text(),
      t: 'js'
    };else if (jsonContentType.test(contentType)) return {
      r: res.url,
      s: `export default ${await res.text()}`,
      t: 'json'
    };else if (cssContentType.test(contentType)) {
      return {
        r: res.url,
        s: `var s=new CSSStyleSheet();s.replaceSync(${JSON.stringify((await res.text()).replace(cssUrlRegEx, (_match, quotes = '', relUrl1, relUrl2) => `url(${quotes}${resolveUrl(relUrl1 || relUrl2, url)}${quotes})`))});export default s;`,
        t: 'css'
      };
    } else throw Error(`Unsupported Content-Type "${contentType}" loading ${url}${fromParent(parent)}. Modules must be served with a valid MIME type like application/javascript.`);
  }
  function getOrCreateLoad(url, fetchOpts, parent, source) {
    let load = registry[url];
    if (load && !source) return load;
    load = {
      // url
      u: url,
      // response url
      r: source ? url : undefined,
      // fetchPromise
      f: undefined,
      // source
      S: undefined,
      // linkPromise
      L: undefined,
      // analysis
      a: undefined,
      // deps
      d: undefined,
      // blobUrl
      b: undefined,
      // shellUrl
      s: undefined,
      // needsShim
      n: false,
      // type
      t: null,
      // meta
      m: null
    };
    if (registry[url]) {
      let i = 0;
      while (registry[load.u + ++i]);
      load.u += i;
    }
    registry[load.u] = load;
    load.f = (async () => {
      if (!source) {
        // preload fetch options override fetch options (race)
        let t;
        ({
          r: load.r,
          s: source,
          t
        } = await (fetchCache[url] || fetchModule(url, fetchOpts, parent)));
        if (t && !shimMode) {
          if (t === 'css' && !cssModulesEnabled || t === 'json' && !jsonModulesEnabled) throw Error(`${t}-modules require <script type="esms-options">{ "polyfillEnable": ["${t}-modules"] }<${''}/script>`);
          if (t === 'css' && !supportsCssAssertions || t === 'json' && !supportsJsonAssertions) load.n = true;
        }
      }
      try {
        load.a = parse(source, load.u);
      } catch (e) {
        throwError(e);
        load.a = [[], [], false];
      }
      load.S = source;
      return load;
    })();
    load.L = load.f.then(async () => {
      let childFetchOpts = fetchOpts;
      load.d = (await Promise.all(load.a[0].map(async ({
        n,
        d
      }) => {
        if (d >= 0 && !supportsDynamicImport || d === -2 && !supportsImportMeta) load.n = true;
        if (d !== -1 || !n) return;
        const {
          r,
          b
        } = await resolve(n, load.r || load.u);
        if (b && (!supportsImportMaps || importMapSrcOrLazy)) load.n = true;
        if (d !== -1) return;
        if (skip && skip(r)) return {
          b: r
        };
        if (childFetchOpts.integrity) childFetchOpts = Object.assign({}, childFetchOpts, {
          integrity: undefined
        });
        return getOrCreateLoad(r, childFetchOpts, load.r).f;
      }))).filter(l => l);
    });
    return load;
  }
  function processScriptsAndPreloads(mapsOnly = false) {
    if (!mapsOnly) for (const link of document.querySelectorAll(shimMode ? 'link[rel=modulepreload-shim]' : 'link[rel=modulepreload]')) processPreload(link);
    for (const script of document.querySelectorAll(shimMode ? 'script[type=importmap-shim]' : 'script[type=importmap]')) processImportMap(script);
    if (!mapsOnly) for (const script of document.querySelectorAll(shimMode ? 'script[type=module-shim]' : 'script[type=module]')) processScript(script);
  }
  function getFetchOpts(script) {
    const fetchOpts = {};
    if (script.integrity) fetchOpts.integrity = script.integrity;
    if (script.referrerPolicy) fetchOpts.referrerPolicy = script.referrerPolicy;
    if (script.crossOrigin === 'use-credentials') fetchOpts.credentials = 'include';else if (script.crossOrigin === 'anonymous') fetchOpts.credentials = 'omit';else fetchOpts.credentials = 'same-origin';
    return fetchOpts;
  }
  let lastStaticLoadPromise = Promise.resolve();
  let domContentLoadedCnt = 1;
  function domContentLoadedCheck() {
    if (--domContentLoadedCnt === 0 && !noLoadEventRetriggers && (shimMode || !baselinePassthrough)) {
      document.dispatchEvent(new Event('DOMContentLoaded'));
    }
  }
  // this should always trigger because we assume es-module-shims is itself a domcontentloaded requirement
  if (hasDocument) {
    document.addEventListener('DOMContentLoaded', async () => {
      await initPromise;
      domContentLoadedCheck();
    });
  }
  let readyStateCompleteCnt = 1;
  function readyStateCompleteCheck() {
    if (--readyStateCompleteCnt === 0 && !noLoadEventRetriggers && (shimMode || !baselinePassthrough)) {
      document.dispatchEvent(new Event('readystatechange'));
    }
  }
  const hasNext = script => script.nextSibling || script.parentNode && hasNext(script.parentNode);
  const epCheck = (script, ready) => script.ep || !ready && (!script.src && !script.innerHTML || !hasNext(script)) || script.getAttribute('noshim') !== null || !(script.ep = true);
  function processImportMap(script, ready = readyStateCompleteCnt > 0) {
    if (epCheck(script, ready)) return;
    // we dont currently support multiple, external or dynamic imports maps in polyfill mode to match native
    if (script.src) {
      if (!shimMode) return;
      setImportMapSrcOrLazy();
    }
    if (acceptingImportMaps) {
      importMapPromise = importMapPromise.then(async () => {
        importMap = resolveAndComposeImportMap(script.src ? await (await doFetch(script.src, getFetchOpts(script))).json() : JSON.parse(script.innerHTML), script.src || baseUrl, importMap);
      }).catch(e => {
        console.log(e);
        if (e instanceof SyntaxError) e = new Error(`Unable to parse import map ${e.message} in: ${script.src || script.innerHTML}`);
        throwError(e);
      });
      if (!shimMode) acceptingImportMaps = false;
    }
  }
  function processScript(script, ready = readyStateCompleteCnt > 0) {
    if (epCheck(script, ready)) return;
    // does this load block readystate complete
    const isBlockingReadyScript = script.getAttribute('async') === null && readyStateCompleteCnt > 0;
    // does this load block DOMContentLoaded
    const isDomContentLoadedScript = domContentLoadedCnt > 0;
    if (isBlockingReadyScript) readyStateCompleteCnt++;
    if (isDomContentLoadedScript) domContentLoadedCnt++;
    const loadPromise = topLevelLoad(script.src || baseUrl, getFetchOpts(script), !script.src && script.innerHTML, !shimMode, isBlockingReadyScript && lastStaticLoadPromise).then(() => {
      // if the type of the script tag "module-shim", browser does not dispatch a "load" event
      // see https://github.com/guybedford/es-module-shims/issues/346
      if (shimMode) {
        script.dispatchEvent(new Event('load'));
      }
    }).catch(throwError);
    if (isBlockingReadyScript) lastStaticLoadPromise = loadPromise.then(readyStateCompleteCheck);
    if (isDomContentLoadedScript) loadPromise.then(domContentLoadedCheck);
  }
  const fetchCache = {};
  function processPreload(link) {
    if (link.ep) return;
    link.ep = true;
    if (fetchCache[link.href]) return;
    fetchCache[link.href] = fetchModule(link.href, getFetchOpts(link));
  }
})();
var esModuleShims = {};

export default esModuleShims;
