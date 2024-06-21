export default function makeGetAppointment({retrieveAppointment}){
    return async function getAppointment(httpRequest){
        const headers = {
            'Content-Type': 'application/json'
        }
        try{
            const appointment = await retrieveAppointment({id: httpRequest.params.id})
            return {
                headers,
                statusCode: 200,
                body: appointment
            }
        }catch(e){
            console.log(e.message)
            return {
                headers,
                statusCode: 400,
                body: {
                    error: e.message
                }
            }
        }
    }
}