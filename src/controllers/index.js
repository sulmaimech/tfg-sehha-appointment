import createNewAppointment from "../use-cases/index.js";
import makePostAppointment from "./post-appointment.js";

const postAppointment = makePostAppointment({ createNewAppointment });

export default { postAppointment};