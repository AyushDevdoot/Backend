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

const forgothtml = (link)=>{
  return (`
      <div style="font-family: Arial, sans-serif; line-height: 1.5;">
                <h2 style="color: #4CAF50;">Forgot Your Password ?</h2>
                <p>Dear User,</p>
                <p>Press the following Link to Reset you Password. </p>
                <h1 style="background: #f3f3f3; padding: 10px; text-align: center; border-radius: 5px; color: #333;">${link}</h1>
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

const trainingTypeEnums = [
    "Basic First Aid", 
    "CPR & AED Training", 
    "Workplace First Aid",
    "Pediatric First Aid", 
    "Sports First Aid", 
    "Emergency First Aid",
    "Advanced First Aid", 
    "Wilderness First Aid", 
    "Mental Health First Aid",
    "Disaster Response First Aid"
]

const previousTrainingEnums = [
        "Basic First Aid", 
        "CPR & AED Training", 
        "Workplace First Aid",
        "Pediatric First Aid", 
        "Sports First Aid", 
        "Emergency First Aid",
        "Advanced First Aid", 
        "Wilderness First Aid", 
        "Mental Health First Aid",
        "Disaster Response First Aid", 
        "Fire Safety and First Aid",
        "First Responder Training", 
        "Community First Aid Training",
        "Roadside Emergency First Aid", 
        "Other (Specify)"
    ]

module.exports = {
    saltRounds,
    html,
    specialistEnums,
    trainingTypeEnums,
    previousTrainingEnums,
    forgothtml
};