import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import Response from '@lamdaModel/lambdaResponse';


const scan: ValidatedEventAPIGatewayProxyEvent<void> = async (event) => {
    let response: Response<void>;
    return await response.toAPIGatewayProxyResult();
}

export const main = middyfy(scan);
