import {makeSpecialist} from '../../entity/index.js'

export default function makeRetrieveAllSpecialists({appointmentRepository}) {
    return async function retrieveAllSpecialists({query}) {
        const specialists = await appointmentRepository.retrieveAllSpecialists({query})
        const specialistResponse = specialists.map(specialist => {
            return makeSpecialist(specialist)
        })
        return specialistResponse
    }
}