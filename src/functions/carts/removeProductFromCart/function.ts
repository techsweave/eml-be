import dbContext from "@dbModel/dbContext";
import CartRow from "@dbModel/tables/cart";

const removeProductFromCart = async (id: string): Promise<CartRow> => {
    let item = new CartRow();
    item.id = id;
    return dbContext.delete(item);
}

export default removeProductFromCart;