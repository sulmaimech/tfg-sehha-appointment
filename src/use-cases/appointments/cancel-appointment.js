export default function makeCancelAppointment({appointmentRepository}) {
    return async function cancelAppointment({id}) {
     const appointment = await appointmentRepository.cancelAppointment({id})
    }
}