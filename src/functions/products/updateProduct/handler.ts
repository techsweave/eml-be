import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import Product from '@dbModel/tables/product';
import Response from '@lamdaModel/lambdaResponse';
import schema from '@schema/lambdaSchema/updateProduct';
import HttpStatusCodes from '@lamdaModel/httpStatusCodes';
import updateProduct from '@products/updateProduct/function';


/*
 * Remember: event.body type is the type of the instantiation of ValidatedEventAPIGatewayProxyEvent
 * In this case event.body type is 'void' -> we have no body!
*/
const updateProductHandler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
    let response: Response<Product>;
    try {
        const product = new Product();

        product.id = event.pathParameters?.id;
        product.name = event.body?.name;
        product.price = event.body?.price;
        product.description = event.body?.description;
        product.availability = event.body?.availability;
        product.discount = event.body?.discount;

        response = Response.fromData<Product>(
            await updateProduct(product),
            HttpStatusCodes.OK
        );
    }
    catch (error) {
        response = Response.fromError<Product>(error);
    }
    return response.toAPIGatewayProxyResult();
};

export const main = middyfy(updateProductHandler);
