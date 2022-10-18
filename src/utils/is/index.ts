const toString = Object.prototype.toString

export function is(val: unknown, type: string) {
    return toString.call(val) === `[object ${type}]`
}

export function isDef<T = unknown>(val?: T): val is T {
    return typeof val !== 'undefined'
}

export function isUnDef<T = unknown>(val?: T): val is T {
    return !isDef(val)
}

export function isObject(val: any): val is Record<any, any> {
    return val !== null && is(val, 'Object')
}

export function isEmpty<T = unknown>(val: T): val is T {
    if (isArray(val) || isString(val)) {
        return val.length === 0
    }

    if (val instanceof Map || val instanceof Set) {
        return val.size === 0
    }

    if (isObject(val)) {
        return Object.keys(val).length === 0
    }

    return false
}

export function isDate(val: unknown): val is Date {
    return is(val, 'Date')
}

export function isNull(val: unknown): val is null {
    return val === null
}

export function isNullAndUnDef(val: unknown): val is null | undefined {
    return isUnDef(val) && isNull(val)
}

export function isNullOrUnDef(val: unknown): val is null | undefined {
    return isUnDef(val) || isNull(val)
}

export function isNumber(val: unknown): val is number {
    return is(val, 'Number')
}

export function isPromise<T = any>(val: unknown): val is Promise<T> {
    return is(val, 'Promise') && isObject(val) && isFunction(val.then) && isFunction(val.catch)
}

export function isString(val: unknown): val is string {
    return is(val, 'String')
}

export function isFunction(val: unknown): val is Function {
    return typeof val === 'function'
}

export function isBoolean(val: unknown): val is boolean {
    return is(val, 'Boolean')
}

export function isRegExp(val: unknown): val is RegExp {
    return is(val, 'RegExp')
}

export function isArray(val: any): val is Array<any> {
    return val && Array.isArray(val)
}

export function isWindow(val: any): val is Window {
    return typeof window !== 'undefined' && is(val, 'Window')
}

export function isElement(val: unknown): val is Element {
    return isObject(val) && !!val.tagName
}

export const isServer = typeof window === 'undefined'

export const isClient = !isServer

/** url链接正则 */
export function isUrl<T>(value: T): boolean {
    const reg =
        // eslint-disable-next-line no-useless-escape
        /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/
    // @ts-expect-error
    return reg.test(value)
}

/** 手机号码正则 */
export function isPhone<T>(value: T): boolean {
    const reg =
        /^[1](([3][0-9])|([4][0,1,4-9])|([5][0-3,5-9])|([6][2,5,6,7])|([7][0-8])|([8][0-9])|([9][0-3,5-9]))[0-9]{8}$/
    // @ts-expect-error
    return reg.test(value)
}

/** 邮箱正则 */
export function isEmail<T>(value: T): boolean {
    const reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
    // @ts-expect-error
    return reg.test(value)
}

/** 密码检查 **/

export function isPassword(value: string): boolean {
    let num = 0
    //校验数字
    let rule1 = /\d+/
    //校验小写字母
    let rule2 = /[a-z]+/
    //校验大写字母
    let rule3 = /[A-Z]+/
    //校验特殊字符
    let rule4 = /(?=.*[\W_])/
    //校验长度1
    let rule5 = /^.{8,16}$/
    let flag1 = rule1.test(value)
    let flag2 = rule2.test(value)
    let flag3 = rule3.test(value)
    let flag4 = rule4.test(value)
    let flag5 = rule5.test(value)
    if (flag1) {
        num = num + 1
    }
    if (flag2) {
        num = num + 1
    }
    if (flag3) {
        num = num + 1
    }
    if (flag4) {
        num = num + 1
    }
    if (!(num > 2 && flag5)) {
        return false
    } else {
        return true
    }
}
