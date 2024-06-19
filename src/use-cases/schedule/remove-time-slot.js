export default function makeRemoveTimeSlot ({appointmentRepository}){
    return async function removeTimeSlot({specialistId, slotId}){
        return appointmentRepository.removeTimeSlot({specialistId, slotId});
    }
}