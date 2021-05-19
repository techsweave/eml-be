import dbContext from '@dbModel/dbContext';
import CartRow from '@dbModel/tables/cart';

const editCart = async (item: CartRow): Promise<CartRow> => {
    return dbContext.update(item, { onMissing: 'skip' });
};

export default editCart;