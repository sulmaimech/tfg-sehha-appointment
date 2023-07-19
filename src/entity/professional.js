export default function buildMakeProfessional() {
  return function makeProfessional({
    firstName,
    firstLastName,
    secondLastName,
    specialization,
    email,
    password,
    phone,
  }) {
    if (!firstName) {
      throw new Error("Professional must have a first name.");
    }

    if (!firstLastName) {
      throw new Error("Professional must have a last name.");
    }

    if (!specialization) {
      throw new Error("Professional must have a specialization.");
    }

    if (!email) {
      throw new Error("Professional must have an email.");
    }

    if (!password) {
      throw new Error("Professional must have a password.");
    }

    if (!phone) {
      throw new Error("Professional must have a phone number.");
    }

    return Object.freeze({
      getFirstName: () => firstName,
      getFirstLastName: () => FirstLastName,
      getSecondLastName: () => SecondLastName,
      getSpecialization: () => specialization,
      getEmail: () => email,
      getPassword: () => password,
      getPhone: () => phone,
    });
  };
}
