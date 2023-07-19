export default function buildMakeAppointment({
  makePatient,
  makeProfessional,
}) {
  return function makeAppointment({
    id,
    date,
    duration,
    visitType,
    visitReason,
    status,
    patient,
    professional,
    videoAppointment,
  }) {
    if (!id) throw new Error("Appointment must have an id");
    if (!date) throw new Error("Appointment must have a date");
    if (!duration) throw new Error("Appointment must have a duration");
    if (!visitType) throw new Error("Appointment must have a visit type");
    if (!visitReason) throw new Error("Appointment must have a visit reason");
    if (!status) throw new Error("Appointment must have a status");
    if (!patient) throw new Error("Appointment must have a patient");
    if (!professional) throw new Error("Appointment must have a professional");
    if (!videoAppointment)
      throw new Error("Appointment must have a video appointment");
    return Object.freeze({
      getId: () => id,
      getDate: () => date,
      getDuration: () => duration,
      getVisitType: () => visitType,
      getVisitReason: () => visitReason,
      getStatus: () => status,
      getPatient: () => patient,
      getProfessional: () => professional,
      getVideoAppointment: () => videoAppointment,
    });
  };
}
