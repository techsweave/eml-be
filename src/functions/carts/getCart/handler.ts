// import 'source-map-support/register';

// import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
// import { middyfy } from '@libs/lambda';
// import CartRow from '@dbModel/tables/cart';
// import Response from '@lamdaModel/lambdaResponse'
// import dbContext from '@dbModel/dbContext';
// import HttpStatusCodes from '@lamdaModel/httpStatusCodes';


// /*
//  * Remember: event.body type is the type of the instantiation of ValidatedEventAPIGatewayProxyEvent
//  * In this case event.body type is 'void' -> we have no body!
// */
// const getCart: ValidatedEventAPIGatewayProxyEvent<void> = async (event) => {
//     let response: Response<CartRow>;
//     let cart: CartRow[] = new Array<CartRow>();
//     try {
//         for await (const element of dbContext.scan(CartRow)) {
//             if (event.pathParameters?.customerId == element.customerId)
//                 cart.push(element);
//         }

//         response = Response.fromMultipleData<CartRow>(cart, HttpStatusCodes.OK);
//     }
//     catch (error) {
//         response = Response.fromError<CartRow>(error);
//     }
//     return await response.toAPIGatewayProxyResult();
// }

// export const main = middyfy(getCart);






import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import Response from '@lamdaModel/lambdaResponse';
import CartRow from '@dbModel/tables/cart';
import dbContext from '@dbModel/dbContext';
import HttpStatusCodes from '@lamdaModel/httpStatusCodes';
import getCart from '@carts/getCart/function'
const AWS = require('aws-sdk');
AWS.config.logger = console;

/*
 * Remember: event.body type is the type of the instantiation of ValidatedEventAPIGatewayProxyEvent
 * In this case event.body type is type of 'Cart'
*/
const getCartHandler: ValidatedEventAPIGatewayProxyEvent<void> = async (event) => {
    let res: Response<CartRow> = new Response<CartRow>();
    try {
        let scanRes = await getCart('customerDefault');
        res = Response.fromMultipleData(scanRes.items, HttpStatusCodes.OK, scanRes.lastKey);
    } catch (error) {
        res = Response.fromError<CartRow>(error);
    }
    return await res.toAPIGatewayProxyResult();
}
export const main = middyfy(getCartHandler);