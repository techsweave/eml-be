import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import Response from '@lamdaModel/lamdaResponse';


const scan: ValidatedEventAPIGatewayProxyEvent<void> = async (event) => {
    let response: Response<void>;
    return response.ToPIGatewayProxyResult();
}

export const main = middyfy(scan);
