import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import Response from '@lamdaModel/lambdaResponse';
import Product from '@dbModel/tables/product';
import scanProduct from '@products/scanProduct/function'
import HttpStatusCodes from '@lamdaModel/httpStatusCodes';


import schema from '@schema/lambdaSchema/scanProduct';


/*
 * Remember: event.body type is the type of the instantiation of ValidatedEventAPIGatewayProxyEvent
 * In this case event.body type is type of 'Product'
*/
const scanProductHandler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
    let res: Response<Product> = new Response<Product>();

    try {
        let result = await scanProduct(event.body);
        res = Response.fromMultipleData(result.items, HttpStatusCodes.OK, result.lastKey);

    } catch (error) {
        res = Response.fromError<Product>(error);
    }
    return await res.toAPIGatewayProxyResult();
}

export const main = middyfy(scanProductHandler);
