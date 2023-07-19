export default function makePostAppoitemnt(createAppointement) {
  // this class will return a postAppointemnt function that will be the controller that will handle the http requests related to creating an Appointment
  return async function postAppointemnt(httpRequest) {
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      // the body will have
      const {
        date,
        duration,
        visitType,
        visitReason,
        status,
        patient,
        professional,
      } = httpRequest.body;
      const appointment = await createAppointement({
        date,
        duration,
        visitType,
        visitReason,
        status,
        patient,
        professional,
      });
      return {
        headers,
        statusCode: 201,
        body: {
          id: appointment.getId(),
        },
      };
    } catch (e) {
      console.error(e);
      return {
        headers,
        statusCode: 400,
        body: {
          error: e.message,
        },
      };
    }
  };
}
