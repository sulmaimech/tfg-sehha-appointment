import { makeUser } from "../../entity/index.js";

export default function makeCreateUser({ appointmentRepository }) {
    return async function createUser(userData ) {
        if (!userData) throw new Error('User data is required');
        const { id,
            firstName,
            lastName,
            dateOfBirth,
            gender,
            email,
            phone } = userData;

        const user = makeUser({ id, firstName, lastName, dateOfBirth, gender, email, phone });
        await appointmentRepository.createUser({ id, firstName, lastName, dateOfBirth, gender, email, phone });
    }
}