import {makeSpeciality} from '../../entity/index.js'

export default function makeUpdateSpeciality ({appointmentRepository}){
    return async function updateSpeciality({id, name, description}){
        const updatedSpeciality = await appointmentRepository.updateSpeciality({id, name, description})
        return makeSpeciality(updatedSpeciality);
    }
}