export default function makeGetAppointments({listAllAppointments}){
    return async function getAppointments(httpRequest){
        // http request can be used later to create 
        const headers = {
            'Content-Type': 'application/json'
        };
        try {
            const slots = await listAllAppointments(httpRequest.query);
            const appointmentsResponse = slots.map(slot => {
                return {
                    id: slot.getAppointment().getId(),
                    user: {
                        id: slot.getAppointment().getUser().getId(),
                        firstName: slot.getAppointment().getUser().getFirstName(),
                        lastName: slot.getAppointment().getUser().getLastName()
                    }
                    ,
                    specialist: {
                        id: slot.getAppointment().getSpecialist().getId(),
                        firstName: slot.getAppointment().getSpecialist().getFirstName(),
                        lastName: slot.getAppointment().getSpecialist().getLastName()
                    },
                    status: slot.getAppointment().getStatus(),
                    speciality: {
                        id: slot.getAppointment().getSpeciality().getId(),
                        name: slot.getAppointment().getSpeciality().getName(),
                        description: slot.getAppointment().getSpeciality().getDescription()
                    },
                    // use the slot startTiem to return the date of the appointment (day and time)
                    date: slot.getStartTime().toLocaleString(),
                    // use the start time and end time to calculate the duration in hoursand minutes
                    duration: `${Math.floor((slot.getEndTime() - slot.getStartTime()) / (1000 * 60 * 60))}h ${Math.floor((slot.getEndTime() - slot.getStartTime()) / (1000 * 60)) % 60}m`,
                    joinUrl: slot.getAppointment().getJoinUrl()
                    
                }
            });
            return {
                headers,
                statusCode: 200,
                body: appointmentsResponse
            };
        } catch (e) {
            console.log(e.message)
            return {
                headers,
                statusCode: 400,
                body: {
                    error: "Bad Request"
                }
            };
        }
    }
}