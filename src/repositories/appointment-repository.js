import makeMongodbRepository from "./appointment-mongodb-repository.js";

export default function makeAppointmentRepository({ type }) {
  // return a repository in terms of the type, if the type is "mongodb", "rest-api"...
  if (type === "mongodb") {
    return makeMongodbRepository();
  }
}
