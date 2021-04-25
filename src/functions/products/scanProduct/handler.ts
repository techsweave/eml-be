import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import Response from '@lamdaModel/lambdaResponse';
import Product from '@dbModel/tables/product';
import dbContext from '@dbModel/dbContext';
import HttpStatusCodes from '@lamdaModel/httpStatusCodes';
//TODO: import schema from '@schema/lambdaSchema/scanProduct';


/*
 * Remember: event.body type is the type of the instantiation of ValidatedEventAPIGatewayProxyEvent
 * In this case event.body type is type of 'Product'
*/
const scanProduct: ValidatedEventAPIGatewayProxyEvent<void> = async (event) => {
    let res: Response<Product> = new Response<Product>();

    try {

        let paginator = dbContext.scan(Product).pages();

        for await (const page of paginator) {
            if (!res.hasData())
                res = Response.fromMultipleData(page, HttpStatusCodes.OK, paginator.lastEvaluatedKey);
            else
                res.addPage(page, paginator.lastEvaluatedKey);
        }
    } catch (error) {
        res = Response.fromError<Product>(error);
    }
    return await res.toAPIGatewayProxyResult();
}

export const main = middyfy(scanProduct);
