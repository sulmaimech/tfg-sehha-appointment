export default function makePutScheduleSlot({updateSlot}){
    return async function putScheduleSlot(httpRequest){
        const headers = {
            'Content-Type': 'application/json'
        };
        try{
            const {slotId, startTime, endTime} = httpRequest.body;
            const specialistId = httpRequest.params.id;
            const scheduleSlot = await updateSlot({specialistId, slotId, startTime, endTime});
            return {
                headers,
                statusCode: 200,
                body: scheduleSlot
            };
        }catch(e){
            return {
                headers,
                statusCode: 400,
                body: {
                    error: e.message
                }
            };
        }
    };
}