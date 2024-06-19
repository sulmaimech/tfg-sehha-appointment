export default function makeGetSpecialities({listAllSpecialities}){
    return async function getSpecialities(httpRequest){
        // http request can be used later to create 
        const headers = {
            'Content-Type': 'application/json'
        };
        try {
            const specialities = await listAllSpecialities();
            const specialitiesResponse = specialities.map(speciality => {
                return {
                    id: speciality.getId(),
                    name: speciality.getName(),
                    description: speciality.getDescription()
                }
            });
            return {
                headers,
                statusCode: 200,
                body: specialitiesResponse
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