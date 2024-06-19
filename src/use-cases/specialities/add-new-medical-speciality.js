import {makeSpeciality} from '../../entity/index.js'

export default function makeAddNewSpeciality({appointmentRepository}) {
    return async function addNewSpeciality({name, description}) {
        // add speciality
        const specialityResponse = await appointmentRepository.addSpeciality({name, description})
        const speciality = makeSpeciality(specialityResponse)
        return speciality
        
    }
}