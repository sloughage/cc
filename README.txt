College Costs

Input
    localhost:3000/
    query.college - name of college
        case sensitive string
        required - error: "College name is required"
        if not found - error: "College not found"
    query.include_rab - should room and board costs be included?
        default = true
        false iff "false"

Output
    response body will be either
        {cost: float}
        {error: string}
