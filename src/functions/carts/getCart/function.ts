import dbContext from "@dbModel/dbContext";
import CartRow from "@dbModel/tables/cart";

const scanCart = async (customerId: string): Promise<{
    items: CartRow[],
    lastKey: Partial<CartRow>
}> => {
    let items: CartRow[] = new Array();
    let lastKey: Partial<CartRow>;

    let paginator = dbContext.scan(CartRow, {
        filter: {
            type: "Equals",
            subject: "customerId",
            object: customerId
        }
    }).pages();

    for await (const page of paginator) {
        items = items.concat(page);
        lastKey = paginator.lastEvaluatedKey;
    }

    return Promise.resolve({
        items: items,
        lastKey: lastKey
    });
}

export default scanCart;