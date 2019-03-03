const Test = require("./Test.js")

new Test("prime")
.equal(
    "these are equal",
    1,
    1
).equal(
    "these aren't equal",
    0,
    1
).equiv(
    "these are equiv",
    {dog: 2, cat: "meow"},
    {cat: "meow", dog: 2}
).equiv(
    "these aren't equiv",
    {dog: 2, cat: "meow", cow: "moo"},
    {cat: "woof", dog: 2, fish: "glub"}
).assert(
    "this is true",
    true
).assert(
    "this is false",
    false
).run()
