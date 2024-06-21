import {createNewAppointment, 
    addNewSpeciality, 
    listAllSpecialities, 
    removeSpeciality, 
    getSpecialityDetails, 
    updateSpeciality, 
    retrieveUserDetails, 
    retrieveAllUsers,
    retrieveAllSpecialists, 
    retrieveSpecialistDetails, 
    getSpecialistSchedule, 
    addNewTimeSlots, 
    updateSlot, 
    removeTimeSlot,
    cancelAppointment, 
    listAllAppointments, 
    retrieveAppointment
} from "../use-cases/index.js";

import makePostSpeciality from "./speciality/post-speciality.js";
import makeGetSpecialities from "./speciality/get-specialities.js";
import makeDeleteSpeciality from "./speciality/delete-speciality.js";
import makeGetSpecialityById from "./speciality/get-speciality-by-id.js";
import makeUpdateASpeciality from "./speciality/update-speciality.js";
import makeGetUser from "./user/get-user.js";
import makeGetUsers from "./user/get-users.js";
import makeGetSpecialists from "./specialist/getSpecialists.js";
import makeGetSpecialistById from "./specialist/getSpecialistById.js";
import makeGetSpecialistSchedule from "./schedule/getSpecialistSchedule.js";
import makePostNewTimeSlots from "./schedule/post-new-time-slots.js";
import makePutScheduleSlot from "./schedule/put-schedule-slot.js";
import makeDeleteTimeSlot from "./schedule/delete-time-slot.js";
import makePostAppointment from "./appointment/post-appointment.js";
import makeDeleteAppointment from "./appointment/delete-appointment.js";
import makeGetAppointments from "./appointment/get-appointments.js";
import makeGetAppointment from "./appointment/get-appointment.js";

const postAppointment = makePostAppointment({ createNewAppointment });
const postSpeciality = makePostSpeciality({ addNewSpeciality });
const getSpecialities = makeGetSpecialities({ listAllSpecialities });
const deleteSpeciality = makeDeleteSpeciality({ removeSpeciality });
const getSpecialityById = makeGetSpecialityById({ getSpecialityDetails})
const updateASpeciality = makeUpdateASpeciality({ updateSpeciality })
const getUser = makeGetUser({retrieveUserDetails})
const getUsers = makeGetUsers({retrieveAllUsers})
const getSpecialists = makeGetSpecialists({retrieveAllSpecialists})
const getSpecialistById = makeGetSpecialistById({retrieveSpecialistDetails})
const getSchedule = makeGetSpecialistSchedule({getSpecialistSchedule})
const postNewTimeSlots = makePostNewTimeSlots({addNewTimeSlots})
const putScheduleSlot = makePutScheduleSlot({updateSlot})
const deleteTimeSlot = makeDeleteTimeSlot({removeTimeSlot})
const deleteAppointment = makeDeleteAppointment({cancelAppointment})
const getAppointments = makeGetAppointments({listAllAppointments})
const getAppointment = makeGetAppointment({retrieveAppointment})

const appointmentController = Object.freeze({
    postAppointment,
    postSpeciality, 
    getSpecialities,
    deleteSpeciality,
    getSpecialityById, 
    updateASpeciality,
    getUser, 
    getUsers,
    getSpecialists, 
    getSpecialistById,
    getSchedule, 
    postNewTimeSlots, 
    putScheduleSlot, 
    deleteTimeSlot, 
    deleteAppointment, 
    getAppointments, 
    getAppointment
});

export default appointmentController;
export { postAppointment, 
    postSpeciality, 
    getSpecialities, 
    deleteSpeciality, 
    getSpecialityById, 
    updateASpeciality, 
    getUser, 
    getUsers,
    getSpecialists, 
    getSpecialistById,
    getSchedule, 
    postNewTimeSlots, 
    putScheduleSlot, 
    deleteTimeSlot, 
    deleteAppointment, 
    getAppointments, 
    getAppointment

};