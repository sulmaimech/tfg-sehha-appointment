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
    joinUrl  
  }) {
    console.log("@makeAppointment id", id);
    console.log("@makeAppointment speciality", speciality);
    console.log("@makeAppointment status", status);
    console.log("@makeAppointment user", user);
    console.log("@makeAppointment specialist", specialist);
    // specialist specialities
    console.log("@makeAppointment specialist specialities", specialist.specialities);
    console.log("@makeAppointment joinUrl", joinUrl);

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
    });
  };
}
