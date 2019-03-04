const getCollegeData = require("../database/getCollegeData")
const Router = require("koa-router")

module.exports = new Router()

// Get college cost
//     instate if available, no rab iff include_rab = false
// query = {college: str, include_rab: bool}
// body = {cost: float || error: str}
.get("/", async ctx => {
    try {
        if (!ctx.query.college) {
            throw "College name is required"
        }
        const costs = await getCollegeData(ctx.query.college)
        if (!costs) {
            throw "College not found"
        }

        const tuition_cost = costs.in_state || costs.out_state
        const rab_cost = ctx.query.include_rab !== "false" && costs.rab
        ctx.body = {cost: tuition_cost + rab_cost}

    } catch (error) {
        ctx.body = {error}
    }
})
