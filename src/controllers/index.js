import {createNewAppointment} from "../use-cases/index.js";
import makePostAppointment from "./post-appointment.js";

const postAppointment = makePostAppointment({ createNewAppointment });

const appointmentController = Object.freeze({
    postAppointment,
});

export default appointmentController;
export { postAppointment };