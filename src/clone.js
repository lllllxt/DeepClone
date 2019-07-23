const tagMap = '[object Map]'
const tagSet = '[object Set]'
const tagRegExp = '[object RegExp]'
const tagDate = '[object Date]'

function isObj(input) {
    const type = typeof input
    return input !== null && (type === 'object' || type === 'function')
}

function clone(val) {
    // 1类 基本数据类型  string, number, boolean, null, undefined, symbol
    if (!isObj(val)) return val

    // 2类 Date, RegExp
    const type = Object.prototype.toString.call(val)
    if ([tagDate, tagRegExp].includes(type)) {
        return new val.constructor(val)
    }

    // 3类 引用数据类型
    if (Array.isArray(val)) {
        return val.map(v => clone(v))
    } else if (typeof val === 'function') {
        return val
    } else if (type === tagMap) {
        const _map = new Map()
        for (const item of val) {
            _map.set(item[0], clone(item[1]))
        }
        return _map
    } else if (type === tagSet) {
        const _set = new Set()
        for (const item of val) {
            _set.add(clone(item))
        }
        return _set
    } else {
        const _obj = Object.create(Object.getPrototypeOf(val))
        for (const key in val) {
            _obj[key] = clone(val[key])
        }
        // 处理使用Symbols作为属性的项目
        const _sybKeys = Object.getOwnPropertySymbols(val)
        if (_sybKeys.length > 0) {
            for (const key of _sybKeys) {
                _obj[key] = clone(val[key])
            }
        }
        return _obj
    }
}


export default clone