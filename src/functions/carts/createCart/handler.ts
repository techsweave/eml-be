import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import Response from '@lamdaModel/lamdaResponse';
import Cart from '@dbModel/tables/cart';

const scan: ValidatedEventAPIGatewayProxyEvent<Cart> = async (event) => {
    let response: Response<Cart>;
    return response.ToPIGatewayProxyResult();
}

export const main = middyfy(scan);
