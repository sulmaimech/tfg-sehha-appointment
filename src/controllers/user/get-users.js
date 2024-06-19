export default function makeGetUsers({retrieveAllUsers}){
    return async function getUsers(httpRequest){
        // http request can be used later to create 
        const headers = {
            'Content-Type': 'application/json'
        };
        try {

            const users = await retrieveAllUsers(httpRequest.query);
            const usersResponse = users.map(user => {
                return {
                    id: user.getId(),
                    firstName: user.getFirstName(),
                    lastName: user.getLastName(),
                    email: user.getEmail(),
                    phone: user.getPhone(),
                    dateOfBirth: user.getDateOfBirth(),
                    gender: user.getGender()
                }
            });

            return {
                headers,
                statusCode: 200,
                body: usersResponse
            };
        } catch (e) {
            console.log(e.message)
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