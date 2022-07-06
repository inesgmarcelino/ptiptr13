/**
 * Structure of validator
 * dictionary 
 * [ expected_size,
 * {
 *  expected_key: {type:expected_type,length:expected_length, max_len: max_length, min: min_value, max: max_value },
 * }] 

 */
module.exports = (received, expected) => {
    const expected_size = expected[0];
    const expected_values = expected[1];
    if (expected_size !== undefined && expected_size != Object.keys(received).length) return false;
    var result = true;
    for (const [key, values] of Object.entries(expected_values)) {
        if (values.type === "string" && (values.min !== undefined || values.max !== undefined)) throw new Error(key + ": expected value can't be of type 'string' and have minimum and/or maximum value.");
        if (typeof (received[key]) === "string") {
            if (values.type === "number") {
                var value = parseInt(received[key]);
                if (value === undefined) result = false;
                else if (values.max !== undefined && values.max <= value) result = false;
                else if (values.min !== undefined && values.min >= value) result = false;
            } else if(values.type === "string" && values.max_len !== undefined && received[key].length > parseInt(values.max_len)) result = false;
            if (values.length !== undefined && values.length != received[key].length) result = false;
        } else if (typeof (received[key]) !== values.type) result = false;
    }
    return result;
}