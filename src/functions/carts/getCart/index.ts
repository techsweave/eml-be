// import schema from './schema';
import { handlerPath } from '@libs/handlerResolver';

export default {
    handler: `${handlerPath(__dirname)}/handler.main`,
    events: [
        {
            http: {
                method: 'get',
                path: 'cart/home/samuele/Scrivania/eml-be/src/functions/checkout/createCheckout/handler.ts',
                cors: true
            }
        }
    ]
}

