export default function makePostNewTimeSlots({addNewTimeSlots}){
    return async function postNewTimeSlots(httpRequest){
        const headers = {
            'Content-Type': 'application/json'
        }
        try{
            const slots = httpRequest.body
            const specialistId = httpRequest.params.id
            const schedule = await addNewTimeSlots({specialistId, slots})
            return {
                headers,
                statusCode: 201,
                body: {
                    specialist: {
                        id: schedule.getSpecialist().getId(),
                        name: `${schedule.getSpecialist().getFirstName()} ${schedule.getSpecialist().getLastName()}`,
                        specialities: schedule.getSpecialist().getSpecialities().map(speciality =>{ return {
    
                                id: speciality.getId(),
                                name: speciality.getName(),
                                description: speciality.getDescription()
            
                        }})
                    },
                    slots: schedule.getSlots().map(slot =>{
                        return {
                            id: slot.getSlotId(),
                            startTime: slot.getStartTime(),
                            endTime: slot.getEndTime(), 
                            appointment: slot.getAppointment() ? slot.getAppointment().getId() : null, 
                        }
                    }) 
                }
            }
        }catch(e){
            console.log(e.message)
            return {
                headers,
                statusCode: 400,
                body: {
                    error: e.message
                }
            }
        }
    }
}