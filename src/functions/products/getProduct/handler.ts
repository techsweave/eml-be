import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import Product from '@dbModel/tables/product';
import Response from '@lamdaModel/lambdaResponse'
import dbContext from '@dbModel/dbContext';
import HttpStatusCodes from '@lamdaModel/httpStatusCodes';


/*
 * Remember: event.body type is the type of the instantiation of ValidatedEventAPIGatewayProxyEvent
 * In this case event.body type is 'void' -> we have no body!
*/
const getProduct: ValidatedEventAPIGatewayProxyEvent<void> = async (event) => {
    let response: Response<Product>;

    let item = new Product();
    item.id = event.pathParameters?.id;

    try {
        response = Response.fromData<Product>(await dbContext.get(item), HttpStatusCodes.OK);
    }
    catch (error) {
        response = Response.fromError<Product>(error);
    }
    return await response.toAPIGatewayProxyResult();
}

export const main = middyfy(getProduct);
