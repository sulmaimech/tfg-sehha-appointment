export default function buildMakeSpecialist({makeSpeciality}) {
  return function makeSpecialist({
    id,
    firstName,
    lastName,
    specialities,
    email,
    phone,
  }) {
    if(!id) {
      throw new Error("Specialist must have an id.");
    }
    if (!firstName) {
      throw new Error("Specialist must have a first name.");
    }
  
    if (!lastName) {
      throw new Error("Specialist must have a last name.");
    }

    if (!specialities) {
      throw new Error("Specialist must have a specialities.");
    }

    if (!email) {
      throw new Error("Specialist must have an email.");
    }

    if (!phone) {
      throw new Error("Specialist must have a phone number.");
    }

    specialities = specialities.map((speciality) => makeSpeciality(speciality));

    return Object.freeze({
      getId: ()=> id,
      getFirstName: () => firstName,
      getLastName: () => lastName,
      getSpecialities: () => specialities,
      getEmail: () => email,
      getPhone: () => phone,
    });
  };
}
