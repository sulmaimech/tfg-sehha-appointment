import { makeSpeciality } from '../../entity/index.js'

export default function makeGetSpecialityDetails({ appointmentRepository }) {
    return async function getSpecialityDetails({ id }) {
        const speciality = await appointmentRepository.getSpecialityDetails({ id })

        const specialityResponse = makeSpeciality(speciality)

        return specialityResponse
    }
}