export default function buildMakeAppointment({
  makePatient,
  makeProfessional,
  makeSpeciality
}) {
  return function makeAppointment({
    id,
    speciality,
    status,
    patient,
    professional,
    videoAppointment,
  }) {
    if (!id) throw new Error("Appointment must have an id");
    if(!speciality) throw new Error ("Appointment must have a specialities");
    if (!status) throw new Error("Appointment must have a status");
    if (!patient) throw new Error("Appointment must have a patient");
    if (!professional) throw new Error("Appointment must have a professional");
    if (!videoAppointment)
      throw new Error("Appointment must have a video appointment");

    patient = makePatient(patient);
    professional = makeProfessional(professional);
    speciality = makeSpeciality(speciality);

    return Object.freeze({
      getId: () => id,
      getStatus: () => status,
      getPatient: () => patient,
      getProfessional: () => professional,
      getVideoAppointment: () => videoAppointment,
    });
  };
}
