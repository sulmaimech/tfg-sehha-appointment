import { makeSchedule } from "../../entity/index.js";

export default function makeUpdateSlot ({appointmentRepository}){
    return async function updateSlot({specialistId, slotId, startTime, endTime}){
        return await appointmentRepository.updateSlot({specialistId, slotId, startTime, endTime}) 
    }
}