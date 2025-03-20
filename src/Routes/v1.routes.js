const v1Router = require('express').Router();
const express = require('express');
const userRouter = require('./routes.user');
const profilePictureRouter = require('../Routes/routes.profilePicture');
const medicalEquipmentRouter = require('./routes.medicalEquipment');
const customerInfoRouter = require('./routes.customerInfo');
const rentalTransactionRouter = require('./routes.rentalTransaction');
const emergencyContactRouter = require('./routes.emergencyContact');
const hospitalRouter = require('./routes.hospital');
const corporateHealthRouter = require('./routes.corporateHealth');
const girlSafteyRouter = require('./routes.girlSaftey');
const healthCheckupPackageRouter = require('./routes.healthCheckupPackage');
const userDictonaryRouter = require('./routes.userDictonary');
const petCareFormRouter = require('./routes.petCareForm');
const ayurvedaConsultationFormRouter = require('./routes.ayurvedicConsultation');
const firstAidTrainingRouter = require('./routes.firstAidTraining');
const mentalHealthFormRouter = require('./routes.mentalHealth');
const dietCounsellingRouter = require('./routes.dietCounselling');
const childSponsorRouter = require('./routes.childSponsorData');
const childSponsorFormRouter = require('./routes.childSponsorForm');
const specialistDetailsRouter = require('./routes.specialistDetails');
const specialistFormRouter = require('./routes.specialistFormDetails');
const immunicareRouter = require('./routes.immuniCare');
const medicalEquipmentFormRouter = require('./routes.medicalEquipmentForm');
const corporatePackageRouter = require('./routes.corporatePackage');
const corporatePackageRequestRouter = require('./routes.corporatePackageRequest');
const homeHealthPackageRouter = require('./routes.homeHealthPackage');
const homeHealthPackageReqRouter = require('./routes.homeHealthPackageReq');
const careGiverFinderRouter = require('./routes.careGiverFinder');
const petCareGiverFinderRouter = require('./routes.petCareGiverFinder');
const seniorCareGiverFinderRouter = require('./routes.senorCareGiver');
const tutoringRouter = require('./routes.tutoring');
const prescriptionRouter = require('./routes.prescription');
const coachInfoRouter = require('./routes.coachInfo');
const coachSearchRouter = require('./routes.coachSearch');
const coachTimeSlotRouter = require('./routes.coachTimeSlot');
const coachAppointmentRouter = require('./routes.coachAppointment');
const reproWellCategoriesRouter = require('./routes.reproWellCategories');
const reproWellExpertRouter = require('./routes.reproWellExpert');
const reproWellFormRouter = require('./routes.reproWellForm');
const girlCareFormRouter = require('../Routes/routes.girlCare');


v1Router.use("/api/user", userRouter)
v1Router.use("/api/profile-picture", profilePictureRouter);
v1Router.use("/api/medicalequipment", medicalEquipmentRouter)
v1Router.use("/api/customer", customerInfoRouter)
v1Router.use("/api/rentaltransaction", rentalTransactionRouter)
v1Router.use("/api/emergencycontact", emergencyContactRouter)
v1Router.use("/api/hospital", hospitalRouter)
v1Router.use("/api/corporatehealth", corporateHealthRouter)
v1Router.use("/api/girlsafety", girlSafteyRouter)
v1Router.use("/api/healthpackage", healthCheckupPackageRouter)
v1Router.use("/api/userdictonary", userDictonaryRouter)
v1Router.use("/api/pet-care-form", petCareFormRouter)
v1Router.use("/api/ayurvedic-consultation-form", ayurvedaConsultationFormRouter)
v1Router.use("/api/first-aid-training", firstAidTrainingRouter)
v1Router.use("/api/mental-health", mentalHealthFormRouter)
v1Router.use("/api/diet-counselling", dietCounsellingRouter)
v1Router.use("/api/sponsor", childSponsorRouter)
v1Router.use("/api/sponsor-form", childSponsorFormRouter)
v1Router.use("/api/specialist-details", specialistDetailsRouter)
v1Router.use("/api/specialist-form", specialistFormRouter)
v1Router.use("/api/immunicare", immunicareRouter)
v1Router.use("/api/medical-equipment-form", medicalEquipmentFormRouter)
v1Router.use("/api/corporatepackage", corporatePackageRouter)
v1Router.use("/api/corporate-package-request", corporatePackageRequestRouter)
v1Router.use("/api/home-health-package", homeHealthPackageRouter)
v1Router.use("/api/home-health-package-request", homeHealthPackageReqRouter)
v1Router.use("/api/care-giver-finder", careGiverFinderRouter)
v1Router.use("/api/pet-care-giver-finder", petCareGiverFinderRouter)
v1Router.use("/api/senior-care-giver-finder", seniorCareGiverFinderRouter)
v1Router.use("/api/tutoring-care-giver-finder", tutoringRouter)
v1Router.use("/api/prescription", prescriptionRouter)
v1Router.use("/api/coach", coachSearchRouter)
v1Router.use("/api/coach-info", coachInfoRouter)
v1Router.use("/api/coach-timeslot", coachTimeSlotRouter)
v1Router.use("/api/coach-appointment", coachAppointmentRouter)
v1Router.use("/api/repro-well-categories", reproWellCategoriesRouter);
v1Router.use("/api/repro-well-experts", reproWellExpertRouter);
v1Router.use("/api/repro-well-form", reproWellFormRouter);
v1Router.use("/api/girl-care-form", girlCareFormRouter);

module.exports = v1Router;
