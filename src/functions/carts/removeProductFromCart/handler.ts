import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import Response from '@lamdaModel/lambdaResponse';
import CartRow from '@dbModel/tables/cart';
import removeProductFromCart from '@carts/removeProductFromCart/function';
import HttpStatusCodes from '@lamdaModel/httpStatusCodes';

const removeProductFromCartHandler: ValidatedEventAPIGatewayProxyEvent<void> = async (event) => {
    let response: Response<CartRow>;
    try {
        response = Response.fromData<CartRow>(await removeProductFromCart(event.pathParameters?.id), HttpStatusCodes.OK);
    } catch (error) {
        response = Response.fromError<CartRow>(error);
    }
    return await response.toAPIGatewayProxyResult();
}

export const main = middyfy(removeProductFromCartHandler);