const http = require("http")

module.exports = function httpTest ({name, url, expected, field}) {
    http.get(
        {
            host: "localhost:3000",
            path: url
            // query: {
            //     college: "Arizona State University"
            // }
        }, res => {
        let str = ""
        res.on('data', d => {str += d})
        res.on('end', () => {
            console.log(str)
            if (JSON.parse(str)[field] !== expected) {
                console.log(name, "\x1b[31m" + str + "\x1b[0m")
            } else {
                console.log(name, "\x1b[32mclear\x1b[0m")
            }
        })
    }).on("error", (err) => {
        console.log("Error: " + err.message)
    })
}
