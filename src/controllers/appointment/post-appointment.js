export default function makePostAppointement ({ createNewAppointment }) {
    return async function postAppointemnt (httpRequest) {
      try {
        const headers = {
          'Content-Type': 'application/json'
        }
        const appointmentInfo = {
          specialistId: httpRequest.body.specialistId,
          userId: httpRequest.body.userId,
          slotId: httpRequest.body.slotId,
          specialityId: httpRequest.body.specialityId
        }
        const created = await createNewAppointment({
          ...appointmentInfo
        })
        return {
          statusCode: 201
        }
      } catch (e) {
        console.log(e.message)
        return {
          headers,
          statusCode: 400,
          body: {
            error: "Bad Request"
          }
        }
      }
    }
  }