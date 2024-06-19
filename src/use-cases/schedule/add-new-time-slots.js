import { makeSchedule } from "../../entity/index.js";

export default function makeAddNewTimeSlots ({appointmentRepository}){
    return async function addNewTimeSlots ({specialistId, slots}){

        const schedule = await appointmentRepository.addNewTimeSlots({specialistId , slots});
        return makeSchedule(schedule);
    }
}