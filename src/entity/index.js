import buildMakePatient from "./patient.js";
import buildMakeProfessional from "./professional.js";
import buildMakeAppointment from "./appointment.js";

const makePatient = buildMakePatient();
const makeProfessional = buildMakeProfessional();
const makeAppointment = buildMakeAppointment({ makePatient, makeProfessional });

export default makeAppointment;
