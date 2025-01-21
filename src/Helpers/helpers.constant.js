const saltRounds = 10;
const html = (otp) => {
    return (`
            <div style="font-family: Arial, sans-serif; line-height: 1.5;">
                <h2 style="color: #4CAF50;">Your OTP Code</h2>
                <p>Dear User,</p>
                <p>Use the following One-Time Password (OTP) to complete your verification process:</p>
                <h1 style="background: #f3f3f3; padding: 10px; text-align: center; border-radius: 5px; color: #333;">${otp}</h1>
                <p>This OTP is valid for the next 10 minutes. Please do not share it with anyone.</p>
                <p>If you did not request this, please ignore this email.</p>
                <p>Thank you,<br>Your Service Team</p>
            </div>
        `)
}

const specialistEnums = [
    "emergencymedicalservices",
    "mentalhealthsupport",
    "firstaidtraining",
    "healthmonitoring",
    "pediatrics",
    "geriatrics",
    "oncology",
    "cardiology",
    "obstetricsgynecology",
    "infectiousdiseases",
    "parentalcare",
    "birthcontrol",
    "sexualhealth",
    "fertility",
    "mensturalhealth",
    "postpartum",
    "acne",
    "skincare",
    "dermatitis",
    "skinrejuvenation",
    "psoriasis",
    "hairloss",
    "nutrition",
]
module.exports = {
    saltRounds,
    html,
    specialistEnums
};