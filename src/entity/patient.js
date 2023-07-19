export default function buildMakePatient() {
  return function makePatient({
    id,
    firstName,
    firstLastName,
    secondLastName,
    dateOfBirth,
    gender,
    email,
    password,
    phone,
    address,
    city,
    state,
    zip,
    country,
  }) {
    if (!id) throw new Error("Patient must have an id");
    if (!firstName) throw new Error("Patient must have a name");
    if (!firstLastName) throw new Error("Professional must have a last name.");
    if (!dateOfBirth) throw new Error("Patient must have a date of birth");
    if (!gender) throw new Error("Patient must have a gender");
    if (!email) throw new Error("Patient must have an email");
    if (!password) throw new Error("Patient must have a password");
    if (!phone) throw new Error("Patient must have a phone");
    if (!address) throw new Error("Patient must have an address");
    if (!city) throw new Error("Patient must have a city");
    if (!state) throw new Error("Patient must have a state");
    if (!zip) throw new Error("Patient must have a zip");
    if (!country) throw new Error("Patient must have a country");
    return Object.freeze({
      getId: () => id,
      getFirstName: () => firstName,
      getFirstLastName: () => firstLastName,
      getSecondLastName: () => secondLastName,
      getDateOfBirth: () => dateOfBirth,
      getGender: () => gender,
      getEmail: () => email,
      getPassword: () => password,
      getPhone: () => phone,
      getAddress: () => address,
      getCity: () => city,
      getState: () => state,
      getZip: () => zip,
      getCountry: () => country,
    });
  };
}
