import dbContext from "@dbModel/dbContext";
import Product from "@dbModel/tables/product";
import { ScanOptions } from "@aws/dynamodb-data-mapper";
import { objectToConditionExpression } from "@libs/shared/index"


const scanProduct = async (filter: any): Promise<{
    items: Product[],
    lastKey: Partial<Product>
}> => {
    let items: Product[] = new Array();
    let lastKey: Partial<Product>;
    let dbFilter: ScanOptions = {
        limit: filter.limit,
        indexName: filter.indexName,
        pageSize: filter.pageSize,
        startKey: filter.startKey,
        filter: await objectToConditionExpression(filter.filter)
    }

    let paginator = dbContext.scan(Product, dbFilter).pages();

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
