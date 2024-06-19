export default function makeGetSpecialistById({retrieveSpecialistDetails}){
    return async function getSpecialistById(httpRequest){
        // http request can be used later to create 
        const headers = {
            'Content-Type': 'application/json'
        };
        try {
            const specialist = await retrieveSpecialistDetails({id: httpRequest.params.id});
            return {
                headers,
                statusCode: 200,
                body: {
                    id: specialist.getId(),
                    name: `${specialist.getFirstName()} ${specialist.getLastName()}`,
                    specialities: specialist.getSpecialities().map(speciality =>{ return {
                            id: speciality.getId(),
                            name: speciality.getName(),
                            description: speciality.getDescription()
        
                    }})
                }
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