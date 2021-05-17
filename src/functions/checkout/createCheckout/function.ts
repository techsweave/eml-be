import getCart from '@carts/getCart/function';
import getProduct from '@products/getProduct/function';
import Stripe from 'stripe';

const createCheckout = async (customerId: string, successUrl: string, cancelUrl?: string): Promise<Stripe.Response<Stripe.Checkout.Session>> => {


    const resultCart = await getCart(customerId);
    const cartItems = [];
    for (const i of resultCart.items) {

        const productGet = await getProduct(i.productId);
        cartItems.push({
            price_data: {
                currency: 'eur',
                product_data: {
                    name: productGet.name,
                    description: productGet.description,
                },
                unit_amount: productGet.price * 100, // eur to cent conversion
            },
            quantity: i.quantity
        });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: '2020-08-27',
    });

    const session = await stripe.checkout.sessions.create({
        success_url: successUrl,
        cancel_url: cancelUrl,
        payment_method_types: ['card'],
        line_items: cartItems,
        mode: 'payment',
    });

    return Promise.resolve(session);

};

export default createCheckout;