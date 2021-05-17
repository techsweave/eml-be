import { ScanOptions } from '@aws/dynamodb-data-mapper';
import dbContext from '@dbModel/dbContext';
import CartRow from '@dbModel/tables/cart';

const addProductToCart = async (item: CartRow): Promise<CartRow> => {
    const dbScan: ScanOptions = {
        filter: {
            type: 'And',
            conditions: [
                {
                    type: 'Equals',
                    subject: 'customerId',
                    object: item.customerId
                },
                {
                    type: 'Equals',
                    subject: 'productId',
                    object: item.productId
                }
            ]
        }
    };
    const cartRow = await dbContext.scan(CartRow, dbScan).pages();

    for await (const page of cartRow) {
        if (page.length == 0) {
            return dbContext.put(item);
        } else {
            item.id = page[0].id;
            item.quantity = +item.quantity + +page[0].quantity;
            return dbContext.update(item);
        }
    }
};

export default addProductToCart;