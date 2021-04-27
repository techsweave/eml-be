import dbContext from "@dbModel/dbContext";
import Product from "@dbModel/tables/product";

const createProduct = async (item: Product): Promise<Product> => {
    return dbContext.put(item);
}

export default createProduct;