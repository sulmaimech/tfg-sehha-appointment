import makePostAppointment from "./post-appointment.js";
import {
  createAppointment,
  cancelAppointment,
  editAppointment,
  listAppointment,
  joinAppointment,
} from "../use-cases/index.js";

const postAppointemnt = makePostAppointment(createAppointment);

export default Object.freeze({ postAppointemnt });

export { postAppointemnt };
