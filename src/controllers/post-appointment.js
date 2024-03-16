export default function makePostAppointement ({ createNewAppointment }) {
    return async function postAppointemnt (httpRequest) {
      try {
        console.log(httpRequest)
        const source = {}
        const appointmentInfo = {
          specialistId: httpRequest.body.specialistId,
          userId: httpRequest.body.userId,
          slotId: httpRequest.body.slotId,
          specialityid: httpRequest.body.specialityId
        }
        const created = await createNewAppointment({
          ...appointmentInfo
        })
        return {
          statusCode: 201
        }
      } catch (e) {
        // TODO: Error logging
        console.log(e)
  
        return {
          headers: {
            'Content-Type': 'application/json'
          },
          statusCode: 400,
          body: {
            error: e.message
          }
        }
      }
    }
  }