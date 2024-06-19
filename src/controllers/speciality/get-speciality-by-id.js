export default function makeGetSpecialityById({getSpecialityDetails}){
    return async function getSpecialityById(httpRequest){
        // http request can be used later to create 
        const headers = {
            'Content-Type': 'application/json'
        };
        try {
            const speciality = await getSpecialityDetails({id: httpRequest.params.id});
            const specialityResponse = {
                    id: speciality.getId(),
                    name: speciality.getName(),
                    description: speciality.getDescription()
                }
            return {
                headers,
                statusCode: 200,
                body: specialityResponse
            };
        } catch (e) {
            console.log( e.message)

            return {
                headers,
                statusCode: 400,
                body: {
                    error: "Bad Request"
                }
            };
        }
    }
}