const mongoose = require('mongoose');
const SpecialistCategoriesModel = require("../Models/models.specialistCategories");

const Counter = require("../Models/models.counterForAll");


mongoose
  .connect(mongoUri, {
  })
  .then(async () => {
    console.log('Connected To Db');

        const resetCounter = await Counter.findOneAndUpdate(
            { counter_for: 'specialistcategories' }, // Look for the counter for specialist categories
            { $set: { counter_value: 0 } }, // Reset the counter value to 0
            { upsert: true, new: true } // Create the counter if it doesn't exist
        );
     console.log(resetCounter);

        // Remove all records from the SpecialistCategoriesModel collection
        const deleteSpecializations = await SpecialistCategoriesModel.deleteMany({});
     console.log(deleteSpecializations);
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Specializations list
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
    "Pre- and Post-Natal Coach",
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
    // Remove 'Coach' and trim any extra spaces
    let formatted = specialization.replace(/\s*Coach$/, '').trim();

    // Replace spaces with hyphens
    formatted = formatted.replace(/\s+/g, '-');

    return formatted;
}

console.log(formatSpecialization("Ayurveda Consultant"))

// Function to add specializations to DB
const addSpecializationsToDb = async () => {
    try {
        // Connect to MongoDB (Make sure MongoDB is running)
        await mongoose.connect('mongodb://localhost:27017/your-db-name', { useNewUrlParser: true, useUnifiedTopology: true });

        for (let specialization of specializations) {
            const formattedSpecialization = formatSpecialization(specialization);

            // Check if the specialization already exists in the DB
            const exists = await Specialization.findOne({ specialization: formattedSpecialization });

            if (!exists) {
                // Create a new document if the specialization doesn't exist
                const newSpecialization = new Specialization({
                    specialization: formattedSpecialization,
                    isActive: true // You can adjust this depending on your requirements
                });

                // Save to the database
                await newSpecialization.save();
                console.log(`Added specialization: ${formattedSpecialization}`);
            } else {
                console.log(`Specialization already exists: ${formattedSpecialization}`);
            }
        }

        console.log("All specializations processed.");
        mongoose.disconnect(); // Disconnect after the task is done
    } catch (error) {
        console.error("Error:", error);
    }
}

