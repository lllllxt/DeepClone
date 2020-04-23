# DeepClone

深拷贝, 支持基本数据类型(string, number, bigint, boolean, null, undefined, symbol), 以及(Date, RegExp, Array, Object, Map, Set, Class)

https://lllllxt.github.io/DeepClone/

## 使用方法

### 通过npm安装
```
npm i @lllllxt/deep-clone -S
```

```
import clone from '@lllllxt/deep-clone'

const clone = request('@lllllxt/deep-clone')

clone({a: 1, b: {c: 2}}) // => {a: 1, b: {c: 2}}
```

### 通过```<script>```标签引用
[deep-clone.min.js](https://github.com/lllllxt/DeepClone/blob/master/deep-clone.min.js)

此方法是向window对象中注册一个 ```clone``` 对象


## 其他
欢迎PR或提交issues :smiley:

## License
This project is licensed under the MIT License
