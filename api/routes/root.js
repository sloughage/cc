const getCollegeData = require("../database/getCollegeData")
const Router = require("koa-router")

module.exports = new Router()
.get("/", async ctx => {
    try {

        if (!ctx.query.college) throw "Error: College name is required"

        // standardize query
        // true by default, false iff explicitly false
        ctx.query.include_rab = !("include_rab" in ctx.query) || ctx.query.include_rab !== "false"

        // returns costs from csv as cost object (null if not found)
        const data = await getCollegeData(ctx.query.college)

        if (!data) throw "Error: College not found"

        // in-state used if available
        const tuition_cost = data.in_state || data.out_state

        // 0 iff query false
        const rab_cost = ctx.query.include_rab && data.rab

        ctx.body = {cost: tuition_cost + rab_cost}

    } catch (error) {

        ctx.body = {error}

    }
})
