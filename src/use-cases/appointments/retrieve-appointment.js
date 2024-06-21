import {makeAppointment} from '../../entity/index.js'

export default function makeRetrieveAppointment({appointmentRepository}) {
    return async function retrieveAppointment(id) {
        const appointment = await appointmentRepository.retrieveAppointment(id)

        return appointment
    }
}