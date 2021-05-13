import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import Response from '@lamdaModel/lambdaResponse';
import CartRow from '@dbModel/tables/cart';
import editProductQuantityInCart from '@carts/editProductQuantityInCart/function';
import HttpStatusCodes from '@lamdaModel/httpStatusCodes';
import schema from '@schema/lambdaSchema/editProductQuantityInCart';

const editProductQuantityInCartHandler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
    let response: Response<CartRow>;
    try {
        let cartRow = new CartRow();
        cartRow.id = event.pathParameters?.id;
        cartRow.quantity = event.body?.quantity;
        response = Response.fromData<CartRow>(await editProductQuantityInCart(cartRow), HttpStatusCodes.OK);
    } catch (error) {
        response = Response.fromError<CartRow>(error);
    }
    return await response.toAPIGatewayProxyResult();
}

export const main = middyfy(editProductQuantityInCartHandler);