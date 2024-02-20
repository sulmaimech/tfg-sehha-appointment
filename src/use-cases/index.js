import appointmentRepository from '../repositories/index.js'
import makeCreateNewAppointment from './create-new-appointment.js'

const createNewAppointment = makeCreateNewAppointment(appointmentRepository)

export default { createNewAppointment}
