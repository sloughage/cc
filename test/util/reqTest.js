const request = require('request');

module.exports = function (name, url, field, expected) {
    request(
        'http://localhost:3000' + url,
        (err, res, body) => {
            if (JSON.parse(body)[field] === expected) {
                console.log(name, "\x1b[32mclear\x1b[0m")
            } else {
                console.log(name, "\x1b[31m" + body + "\x1b[0m")
            }
        }
    )
}
