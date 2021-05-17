// import schema from './schema';
import { handlerPath } from '@libs/handlerResolver';
import schema from '@schema/lambdaSchema/scanProduct';

export default {
    handler: `${handlerPath(__dirname)}/handler.main`,
    events: [
        {
            http: {
                method: 'post',
                path: 'products/filter',
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

