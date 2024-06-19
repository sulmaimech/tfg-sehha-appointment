export default function makeGetSpecialistSchedule({ getSpecialistSchedule }) {
    return async function getSchedule(httpRequest) {
        const headers = {
            'Content-Type': 'application/json'
        }
        try {
            const specialistSchedule = await getSpecialistSchedule({ id: httpRequest.params.id, query: httpRequest.query })
            return {
                headers,
                statusCode: 200,
                body: {
                    specialist: {
                        id: specialistSchedule.getSpecialist().getId(),
                        name: `${specialistSchedule.getSpecialist().getFirstName()} ${specialistSchedule.getSpecialist().getLastName()}`,
                        specialities: specialistSchedule.getSpecialist().getSpecialities().map(speciality => {
                            return {

                                id: speciality.getId(),
                                name: speciality.getName(),
                                description: speciality.getDescription()

                            }
                        })
                    },
                    slots: specialistSchedule.getSlots().map(slot => {
                        return {
                            id: slot.getSlotId(),
                            // the date is the start date in the format YYYY-MM-DD
                            date: slot.getStartTime().toISOString().split('T')[0],
                            // the time is the start time in the format HH:MM:SS
                            time: slot.getStartTime().toISOString().split('T')[1].slice(0, 8),
                            // duration is the difference between the start and end time
                            duration: `${Math.floor((slot.getEndTime() - slot.getStartTime()) / 3600000).toString().padStart(2, '0')}:${Math.floor(((slot.getEndTime() - slot.getStartTime()) % 3600000) / 60000).toString().padStart(2, '0')}`, // `${Math.floor((slot.getEndTime() - slot.getStartTime()) / 3600000).toString().padStart(2, '0')}:${Math.floor(((slot.getEndTime() - slot.getStartTime()) % 3600000) / 60000).toString().padStart(2, '0')}`;

                            appointment: slot.getAppointment() ? {
                                id: slot.getAppointment().getId(),
                                status: slot.getAppointment().getStatus(),
                                joinUrl: slot.getAppointment().getJoinUrl(),
                                user: slot.getAppointment().getUser() ? {
                                    id: slot.getAppointment().getUser().getId(),
                                    firstName: slot.getAppointment().getUser().getFirstName(),
                                    lastName: slot.getAppointment().getUser().getLastName(),
                                    dateOfBirth: slot.getAppointment().getUser().getDateOfBirth(),
                                    gender: slot.getAppointment().getUser().getGender(),
                                    phone: slot.getAppointment().getUser().getPhone(),
                                    email: slot.getAppointment().getUser().getEmail()
                                } : null,
                                speciality: slot.getAppointment().getSpeciality() ? {
                                    id: slot.getAppointment().getSpeciality().getId(),
                                    name: slot.getAppointment().getSpeciality().getName(),
                                    description: slot.getAppointment().getSpeciality().getDescription()
                                } : null,
                            } : null,
                        }
                    })
                }
            }
        } catch (e) {
            console.log(e.message)
            return {
                headers,
                statusCode: 400,
                body: {
                    error: "Bad Request"
                }
            }
        }
    }
}