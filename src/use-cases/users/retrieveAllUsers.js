import { makeUser } from "../../entity/index.js";

export default function makeRetrieveAllUsers ({appointmentRepository}){
    return async function retrieveAllUsers ({id, query}) {
        const users = await appointmentRepository.retrieveAllUsers({ query});

        const userArray = users.map(user => {
            return makeUser(user);
        });

        return userArray;
    }
}