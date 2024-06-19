import {makeAppointment} from '../../entity/index.js'
import { makeScheduleSlot } from '../../entity/index.js'

export default function makeListAllAppointments({appointmentRepository}) {
    return async function listAllAppointments(query) {
        const slots = await appointmentRepository.listAllAppointments(query)
        const slotsResponse = slots ? slots.map(slot => {
            return makeScheduleSlot({slotId: slot.id, ...slot})
        }) : []
        return slotsResponse
    }
}