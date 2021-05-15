// import schema from './schema';
import { handlerPath } from '@libs/handlerResolver';
import schema from '@schema/lambdaSchema/addProductToCart';

export default {
    handler: `${handlerPath(__dirname)}/handler.main`,
    events: [
        {
            http: {
                method: 'post',
                path: 'cart',
                cors: true,
                request: {
                    schema: {
                        'application/json': schema
                    }
                }
            }
        }
    ]
}