import dbContext from "@dbModel/dbContext";
import CartRow from "@dbModel/tables/cart";

const editProductQuantityInCart = async (item: CartRow): Promise<CartRow> => {
    return dbContext.update(item, { onMissing: 'skip' });
}

export default editProductQuantityInCart;