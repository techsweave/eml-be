import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

// import schema from './schema';

const scan: ValidatedEventAPIGatewayProxyEvent<any> = async (event) => {
    return formatJSONResponse({
        message: event,
        event,
    });
}

export const main = middyfy(scan);
