export default function makeCancelAppointment(appointmentRepository) {
  return async function cancelAppointment(appointmentId) {
    // first make sure that the appointment exists and then cancel it
    // const appointment = await appointmentRepository.findById(appointmentId);
    // if (!appointment) {
    //   throw new Error("Appointment not found");
    //   return;
    // }
    return await appointmentRepository.cancel(appointmentId);
  };
}
