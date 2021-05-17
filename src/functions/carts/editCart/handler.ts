import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import Response from '@lamdaModel/lambdaResponse';
import CartRow from '@dbModel/tables/cart';
import editCart from '@functions/carts/editCart/function';
import HttpStatusCodes from '@lamdaModel/httpStatusCodes';
import schema from '@schema/lambdaSchema/editCart';

const editCartHandler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
    let response: Response<CartRow>;
    try {
        const cartRow = new CartRow();
        cartRow.id = event.pathParameters?.id;
        cartRow.quantity = event.body?.quantity;
        response = Response.fromData<CartRow>(await editCart(cartRow), HttpStatusCodes.OK);
    } catch (error) {
        response = Response.fromError<CartRow>(error);
    }
    return response.toAPIGatewayProxyResult();
};

export const main = middyfy(editCartHandler);