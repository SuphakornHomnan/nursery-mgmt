export const convertCode = (value, type) => {
    // check initial state (undefine)
    if (!value) {
        return null
    }

    if (value > 0 && value < 10) {
        return type + '000' + value.toString()
    } else if (value >= 10 && value < 100){
        return type + '00' + value.toString()
    } else if(value >= 100 && value < 1000){
        return type + '0' + value.toString()
    } else {
        return type + value.toString()
    }
}