export default function buildMakeUser() {
  return function makeUser({
    id,
    firstName,
    lastName,
    dateOfBirth,
    gender,
    email,
    phone,
  }) {
    if (!id) throw new Error("User must have an id");
    if (!firstName) throw new Error("User must have a name");
    if (!lastName) throw new Error("Professional must have a last name.");
    if (!dateOfBirth) throw new Error("User must have a date of birth");
    if (!gender) throw new Error("User must have a gender");
    if (!email) throw new Error("User must have an email");
    if (!phone) throw new Error("User must have a phone");


    return Object.freeze({
      getId: () => id,
      getFirstName: () => firstName,
      getLastName: () => lastName,
      getDateOfBirth: () => dateOfBirth,
      getGender: () => gender,
      getEmail: () => email,
      getPhone: () => phone,
    });
  };
}
