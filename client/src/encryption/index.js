import SimpleCrypto from 'simple-crypto-js';

let getRandomString = () => {
    let now = new Date();
    now = now.getTime();
    return Math.floor(2147483648 * Math.random()).toString(36) + Math.abs(Math.floor(2147483648 * Math.random()) ^ now).toString(36);
};

let random_seed = getRandomString();
let crypto = new SimpleCrypto(random_seed);

export let encrypt = function (text, cipher_seed) {

    crypto.setSecret(cipher_seed);
    try {
        return crypto.encrypt(text);
    } catch (e) {
        return text;
    }
};

export let decrypt = function (text, cipher_seed) {

    crypto.setSecret(cipher_seed);
    try {
        return crypto.decrypt(text);
    } catch (e) {
        return text;
    }
};
