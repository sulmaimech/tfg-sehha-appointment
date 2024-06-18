export default function buildMakeAppointment({
  makeUser,
  makeSpecialist,
  makeSpeciality
}) {
  return function makeAppointment({
    id,
    status,
    user,
    specialist,
    speciality,
    description,
    joinUrl  
  }) {
    if (!id) throw new Error("Appointment must have an id");
    if(!speciality) throw new Error ("Appointment must have a speciality");
    if (!status) throw new Error("Appointment must have a status");
    if (!user) throw new Error("Appointment must have a user");
    if (!specialist) throw new Error("Appointment must have a specialist");
    if (!joinUrl)
      joinUrl

    user = makeUser(user);
    specialist = makeSpecialist(specialist);
    speciality = makeSpeciality(speciality);

    return Object.freeze({
      getId: () => id,
      getStatus: () => status,
      getUser: () => user,
      getSpecialist: () => specialist,
      getSpeciality: () => speciality,
      getJoinUrl: () => joinUrl,
      getDescription: () => description,
    });
  };
}
