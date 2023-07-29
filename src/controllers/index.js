import makePostAppointment from "./post-appointment.js";
import makeUpdateAppointment from "./update-appointment.js";
import makeGetAppointment from "./get-appointemnt.js";
import makeDeleteAppointment from "./delete-appointment.js";
import {
  createAppointment,
  cancelAppointment,
  editAppointment,
  listAppointmentById,
  listAppointments,
  deleteAppointmentById,
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
const deleteAppointment = makeDeleteAppointment({ deleteAppointmentById });

export default Object.freeze({
  postAppointemnt,
  updateAppointment,
  getAppointment,
  deleteAppointment,
});

export {
  postAppointemnt,
  updateAppointment,
  getAppointment,
  deleteAppointment,
};
