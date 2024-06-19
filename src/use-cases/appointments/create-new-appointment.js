import { makeAppointment } from "../../entity/index.js";

export default function makeCreateNewAppointment ({ appointmentRepository, publishAppointmentCreated }) {
  return async function createNewAppointment ({ userId, specialistId, specialityId, slotId }) {
    const appointment = await appointmentRepository.createAppointment({ userId, specialistId, specialityId, slotId });

    // Publicar mensaje en RabbitMQ
    await publishAppointmentCreated({
      appointmentId: appointment.id,
      userId: appointment.userId,
      specialistId: appointment.specialistId,
    });

    return appointment;
  }
}
