let fs = require("fs")


function lexer (file) {
    let tokens = [],
        state = "plain",
        stack = "",
        row = 1,
        column = 0,
        hold_row,
        hold_column,
        text = fs.readFileSync(file, "utf-8").split("")
    while (text.length) {
        let char = text.shift()
        column += 1
        if (state === "plain") {
            if (char === " ") {
                if (stack) tokens.push(stack)
                stack = ""
            } else if (char === "(" || char === ")") {
                if (stack) tokens.push(stack)
                tokens.push(char)
                stack = ""
            } else if (char === '"') {
                if (stack) tokens.push(stack)
                stack = ""
                state = "quote"
                hold_row = row
                hold_column = column
            } else if (char === "\n") {
                if (stack) tokens.push(stack)
                tokens.push(char)
                stack = ""
                row += 1
                column = 0
            } else {
                stack += char
            }
        } else if (state === "quote") {
            if (char === '"') {
                tokens.push('"' + stack + '"')
                stack = ""
                state = "plain"
            } else if (char === "\\") {
                state = "backslash"
            } else if (char === "\n") {
                row += 1
                column = 0
                stack += char
            } else {
                stack += char
            }
        } else if (state === "backslash") {
            if (char === "\\") {
                stack += "\\"
                state = "quote"
            } else if (char === '"') {
                stack += '"'
                state = "quote"
            } else {
                throw "error: lexer, weird backslash, (" + row + ", " + column - 1 + ")"
            }
        }
    }
    if (state === "quote") {
        throw "error: lexer, open quote, (" + hold_row + ", " + hold_column + ")"
    }
    return tokens
}

console.log(lexer("./raw.txt"))
