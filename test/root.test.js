const test = require("./reqTest")

module.exports = null

test(
    "college name is required",
    "/",
    "error",
    "College name is required"
)

test(
    "college not found",
    "?college=potato",
    "error", "College not found"
)

test(
    "college field empty",
    "?college=",
    "error", "College name is required"
)

test(
    "all three costs",
    "?college=Arizona%20State%20University",
    "cost", 23065
)

test(
    "w/o rab",
    "?college=Arizona%20State%20University&include_rab=false",
    "cost", 11224
)

test(
    "non-bool rab",
    "?college=Arizona%20State%20University&include_rab=fale",
    "cost", 23065
)

test(
    "out of state",
    "?college=Furman%20University",
    "cost", 63542
)

test(
    "rab zero",
    "?college=Goodwin%20College",
    "cost", 20798
)
