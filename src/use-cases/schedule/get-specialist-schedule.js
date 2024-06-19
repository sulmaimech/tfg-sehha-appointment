import { makeSchedule } from "../../entity/index.js";

export default function makeGetSpecialistSchedule ({appointmentRepository}){
    return async function getSpecialistSchedule({id, query}){

        const schedule = await appointmentRepository.getSpecialistSchedule({id, query});
        return makeSchedule(schedule);
    }
}