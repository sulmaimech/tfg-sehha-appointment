export default function makePostSpeciality({addNewSpeciality}){
    return async function postSpeciality(httpRequest){
        const headers = {
            'Content-Type': 'application/json'
        }
        try {
            const specialityInfo = {name: httpRequest.body.name, description: httpRequest.body.description}
            const speciality = await addNewSpeciality({...specialityInfo})
            return {
                headers,
                statusCode: 200,
                body: {
                    id: speciality.getId(), 
                    name: speciality.getName(),
                    description: speciality.getDescription()
                }
            }
        } catch (e) {
            console.log( e.message)
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