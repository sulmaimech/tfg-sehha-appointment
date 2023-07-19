import makeAppointment from "../entity/index.js";
export default function makeListAppointments({
  appointmentsRepository,
  filter,
}) {
  return async function listAppointments() {
    const appointments = await appointmentsRepository.findAll();
    return appointments.map((appointment) => makeAppointment(appointment));
  };
}
