const crypto = require('crypto');
const hashService = require('./hash-service');

const smsSid = process.env.SMS_SID || "ACb17e7287f232907c3bc81632847e0828";
const smsAuthToken = process.env.SMS_AUTH_TOKEN || "b68fae3d4549ba25b8f3d0b7083614cc";
const twilio = require('twilio')(smsSid, smsAuthToken, {
    lazyLoading: true,
});

class OtpService {
    async generateOtp() {
        const otp = crypto.randomInt(1000, 9999);
        return otp;
    }

    async sendBySms(phone, otp) {
        console.log("otpGenerated", otp)
        return await twilio.messages.create({
            to: phone,
            from: process.env.SMS_FROM_NUMBER || +19202894782,
            body: `Your codershouse OTP is ${otp}`,
        });
    }

    verifyOtp(hashedOtp, data) {
        let computedHash = hashService.hashOtp(data);
        return computedHash === hashedOtp;
    }
}

module.exports = new OtpService();
