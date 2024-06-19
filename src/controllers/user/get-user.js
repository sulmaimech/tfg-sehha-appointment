export default function makeGetUser({retrieveUserDetails}){
    return async function getUser(httpRequest){
        const headers = {
            'Content-Type': 'application/json'
        }
        try{
            const userId = httpRequest.params.id
            const user = await retrieveUserDetails({id: userId})
            return {
                headers,
                statusCode: 200,
                body: {
                    userId: user.getId(),
                    firstName: user.getFirstName(),
                    lastName: user.getLastName(),
                    email: user.getEmail(),
                    phone: user.getPhone(), 
                    gender: user.getGender()
                }
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