import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import Response from '@lamdaModel/lambdaResponse';
import Product from '@dbModel/tables/product';
import schema from '@schema/lambdaSchema/createProduct';
import dbContext from '@dbModel/dbContext';
import HttpStatusCodes from '@lamdaModel/httpStatusCodes';
/*
 * Remember: event.body type is the type of the instantiation of ValidatedEventAPIGatewayProxyEvent
 * In this case event.body type is type of 'Product'
*/
const createProduct: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
    let res: Response<Product>;

    try {
        let putProduct: Product = new Product();

        putProduct.name = event.body.name;
        putProduct.price = event.body?.price;
        putProduct.description = event.body?.description;
        putProduct.availability = event.body?.avaiability;
        putProduct.discount = event.body?.discount;

        res = new Response<Product>(HttpStatusCodes.CREATED, await dbContext.put(putProduct));

    } catch (error) {
        res = new Response<Product>(null, null, error);
    }
    return await res.toAPIGatewayProxyResult();
}

export const main = middyfy(createProduct);
