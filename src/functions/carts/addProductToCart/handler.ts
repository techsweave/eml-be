import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import Response from '@lamdaModel/lambdaResponse';
import CartRow from '@dbModel/tables/cart';
import addProductToCart from '@carts/addProductToCart/function';
import HttpStatusCodes from '@lamdaModel/httpStatusCodes';
import schema from '@schema/lambdaSchema/addProductToCart'

const addProductToCartHandler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
    let response: Response<CartRow>;
    try {
        let cartRow = new CartRow();
        //TODO change customer id with token from cognito
        cartRow.customerId = event.body?.customerId;
        cartRow.productId = event.body?.productId;
        cartRow.quantity = event.body?.quantity;

        response = Response.fromData<CartRow>(await addProductToCart(cartRow), HttpStatusCodes.OK);
    } catch (error) {
        response = Response.fromError<CartRow>(error)
    }
    return await response.toAPIGatewayProxyResult();
}

export const main = middyfy(addProductToCartHandler);
