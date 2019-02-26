const fs = require("fs")
const parse = require("csv-parse")

// college name -> cost object
// string -> {in_state: float, out_state: float, rab: float} || null
module.exports = async college => {
    console.log(__filename)
    const stream = fs.createReadStream("./api/database/college_costs.csv")
        .pipe(parse())

    let data = null
    let line = 0
    for await (const row of stream) {
        if (row[0] === college && line) {
            data = {
                in_state: parseFloat(row[1]) || 0,
                out_state: parseFloat(row[2]) || 0,
                rab: parseFloat(row[3]) || 0
            }
            stream.destroy()
        }
        line++
    }
    return data
}
