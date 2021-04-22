import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import Cart from '@dbModel/tables/cart';
import Response from '@lamdaModel/lamdaResponse';

const scan: ValidatedEventAPIGatewayProxyEvent<any> = async (event) => {
    let response: Response<Cart>;
    return response.ToPIGatewayProxyResult();
}

export const main = middyfy(scan);
