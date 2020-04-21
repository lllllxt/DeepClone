import clone from "../src/clone.js";
class Person {
  constructor(name) {
    this.name = name;
  }
}
const man = new Person("Thod");
const sbKey = Symbol("sbb");
const obj = {
  str: "deep",
  num: 1,
  udf: undefined,
  bool: true,
  nl: null,
  syb: Symbol("lalala"),

  reg: /^a/i,
  date: new Date(),
  func: function () {
    return this.str;
  },
  obj: {
    o: {
      name: "Oliver",
    },
  },
  map: new Map([
    [
      "m",
      {
        name: "Marry",
      },
    ],
    [sbKey, 123],
  ]),
  set: new Set([man, 2, 3, 4, 5]),
  cls: new Person("tom"),
  arr: [
    sbKey,
    new Person("Foolan"),
    {
      name: "Tom",
    },
    {
      name: "Ben",
    },
  ],
  [sbKey]: "123",
  man: man,
};
const cloneObj = clone(obj);

function isObj(input) {
  const type = typeof input;
  return input !== null && (type === "object" || type === "function");
}

const tagFunction = "[object Function]";
const tagRegExp = "[object RegExp]";
const tagDate = "[object Date]";

for (const key of Object.keys(cloneObj)) {
  const item = obj[key];
  const cItem = cloneObj[key];
  const type = Object.prototype.toString.call(cItem);
  // 1类 基本数据类型  string, number, boolean, null, undefined, symbol
  if (!isObj(cItem)) {
    test("基本类型:" + type, () => {
      expect(cItem).toBe(item);
    });
  }
  // 2类 Date, RegExp
  else if ([tagDate, tagRegExp].includes(type)) {
    test(type, () => {
      expect(cItem === item).toBeFalsy();
      expect(cItem).toEqual(item);
    });
  } 
  // 特殊情况 func
  else if (type === tagFunction) {
    test(type, () => {
      expect(cItem).toBe(item);
    });
  }
  // 3类 引用数据类型
  else {
    test(type, () => {
      expect(cItem === item).toBeFalsy();
      expect(cItem).toEqual(item);
    });
  }
}
