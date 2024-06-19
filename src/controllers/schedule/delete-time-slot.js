export default function makeDeleteTimeSlot({removeTimeSlot}){
    return async function deleteTimeSlot(httpRequest){
        const headers = {
            'Content-Type': 'application/json'
        }
        try{
            const {id} = httpRequest.params
            const slotId = httpRequest.body.slotId
            const message = await removeTimeSlot({specialistId: id, slotId})
            return {
                headers,
                statusCode: 200,
                body: message
            }
        }
        catch(e){
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