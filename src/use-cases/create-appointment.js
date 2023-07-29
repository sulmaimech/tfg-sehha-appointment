import makeAppointment from "../entity/index.js";

export default function makeCreateAppointment(appointmentRepository) {
  return async function createAppointment({
    date,
    duration,
    visitType,
    visitReason,
    status,
    patient,
    professional,
  }) {
    // TODO: validate the patient and professional
    // TODO: Get the video session from the video MS. It will be tokenized so it is unique to the patient
    const videoAppointment = "url";

    const appointment = await appointmentRepository.create({
      date,
      duration,
      visitType,
      visitReason,
      status,
      patient,
      professional,
      videoAppointment,
    });
    console.log(appointment);

    return makeAppointment(appointment);
  };
}
