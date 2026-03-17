import { APIGatewayProxyCallbackV2, APIGatewayProxyEventV2, APIGatewayProxyResult } from "aws-lambda";


export const handler = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResult> => {    

    const method = event.requestContext.http.method;
    const path = event.requestContext.http.path;

    try {

        if(path === '/users') {
            switch (method) {
                case 'GET':
                    return getAllUsers(event);
                case 'POST':
                    return createUser(event);
                default:
                    return {
                        statusCode: 405,
                        body: JSON.stringify({ message: 'Method Not Allowed for users path' }),
                    };
            }
            
}
        if (path.startsWith('/users/')) {
            const userId = path.split('/')[2];
            if (!userId) {
                return {
                    statusCode: 400,
                    body: JSON.stringify({ message: 'User ID is required in the path' }),
                };
            }
            switch (method) {
                case 'GET':
                    return getUser(userId);
                case 'PUT':
                    return updateUser(event, userId);
                case 'DELETE':
                    return deleteUser(userId);
                default:
                    return {
                        statusCode: 405,
                        body: JSON.stringify({ message: 'Method Not Allowed for user path' }),
                    };
            }
        }
        return {
            statusCode: 404,
            body: JSON.stringify({ message: 'User not found' }),
        };
    }

     catch (error) {        
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error' }),
        };
    }
}

async function getAllUsers(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResult> {
    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Get all users' }),
    };
}

async function createUser(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResult> {
    return {
        statusCode: 201,
        body: JSON.stringify({ message: 'Create user' }),
    };
}

async function getUser(userId: string): Promise<APIGatewayProxyResult> {
    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Get user' }),
    };
}

async function updateUser(event: APIGatewayProxyEventV2, userId: string): Promise<APIGatewayProxyResult> {
    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Update user' }),
    };
}

async function deleteUser(userId: string): Promise<APIGatewayProxyResult> {
    return {
        statusCode: 204,
        body: JSON.stringify({ message: `user ${userId} deleted` }),
    };
}
