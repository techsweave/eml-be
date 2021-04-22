import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import Response from '@lamdaModel/lamdaResponse';
import Product from '@dbModel/tables/product';

/*
 * Remember: event.body type is the type of the instantiation of ValidatedEventAPIGatewayProxyEvent
 * In this case event.body type is type of 'Product'
*/
const createProduct: ValidatedEventAPIGatewayProxyEvent<Product> = async (event) => {
    let response: Response<Product>;
    return response.ToPIGatewayProxyResult();
}

export const main = middyfy(createProduct);
