import * as CryptoJS from 'crypto-js'

export default function (pwd = '', salt = 'e6751eadaefc7af085fa0f9e047cfce6d2cce0cb95706ed5f9a0422b28f64407') {
    const hash = CryptoJS.PBKDF2(pwd, salt, { keySize: 512 / 128, hasher: CryptoJS.algo.SHA512, iterations: 100 })
    return hash.toString(CryptoJS.enc.Hex)
}
