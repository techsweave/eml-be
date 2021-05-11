import dbContext from "@dbModel/dbContext";
import Product from "@dbModel/tables/product";

const deleteProduct = async (id: string): Promise<Product> => {
    let item: Product = new Product();
    item.id = id;
    return dbContext.delete(item);
}

export default deleteProduct;