const crypto = require('crypto-js')
var key = crypto.enc.Hex.parse("000102030405060708090a0b0c0d0e0f");

var iv = crypto.enc.Hex.parse("101112131415161718191a1b1c1d1e1f");

// var encrypted = CryptoJS.AES.encrypt("Message", key, { iv: iv });

module.exports = {
    AES: {
        en: (text) => {
            return crypto.TripleDES.encrypt(`${text}`, key, { iv: iv }).ciphertext.toString(crypto.enc.Hex);
        },
        de: (secret) => {
            // 需要将Hex 转Base64 才能正确解码
            let s = crypto.enc.Hex.parse(secret);
            let ss = crypto.enc.Base64.stringify(s)
            return crypto.TripleDES.decrypt(ss, key, { iv: iv }).toString(crypto.enc.Utf8);
        }
    }
}