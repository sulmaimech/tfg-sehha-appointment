export default function makeDeleteSpeciality({removeSpeciality}){
    return async function deleteSpeciality(httpRequest){
        const headers = {
            'Content-Type': 'application/json'
        }
        try{
            const deletedSpeciality = await removeSpeciality({id: httpRequest.params.id})
            return {
                headers,
                statusCode: 200,
                body: deletedSpeciality
            }
        }catch(e){
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