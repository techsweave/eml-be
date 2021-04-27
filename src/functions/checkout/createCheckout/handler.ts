import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import Response from '@lamdaModel/lambdaResponse';
import HttpStatusCodes from '@lamdaModel/httpStatusCodes';
import Stripe from "stripe";
import schema from '@schema/lambdaSchema/createCheckout'
import createCheckout from '@checkout/createCheckout/function'

const createCheckoutHandler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
    let res: Response<Stripe.Response<Stripe.Checkout.Session>>;
    try {
        let session = await createCheckout('customerDefault', event.body?.successUrl, event.body?.cancelUrl);

        res = Response.fromData<Stripe.Response<Stripe.Checkout.Session>>(session, HttpStatusCodes.OK);
    }
    catch (error) {
        res = Response.fromError<Stripe.Response<Stripe.Checkout.Session>>(error);
    }
    return await res.toAPIGatewayProxyResult();

}

export const main = middyfy(createCheckoutHandler);