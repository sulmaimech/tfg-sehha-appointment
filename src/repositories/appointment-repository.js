import makeMongodbRepository from "./appointment-mongodb-repository.js";

export default function makeAppointmentRepository({ type, repo }) {
  // return a repository in terms of the type, if the type is "mongodb", "rest-api"...
  if (type === "mongodb") {
    // create mongoose connection
    repo()
    const repository = makeMongodbRepository();
    return repository;
  } else if (type === "rest-api") {
    // Define Rest API repo
  }
}
