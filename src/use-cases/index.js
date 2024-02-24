import appointmentRepository from '../repositories/index.js'
import makeCreateNewAppointment from './create-new-appointment.js'

const createNewAppointment = makeCreateNewAppointment(appointmentRepository)

const appointmentService = Object.freeze({
    createNewAppointment, 
}); 

export default appointmentService;

export {createNewAppointment};
