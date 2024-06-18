import appointmentRepository from '../repositories/index.js'
import { publishAppointmentCreated } from '../frameworks/rabbitmq/publish.js';
import makeAddNewSpeciality from "./specialities/add-new-medical-speciality.js"
import makeListAllSpecialities from "./specialities/list-all-medical-specialities.js"
import makeRemoveSpeciality from './specialities/remove-a-medical-speciality.js'
import makeGetSpecialityDetails from './specialities/get-speciality-details.js'
import makeUpdateSpeciality from './specialities/update-medical-speciality.js'
import makeRetrieveUserDetails from './users/retrieve-user-details.js'
import makeRetrieveAllUsers from './users/retrieveAllUsers.js'
import makeCreateUser from './users/create-user.js'
import makeRetrieveAllSpecialists from './specialist/retrieve-medical-specialists.js'
import makeRetrieveSpecialistDetails from './specialist/retrieve-specialist-details.js'
import makeCreateSpecialist from './specialist/create-specialist.js'
import makeGetSpecialistSchedule from './schedule/get-specialist-schedule.js'
import makeAddNewTimeSlots from './schedule/add-new-time-slots.js'
import makeUpdateSlot from './schedule/update-slot.js'
import makeRemoveTimeSlot from './schedule/remove-time-slot.js'
import makeCreateNewAppointment from './appointments/create-new-appointment.js'
import makeCancelAppointment from './appointments/cancel-appointment.js'
import makeListAllAppointments from './appointments/list-all-appointments.js'


const addNewSpeciality = makeAddNewSpeciality({appointmentRepository})
const createNewAppointment = makeCreateNewAppointment({appointmentRepository, publishAppointmentCreated})
const listAllSpecialities = makeListAllSpecialities({appointmentRepository})
const removeSpeciality = makeRemoveSpeciality({appointmentRepository})
const getSpecialityDetails = makeGetSpecialityDetails({appointmentRepository})
const updateSpeciality = makeUpdateSpeciality({appointmentRepository})
const retrieveUserDetails = makeRetrieveUserDetails({appointmentRepository})
const retrieveAllUsers = makeRetrieveAllUsers({appointmentRepository})
const createUser = makeCreateUser({appointmentRepository})
const retrieveAllSpecialists = makeRetrieveAllSpecialists({appointmentRepository})
const createSpecialist = makeCreateSpecialist({appointmentRepository})
const retrieveSpecialistDetails = makeRetrieveSpecialistDetails({appointmentRepository})
const getSpecialistSchedule = makeGetSpecialistSchedule({appointmentRepository})
const addNewTimeSlots = makeAddNewTimeSlots({appointmentRepository})
const updateSlot = makeUpdateSlot({appointmentRepository})
const removeTimeSlot = makeRemoveTimeSlot({appointmentRepository})
const cancelAppointment = makeCancelAppointment({appointmentRepository})
const listAllAppointments = makeListAllAppointments({appointmentRepository})

const appointmentService = Object.freeze({
    createNewAppointment, 
    addNewSpeciality,
    listAllSpecialities,
    removeSpeciality, 
    getSpecialityDetails,
    updateSpeciality,
    retrieveUserDetails,
    retrieveAllUsers,
    createUser,
    retrieveAllSpecialists,
    retrieveSpecialistDetails,
    createSpecialist,
    getSpecialistSchedule, 
    addNewTimeSlots, 
    updateSlot, 
    removeTimeSlot,
    cancelAppointment,
    listAllAppointments,
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
    retrieveAllUsers,
    createUser,
    retrieveAllSpecialists, 
    retrieveSpecialistDetails,
    createSpecialist,
    getSpecialistSchedule, 
    addNewTimeSlots, 
    updateSlot, 
    removeTimeSlot, 
    cancelAppointment,
    listAllAppointments
    };
