import {createNewAppointment, addNewSpeciality} from "../use-cases/index.js";
import makePostAppointment from "./post-appointment.js";
import makePostSpeciality from "./post-speciality.js";

const postAppointment = makePostAppointment({ createNewAppointment });
const postSpeciality = makePostSpeciality({ addNewSpeciality });

const appointmentController = Object.freeze({
    postAppointment,
    postSpeciality
});

export default appointmentController;
export { postAppointment, postSpeciality };