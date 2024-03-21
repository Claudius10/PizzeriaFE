import CartItem from "./CartItem";
import {
    getItems,
    getPizzaQuantity,
    getTimesAppliedThreeForTwoOffer,
    getTotalCost,
    getTotalCostWithOffers,
    isSecondAtHalfPriceApplied
} from "./CartLocalStorageFunctions";
import styles from "./css/Cart.module.css";

type Props = {
    cartInDrawer: boolean;
}

const CartContent = (props: Props) => {
    const cartItems = getItems();
    const totalCost = getTotalCost();
    const totalCostWithOffers = getTotalCostWithOffers();
    const pizzaQuantity = getPizzaQuantity();
    const timesThreeForTwoApplied = getTimesAppliedThreeForTwoOffer();

    let contentStyle;
    if (props.cartInDrawer) {
        contentStyle = styles.contentDrawer;
    } else {
        contentStyle = styles.content;
    }

    const totals =
        <div className={styles.total}>
            <p>Total: {totalCost.toFixed(2)}€</p>
            {totalCostWithOffers !== 0.00 &&
                <p>Total con ofertas:
                    <span className={styles.offerTotal}>{totalCostWithOffers.toFixed(2)}€</span>
                </p>}
        </div>;

    const pizzaOffersApplied =
        <div className={styles.offers}>
            <p>Ofertas aplicadas:</p>
            {isSecondAtHalfPriceApplied() === 1 && <p className={styles.highlight}>La segunda al 50%</p>}
            {timesThreeForTwoApplied !== 0 &&
                <p className={styles.highlight}>El 3 por 2: {timesThreeForTwoApplied}x</p>}
        </div>;

    return <>
        <div className={contentStyle}>
            {cartItems.map((cartItem) => <div key={cartItem.id}><CartItem item={cartItem}/></div>)}
        </div>
        <div className={styles.info}>
            {totalCost !== 0 && totals}
            {pizzaQuantity > 1 && pizzaOffersApplied}
        </div>
    </>;

};

export default CartContent;