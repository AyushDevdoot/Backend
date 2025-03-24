const patientInfoDto = (data)=> {
   const {
    name,
    phone,
    address,
    urgency,
    prescriptionUrl
   } = data;

   return {
    name,
    phone,
    address,
    urgency,
    prescriptionUrl
   }

}

module.exports =  {patientInfoDto}