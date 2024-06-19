import {makeSpeciality} from '../../entity/index.js'

export default function makeListAllSpecialities({appointmentRepository}) {
    return async function listAllSpecialities() {
        const specialities = await appointmentRepository.listAllSpecialities()
        const specialityResponse = specialities.map(speciality => {
            return makeSpeciality(speciality)
        })
        return specialityResponse
    }
}