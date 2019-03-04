## College Costs

**input:**
    localhost:3000/
    queries
        college - name of college
            case sensitive string
            required - error: "College name is required"
            if not found - error: "College not found"
        include_rab - should room and board costs be included?
            default = true
            false iff "false"

**output:**
    response body will be either
        {cost: float}
        {error: string}
