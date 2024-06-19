import { makeSpecialist } from "../../entity/index.js";

export default function makeCreateSpecialist({ appointmentRepository }) {
    return async function createUser(userData ) {
        if (!userData) throw new Error('User data is required');
        const { id,
            firstName,
            lastName,
            email,
            phone, 
            specialities
         } = userData;

        await appointmentRepository.createSpecialist({ 
            id,
            firstName,
            lastName,
            email,
            phone, 
            specialities
        });
    }
}