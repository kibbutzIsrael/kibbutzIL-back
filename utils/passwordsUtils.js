const crypto = require('crypto')

exports.generateRandomPassword = () => {
    const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz';
    const upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const specialCharacters = '!@#$%&';
    const allCharacters = lowerCaseLetters + upperCaseLetters + numbers + specialCharacters;

    let password = '';
    for (let i = 0; i < 10; i++) {
        const randomIndex = crypto.randomInt(0, allCharacters.length);
        password += allCharacters[randomIndex];
    }

    return password;
}