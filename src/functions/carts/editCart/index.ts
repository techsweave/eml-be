// import schema from './schema';
import { handlerPath } from '@libs/handlerResolver';
import schema from '@schema/lambdaSchema/editCart';

export default {
    handler: `${handlerPath(__dirname)}/handler.main`,
    events: [
        {
            http: {
                method: 'put',
                path: 'cart/{id}',
                cors: true,
                request: {
                    schema: {
                        'application/json': schema
                    }
                }
            }
        }
    ]
};