import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import Response from '@lamdaModel/lambdaResponse';
import dbContext from '@dbModel/dbContext';
import HttpStatusCodes from '@lamdaModel/httpStatusCodes';
import Stripe from "stripe";
import axios from 'axios';
import CartRow from '@dbModel/tables/cart';
import Product from '@dbModel/tables/product';
import schema from '@schema/lambdaSchema/createCheckout'
import getCart from '@carts/getCart/function'
import getProduct from '@functions/products/getProduct/function';

const createCheckout: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
    let res: Response<Stripe.Response<Stripe.Checkout.Session>>;

    let resultCart = await getCart('customerDefault');

    try {
        let cartItems = new Array();
        for (const i of resultCart.items) {

            let productGet = await getProduct(i.productId);
            cartItems.push({
                price_data: {
                    currency: "eur",
                    product_data: {
                        name: productGet.name,
                        description: productGet.description,
                    },
                    unit_amount: productGet.price,
                },
                quantity: i.quantity
            })
        }

        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
            apiVersion: "2020-08-27",
        });

        const session = await stripe.checkout.sessions.create({
            success_url: event.body?.successUrl,
            cancel_url: event.body?.cancelUrl,
            payment_method_types: ['card'],
            line_items: cartItems,
            mode: 'payment',
        });



        res = Response.fromData<Stripe.Response<Stripe.Checkout.Session>>(session, HttpStatusCodes.OK);
    }
    catch (error) {
        res = Response.fromError<Stripe.Response<Stripe.Checkout.Session>>(error);
    }
    return await res.toAPIGatewayProxyResult();

}

export const main = middyfy(createCheckout);