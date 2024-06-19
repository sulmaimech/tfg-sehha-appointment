export default function buildMakeScheduleSlot({makeAppointment}) {
    return function makeScheduleSlot({
      slotId,
      startTime,
      endTime, 
      appointment
    }) {

      if (!slotId) {
        throw new Error('ScheduleSlot must have a slotId');
      }
      if (!startTime) {
        throw new Error('ScheduleSlot must have a startTime');
      }
      if (!endTime) {
        throw new Error('ScheduleSlot must have a endTime');
      }
      if (appointment) {
        const speciality = {id: appointment.speciality.id, name: appointment.speciality.name, description: appointment.speciality.description}
        appointment = makeAppointment({id: appointment.id, status: appointment.status, joinUrl: appointment.joinUrl, user: appointment.user, specialist: appointment.specialist, speciality: speciality}) ;
      }

      const schedule = Object.freeze({
        getSlotId: () => slotId,
        getStartTime: () => startTime,
        getEndTime: () => endTime,
        getAppointment: () => appointment,
      });

      return schedule;
    }
}