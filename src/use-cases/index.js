import makeCreateAppointment from "./create-appointment.js";
import makeCancelAppointment from "./cancel-appointment.js";
import makeEditAppointment from "./edit-appointment.js";
import makeListAppointment from "./list-appointment.js";
import makeJoinAppointment from "./join-appointment.js";
import makeAppointmentRepository from "../repositories/appointment-repository.js";

const type = "mongodb";
const appointmentRepository = makeAppointmentRepository({ type });

const createAppointment = makeCreateAppointment({ appointmentRepository });
const cancelAppointment = makeCancelAppointment({ appointmentRepository });
const editAppointment = makeEditAppointment({ appointmentRepository });
const listAppointment = makeListAppointment({ appointmentRepository });
const joinAppointment = makeJoinAppointment({ appointmentRepository });

const appointemntService = Object.freeze({
  createAppointment,
  cancelAppointment,
  editAppointment,
  listAppointment,
  joinAppointment,
});

export default appointemntService;

export {
  createAppointment,
  cancelAppointment,
  editAppointment,
  listAppointment,
  joinAppointment,
};
