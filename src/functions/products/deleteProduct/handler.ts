import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import Response from '@lamdaModel/lambdaResponse';
import Product from '@dbModel/tables/product';
import HttpStatusCodes from '@lamdaModel/httpStatusCodes';
import deleteProduct from '@products/deleteProduct/function';

/*
 * Remember: event.body type is the type of the instantiation of ValidatedEventAPIGatewayProxyEvent
 * In this case event.body type is type of 'Product'
*/
const deleteProductHandler: ValidatedEventAPIGatewayProxyEvent<void> = async (event) => {
    let res: Response<Product>;
    try {
        res = Response.fromData<Product>(
            await deleteProduct(event.pathParameters.id),
            HttpStatusCodes.OK);

    } catch (error) {
        res = Response.fromError<Product>(error);
    }
    return res.toAPIGatewayProxyResult();
};

export const main = middyfy(deleteProductHandler);
