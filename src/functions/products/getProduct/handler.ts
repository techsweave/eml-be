import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import Product from '@dbModel/tables/product';
import Response from '@lamdaModel/lambdaResponse'
import HttpStatusCodes from '@lamdaModel/httpStatusCodes';
import getProduct from '@products/getProduct/function'


/*
 * Remember: event.body type is the type of the instantiation of ValidatedEventAPIGatewayProxyEvent
 * In this case event.body type is 'void' -> we have no body!
*/
const getProductHandler: ValidatedEventAPIGatewayProxyEvent<void> = async (event) => {
    let response: Response<Product>;
    try {
        response = Response.fromData<Product>(
            await getProduct(event.pathParameters?.id),
            HttpStatusCodes.OK);
    }
    catch (error) {
        response = Response.fromError<Product>(error);
    }
    return await response.toAPIGatewayProxyResult();
}

export const main = middyfy(getProductHandler);
