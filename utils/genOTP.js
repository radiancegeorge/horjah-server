const genOTP = (number = 4) => {
    let OTP = '';
    for( let x = 0; x < number; x++){
        const number = Math.floor(Math.random(1) * 10);
        OTP+=number
    }
    return OTP;
}

module.exports = genOTP;