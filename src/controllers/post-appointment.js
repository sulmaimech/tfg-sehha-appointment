export default function makePostAppointement ({ createNewAppointment }) {
    return async function postComment (httpRequest) {
      try {
        const { source = {}, ...appointmentInfo } = httpRequest.body
        source.ip = httpRequest.ip
        source.browser = httpRequest.headers['User-Agent']
        if (httpRequest.headers['Referer']) {
          source.referrer = httpRequest.headers['Referer']
        }
        const created = await createNewAppointment({
          ...appointmentInfo,
          source
        })
        return {
          headers: {
            'Content-Type': 'application/json',
            'Last-Modified': new Date(posted.modifiedOn).toUTCString()
          },
          statusCode: 201,
          body: { created }
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