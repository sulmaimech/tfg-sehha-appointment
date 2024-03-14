import appointmentRepository from '../repositories/index.js'
import makeCreateNewAppointment from './create-new-appointment.js'
import makeAddNewSpeciality from "./specialities/add-new-medical-speciality.js"
import makeListAllSpecialities from "./specialities/list-all-medical-specialities.js"
import makeRemoveSpeciality from './specialities/remove-a-medical-speciality.js'
import makeGetSpecialityDetails from './specialities/get-speciality-details.js'
import makeUpdateSpeciality from './specialities/update-medical-speciality.js'
import makeRetrieveUserDetails from './users/retrieve-user-details.js'
import makeRetrieveAllSpecialists from './specialist/retrieve-medical-specialists.js'
import makeRetrieveSpecialistDetails from './specialist/retrieve-specialist-details.js'
import makeGetSpecialistSchedule from './schedule/get-specialist-schedule.js'
import makeAddNewTimeSlots from './schedule/add-new-time-slots.js'
import makeUpdateSlot from './schedule/update-slot.js'
import makeRemoveTimeSlot from './schedule/remove-time-slot.js'

const addNewSpeciality = makeAddNewSpeciality({appointmentRepository})
const createNewAppointment = makeCreateNewAppointment({appointmentRepository})
const listAllSpecialities = makeListAllSpecialities({appointmentRepository})
const removeSpeciality = makeRemoveSpeciality({appointmentRepository})
const getSpecialityDetails = makeGetSpecialityDetails({appointmentRepository})
const updateSpeciality = makeUpdateSpeciality({appointmentRepository})
const retrieveUserDetails = makeRetrieveUserDetails({appointmentRepository})
const retrieveAllSpecialists = makeRetrieveAllSpecialists({appointmentRepository})
const retrieveSpecialistDetails = makeRetrieveSpecialistDetails({appointmentRepository})
const getSpecialistSchedule = makeGetSpecialistSchedule({appointmentRepository})
const addNewTimeSlots = makeAddNewTimeSlots({appointmentRepository})
const updateSlot = makeUpdateSlot({appointmentRepository})
const removeTimeSlot = makeRemoveTimeSlot({appointmentRepository})

const appointmentService = Object.freeze({
    createNewAppointment, 
    addNewSpeciality,
    listAllSpecialities,
    removeSpeciality, 
    getSpecialityDetails,
    updateSpeciality,
    retrieveUserDetails,
    retrieveAllSpecialists,
    retrieveSpecialistDetails,
    getSpecialistSchedule, 
    addNewTimeSlots, 
    updateSlot, 
    removeTimeSlot
}); 

export default appointmentService;

export {
    createNewAppointment, 
    addNewSpeciality, 
    listAllSpecialities, 
    removeSpeciality, 
    getSpecialityDetails, 
    updateSpeciality, 
    retrieveUserDetails, 
    retrieveAllSpecialists, 
    retrieveSpecialistDetails,
    getSpecialistSchedule, 
    addNewTimeSlots, 
    updateSlot, 
    removeTimeSlot
    };
