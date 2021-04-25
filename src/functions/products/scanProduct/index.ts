// import schema from './schema';
import { handlerPath } from '@libs/handlerResolver';
//TODO: import schema from '@schema/lambdaSchema/scanProduct';

export default {
    handler: `${handlerPath(__dirname)}/handler.main`,
    events: [
        {
            http: {
                method: 'get',
                path: 'products',
                cors: true
                // TODO: 
                // request: {
                //     schema: {
                //         'application/json': schema
                //     }
                // }
            }
        }
    ]
}

