import dbContext from "@dbModel/dbContext";
import Product from "@dbModel/tables/product";

const updateProduct = async (item: Product): Promise<Product> => {
    return dbContext.update(item, { onMissing: 'skip' });
}

export default updateProduct;