import makeCreateAppointment from "./create-appointment.js";
import makeCancelAppointment from "./cancel-appointment.js";
import makeEditAppointment from "./edit-appointment.js";
import makeListAppointmentById from "./list-appointment-by-id.js";
import makeListAppointments from "./list-appointments.js";
import makeJoinAppointment from "./join-appointment.js";
import makeAppointmentRepository from "../repositories/appointment-repository.js";

const type = "mongodb";
const appointmentRepository = makeAppointmentRepository({ type });

const createAppointment = makeCreateAppointment(appointmentRepository);
const cancelAppointment = makeCancelAppointment(appointmentRepository);
const editAppointment = makeEditAppointment(appointmentRepository);
const listAppointmentById = makeListAppointmentById(appointmentRepository);
const listAppointments = makeListAppointments(appointmentRepository);
const joinAppointment = makeJoinAppointment(appointmentRepository);

const appointemntService = Object.freeze({
  createAppointment,
  cancelAppointment,
  editAppointment,
  listAppointmentById,
  listAppointments,
  joinAppointment,
});

export default appointemntService;

export {
  createAppointment,
  cancelAppointment,
  editAppointment,
  listAppointmentById,
  listAppointments,
  joinAppointment,
};
