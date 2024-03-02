import appointmentRepository from '../repositories/index.js'
import makeCreateNewAppointment from './create-new-appointment.js'
import makeAddNewSpeciality from "./specialities/add-new-medical-speciality.js"

console.log(`repo: ${appointmentRepository}`)
const addNewSpeciality = makeAddNewSpeciality({appointmentRepository})
const createNewAppointment = makeCreateNewAppointment({appointmentRepository})


const appointmentService = Object.freeze({
    createNewAppointment, 
    addNewSpeciality,
}); 

export default appointmentService;

export {createNewAppointment, addNewSpeciality};
