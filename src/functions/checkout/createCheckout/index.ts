// import schema from './schema';
import { handlerPath } from '@libs/handlerResolver';
import schema from '@schema/lambdaSchema/createCheckout';

export default {
    handler: `${handlerPath(__dirname)}/handler.main`,
    events: [
        {
            http: {
                method: 'post',
                path: 'checkout',
                cors: true,
                request: {
                    schemas: {
                        'application/json': schema
                    }
                }
            }
        }
    ]
};

