/**
 * Structure of validator
 * dictionary 
 * [ expected_size,
 * {
 *  expected_key: {type:expected_type,length:expected_length},
 * }] 
 */
module.exports = (received,expected) => {
    const expected_size = expected[0];
    const expected_values = expected[1];
    if(expected_size != Object.keys(received).length) return false;
    var result = true;
    for(const [key,value] of Object.entries(expected_values)){
        if(typeof(received[key]) === "string") { //se o valor for string entao 
            if(value.type == "number" && isNaN(received[key])){ //se o valor esperado for numero  
                result = false;
            }
            if(value.length !== undefined && value.length != received[key].length){ //se o tamanho do valor for diferent do esperado
                result = false;
            }
        } else if(typeof(received[key]) !== value.type) {
                result = false;
        }  
    }
    return result;
}