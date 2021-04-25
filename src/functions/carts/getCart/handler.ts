import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import CartRow from '@dbModel/tables/cart';
import Response from '@lamdaModel/lambdaResponse'
import dbContext from '@dbModel/dbContext';
import HttpStatusCodes from '@lamdaModel/httpStatusCodes';


/*
 * Remember: event.body type is the type of the instantiation of ValidatedEventAPIGatewayProxyEvent
 * In this case event.body type is 'void' -> we have no body!
*/
const getCart: ValidatedEventAPIGatewayProxyEvent<void> = async (event) => {
    let response: Response<CartRow[]>;
    let cart: CartRow[] = new Array<CartRow>();
    try {
        for await (const element of dbContext.scan(CartRow)) {
            if (event.pathParameters?.customerId == element.customerId)
                cart.push(element);
        }

        response = Response.fromData<CartRow[]>(cart, HttpStatusCodes.OK);
    }
    catch (error) {
        response = Response.fromError<CartRow[]>(error);
    }
    return await response.toAPIGatewayProxyResult();
}

export const main = middyfy(getCart);