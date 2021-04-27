import dbContext from "@dbModel/dbContext";
import Product from "@dbModel/tables/product";

const scanProduct = async (): Promise<{
    items: Product[],
    lastKey: Partial<Product>
}> => {
    let items: Product[] = new Array();
    let lastKey: Partial<Product>;

    let paginator = dbContext.scan(Product).pages();

    for await (const page of paginator) {
        items = items.concat(page);
        lastKey = paginator.lastEvaluatedKey;
    }

    return Promise.resolve({
        items: items,
        lastKey: lastKey
    });
}

export default scanProduct;
