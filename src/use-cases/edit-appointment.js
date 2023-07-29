export default function makeEditAppointment(appointmentRepository) {
  return async (appointmentId, Appointmentields) =>
    await appointmentRepository.edit(appointmentId, Appointmentields);
}
