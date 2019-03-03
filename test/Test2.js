module.exports = class {
    constructor (mod_name) {
        this.mod_name = mod_name
        this.tests = []
    }
    equal (name, actual, expected) {
        this.tests.push({type: "equal", name, actual, expected})
        return this
    }
    equiv (name, actual, expected) {
        this.tests.push({type: "equiv", name, actual, expected})
        return this
    }
    assert (name, statement) {
        this.tests.push({type: "assert", name, statement})
        return this
    }
    run () {
        let c = 0
        for (const test of this.tests) {
            try {
                switch (test.type) {
                    case "equal":
                        if (test.actual !== test.expected) throw "not equal"
                        break
                    case "equiv":
                        if (!equiv(test.actual, test.expected)) throw "not equiv"
                        break
                    case "assert":
                        if (!test.statement) throw "not true"
                }

            } catch (e) {
                if (!c) console.log(this.mod_name)
                console.log(" - " + test.name)
                switch (e) {
                    case "not equal":
                        console.log(
                            "  actual:",
                            "\x1b[31m" + test.actual + "\x1b[0m"
                        )
                        console.log(
                            "  expected:",
                            test.expected
                        )
                        break
                    case "not equiv":
                        for (const key of Object.keys(test.expected)) {
                            if (test.actual[key] !== test.expected[key]) {
                                console.log(
                                    "  " + key + ":",
                                    "\x1b[31m" + test.actual[key] + "\x1b[0m",
                                    test.expected[key]
                                )
                            }
                        }
                        for (const key of Object.keys(test.actual)) {
                            if (!(key in test.expected)) {
                                console.log(
                                    "  " + key + ":",
                                    "\x1b[31m" + test.actual[key] + "\x1b[0m"
                                )
                            }
                        }
                        break
                    case "not true":
                        console.log("  \x1b[31m" + "false" + "\x1b[0m")
                        break
                }
                c++
            }
        }
        if (!c) console.log(
            this.mod_name + ":",
            "\x1b[32mclear\x1b[0m"
        )
    }
}

function equiv (a, b) {
    const a_keys = Object.keys(a);
    const b_keys = Object.keys(b);
    if (a_keys.length !== b_keys.length) return false
    for (const key of a_keys) {
        if (a[key] !== b[key]) return false
    }
    return true
}
