import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import Product from '@dbModel/tables/product';
import Response from '@lamdaModel/lambdaResponse'
import dbContext from '@dbModel/dbContext';


/*
 * Remember: event.body type is the type of the instantiation of ValidatedEventAPIGatewayProxyEvent
 * In this case event.body type is 'void' -> we have no body!
*/
const getProduct: ValidatedEventAPIGatewayProxyEvent<void> = async (event) => {
    let response: Response<Product>;

    let item = new Product();
    item.id = event.pathParameters?.id;

    try {
        response = new Response<Product>(await dbContext.get(item));
    }
    catch (error) {
        response = new Response<Product>(null, error);
    }
    return await response.toAPIGatewayProxyResult();
}

export const main = middyfy(getProduct);
