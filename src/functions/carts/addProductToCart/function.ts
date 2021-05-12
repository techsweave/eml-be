import dbContext from "@dbModel/dbContext";
import CartRow from "@dbModel/tables/cart";

const addProductToCart = async (item: CartRow): Promise<CartRow> => {
    let cartRow: CartRow;
    try {
        cartRow = await dbContext.get(item);
        item.quantity = +item.quantity + +cartRow.quantity;


    } catch (error) {
        console.log("item not found, will be created new db line");
    }
    return dbContext.update(item);
}

export default addProductToCart;