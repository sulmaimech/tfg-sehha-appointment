export default function makeGetSpecialists({retrieveAllSpecialists}){
    return async function getSpecialists(httpRequest){
        // http request can be used later to create 
        const headers = {
            'Content-Type': 'application/json'
        };
        try {
            const specialists = await retrieveAllSpecialists({query: httpRequest.query});
            const specialistsResponse = specialists.map(specialist => {
                return {
                    id: specialist.getId(),
                    name: `${specialist.getFirstName()} ${specialist.getLastName()}`,
                    specialities: specialist.getSpecialities().map(speciality =>{ return {

                            id: speciality.getId(),
                            name: speciality.getName(),
                            description: speciality.getDescription()
        
                    }})
                }
            });
            return {
                headers,
                statusCode: 200,
                body: specialistsResponse
            };
        } catch (e) {
            console.log(e.message)
            return {
                headers,
                statusCode: 400,
                body: {
                    error: e.message
                }
            };
        }
    }
}