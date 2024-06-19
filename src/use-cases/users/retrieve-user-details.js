import { makeUser } from "../../entity/index.js";

export default function makeRetrieveUserDetails ({appointmentRepository}){
    return async function retrieveUserDetails ({id}) {
        const user = await appointmentRepository.retrieveUserById({id});
        return makeUser(user);
    }
}