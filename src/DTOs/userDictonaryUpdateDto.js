const updateUserDictonaryDto = (data) => {
    const { userId, medicalRecords, lastVaccinationDate, lastCheckup, allergies, currentMedication, emergencyContact } = data;
    return {
        userId,
        medicalRecords,
        lastVaccinationDate,
        lastCheckup,
        allergies,
        currentMedication,
        emergencyContact
    }
}
module.exports = {
    updateUserDictonaryDto
};