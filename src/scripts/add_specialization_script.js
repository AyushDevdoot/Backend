const mongoose = require('mongoose');
const SpecialistCategoriesModel = require("../Models/models.specialistCategories");

const Counter = require("../Models/models.counterForAll");

require('dotenv').config('../../'); 
const mongoUri = process.env.MONGODB_URL;
console.log(mongoUri);
const specializations = [
    "Ayurveda Consultant",
    "Dermatologist Consultant",
    "Holistic Wellness Virtual Coach",
    "Mental Health Support Coach",
    "Parenting Wellness Coach",
    "Reproductive Health Coach",
    "Sleep Wellness Coach",
    "Health & Fitness Coach",
    "Work-Life Balance Coach",
    "Women’s Health Coach",
    "Rural Health Coach",
    "Workplace Stress Coach",
    "Addiction Recovery Coach",
    "Therapeutic",
    "Disability Support Coach",
    "Post-Surgery Recovery Coach",
    "Telehealth Navigator Coach",
    "Relationship and Couples Coach",
    "Burnout Recovery Coach",
    "Detox and Clean Eating Coach",
    "Respiratory Health Coach",
    "Cancer Recovery Coach",
    "Weight Management and Nutrition Coach",
    "Yoga and Meditation Coach",
    "Cardiovascular Health Coach",
    "Diabetes Management Coach",
    "Gut Health Coach",
    "Skin and Beauty Wellness Coach",
    "Chronic Pain Management Coach",
    "Sports Performance Coach",
    "Hormonal Health Coach",
    "Arthritis and Joint Health Coach",
    "Palliative Care Support Coach",
    "Grief and Loss Recovery Coach",
    "Pre and Post-Natal Coach",
    "Elderly Care and Wellness Coach",
    "Kidney Health Coach",
    "Cholesterol and Heart Health Coach",
    "Energy and Fatigue Management Coach",
    "Lifestyle Transformation Coach",
    "Disease Prevention Coach",
    "Social Wellness Coach",
    "Kids Heath Coach"
];

// Function to process specialization
const formatSpecialization = (specialization) => {
    let formatted = specialization.replaceAll(' ','-');
    return formatted;
}

const addSpecializationsToDb = async () => {
    try {
        await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

        for (let specialization of specializations) {
            const formattedSpecialization = formatSpecialization(specialization);

            const exists = await SpecialistCategoriesModel.findOne({ categoryName: formattedSpecialization });
            if (!exists) {
                let counter = await Counter.findOneAndUpdate(
                    { counter_for: 'specialistcategories' }, // Look for the counter for specialist categories
                    { $inc: { counter_value: 1 } }, 
                    { upsert: true, new: true, runValidators: true } // Create the counter if it doesn't exist
                    );

                const newSpecialization = new SpecialistCategoriesModel({
                    autoId: counter.counter_value, 
                    categoryName: formattedSpecialization,
                    isActive: true // You can adjust this depending on your requirements
                });

                await newSpecialization.save();
                console.log(`Added specialization: ${formattedSpecialization}`);
            } else {
                console.log(`Specialization already exists: ${formattedSpecialization}`);
            }
        }

    } catch (error) {
        console.error("Error:", error);
    }
    await mongoose.disconnect();
    return
}

addSpecializationsToDb();
