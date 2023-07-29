import makeAppointment from "../entity/index.js";
export default function makeJoinAppointment(appointmentRepository) {
  // validate the appointment access information and join it using the URL provided by the appointment
  return async function joinAppointment({ appointmentId }) {
    const appointment = await appointmentRepository.findById(appointmentId);
    if (!appointment) {
      throw new Error("Appointment not found");
    }
    const newAppointment = makeAppointment({
      ...appointment,
    });
    return newAppointment;
  };
}
