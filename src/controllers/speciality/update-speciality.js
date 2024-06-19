export default function makeUpdateASpeciality({updateSpeciality}){
    return async function updateASpeciality(httpRequest){
        const headers = {
            'Content-Type': 'application/json'
        }
        try{
            const specialityInfo = {name: httpRequest.body.name, description: httpRequest.body.description}
            const specialityEntity = await updateSpeciality({id: httpRequest.params.id, ...specialityInfo})
            return {
                headers,
                statusCode: 200,
                body: {
                    id: specialityEntity.getId(),
                    name: specialityEntity.getName(), 
                    description: specialityEntity.getDescription()
                }
            }
        }catch(e){
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
