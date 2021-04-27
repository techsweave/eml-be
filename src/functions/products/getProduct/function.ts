import dbContext from "@dbModel/dbContext";
import Product from "@dbModel/tables/product";

const getProduct = async (id: string): Promise<Product> => {
    let item: Product = new Product();
    item.id = id;
    return dbContext.get(item);
}

export default getProduct;