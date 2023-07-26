import makePostAppointment from "./post-appointment.js";
import makeUpdateAppointment from "./update-appointment.js";
import {
  createAppointment,
  cancelAppointment,
  editAppointment,
  listAppointment,
  joinAppointment,
} from "../use-cases/index.js";

const postAppointemnt = makePostAppointment(createAppointment);
const updateAppointment = makeUpdateAppointment({
  cancelAppointment,
  editAppointment,
});
const getAppointment = makeGetAppointment(listAppointment);

export default Object.freeze({
  postAppointemnt,
  updateAppointment,
  getAppointment,
});

export { postAppointemnt, updateAppointment, getAppointment };
