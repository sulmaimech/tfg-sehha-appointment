import {makeSpecialist} from '../../entity/index.js'

export default function makeRetrieveSpecialistDetails({appointmentRepository}) {
    return async function retrieveSpecialistDetails({id}) {
        // retrieve details of a specialist using their ID
        const specialist = await appointmentRepository.retrieveSpecialistById({id});
        const specialistResponse = makeSpecialist(specialist);
        return specialistResponse;
        }
}