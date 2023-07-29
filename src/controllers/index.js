import makePostAppointment from "./post-appointment.js";
import makeUpdateAppointment from "./update-appointment.js";
import makeGetAppointment from "./get-appointemnt.js";
import {
  createAppointment,
  cancelAppointment,
  editAppointment,
  listAppointmentById,
  listAppointments,
  joinAppointment,
} from "../use-cases/index.js";

const postAppointemnt = makePostAppointment(createAppointment);
const updateAppointment = makeUpdateAppointment({
  cancelAppointment,
  editAppointment,
});
const getAppointment = makeGetAppointment({
  listAppointmentById,
  listAppointments,
});

export default Object.freeze({
  postAppointemnt,
  updateAppointment,
  getAppointment,
});

export { postAppointemnt, updateAppointment, getAppointment };
