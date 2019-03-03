const Test = require("./Test")
const getCollegeData = require("../api/database/getCollegeData")

module.exports = new Test("getCollegeData")
.aqual(
    "not a college",
    (async () => await getCollegeData("cow")),
    null
).aqual(
    "header",
    (async () => await getCollegeData("College")),
    null
).aquiv(
    "all three",
    (async () => await getCollegeData("Arizona State University")),
    {in_state: 11224, out_state: 28467, rab: 11841}
).aquiv(
    "missing in_state",
    (async () => await getCollegeData("Furman University")),
    {in_state: 0, out_state: 50282, rab: 13260}
).aquiv(
    "missing out_state",
    (async () => await getCollegeData("Gallaudet University")),
    {in_state: 17220, out_state: 0, rab: 14294}
).aquiv(
    "no rab",
    (async () => await getCollegeData("Goodwin College")),
    {in_state: 20798, out_state: 0, rab: 0}
)
