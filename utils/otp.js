


// CREATE RANDOM NUMBER FOR OTP MOBILE
exports.generateOtp = (otp_length)=>{

    let digits = '0123456789';
    let OTP =""
    for (let i = 0; i < otp_length; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}

