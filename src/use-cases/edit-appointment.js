import makeAppointment from "../entity/index.js";
export default function makeEditAppointment({ appointmentRepository }) {
  return async function editAppointment(appointmentInfo) {
    const appointment = makeAppointment(appointmentInfo);
    return await appointmentRepository.update(appointment);
  };
}
