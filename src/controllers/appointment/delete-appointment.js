export default function makeDeleteAppointment({cancelAppointment}){
    return async function deleteAppointment(httpRequest){
        const headers = {
            'Content-Type': 'application/json'
        }
        try{
            const deletedAppointment = await cancelAppointment({id: httpRequest.params.id})
            return {
                headers,
                statusCode: 200,
                body: deletedAppointment
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