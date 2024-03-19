import {CartDTO, OrderItemDTO} from "../../../interfaces/dto/order";

export const getQuantity = () => {
    return localStorage.getItem("CartQuantity") ? Number(localStorage.getItem("CartQuantity")) : 0;
};

export const setQuantity = (quantity: number) => {
    localStorage.setItem("CartQuantity", String(quantity));
};

export const getPizzaQuantity = () => {
    return localStorage.getItem("CartPizzaQuantity") ? Number(localStorage.getItem("CartPizzaQuantity")) : 0;
};

export const setPizzaQuantity = (pizzaQuantity: number) => {
    localStorage.setItem("CartPizzaQuantity", String(pizzaQuantity));
};

export const getItems = () => {
    if (localStorage.getItem("CartItems") !== null) {
        return JSON.parse(localStorage.getItem("CartItems")!) as OrderItemDTO[];
    } else {
        return [];
    }
};

export const getPizzaItems = () => {
    if (localStorage.getItem("CartItems") !== null) {
        const items = getItems();
        return items.filter((item) => item.productType === "pizza");
    } else {
        return [];
    }
};

export const setItems = (items: OrderItemDTO[]) => {
    localStorage.setItem("CartItems", JSON.stringify(items));
};

export const getTotalCost = () => {
    return localStorage.getItem("CartTotalCost") ? Number(localStorage.getItem("CartTotalCost")) : 0;
};

export const setTotalCost = (totalCost: number) => {
    localStorage.setItem("CartTotalCost", String(totalCost));
};

export const getTotalCostWithOffers = () => {
    return localStorage.getItem("CartTotalCostWithOffers") ? Number(localStorage.getItem("CartTotalCostWithOffers")) : 0;
};

export const setTotalCostWithOffers = (totalCostWithOffers: number) => {
    localStorage.setItem("CartTotalCostWithOffers", totalCostWithOffers.toFixed(2));
};

export const getTimesAppliedThreeForTwoOffer = () => {
    return localStorage.getItem("CartTimesAppliedThreeForTwo") ? Number(localStorage.getItem("CartTimesAppliedThreeForTwo")) : 0;
};

export const setTimesAppliedThreeForTwoOffer = (times: number) => {
    localStorage.setItem("CartTimesAppliedThreeForTwo", String(times));
};

export const isSecondAtHalfPriceApplied = () => {
    return localStorage.getItem("CartSecondAtHalfPriceApplied") ? Number(localStorage.getItem("CartSecondAtHalfPriceApplied")) : 0;
};

export const setAppliedSecondAtHalfPrice = (value: number) => {
    localStorage.setItem("CartSecondAtHalfPriceApplied", String(value));
};

export const updateQuantity = (items: OrderItemDTO[]) => {
    const itemQuantity = items.reduce((previousValue, {quantity}) => previousValue + quantity, 0);
    setQuantity(itemQuantity);

    const pizzaItems = getPizzaItems();
    const pizzaQuantity = pizzaItems.reduce((previousValue, {quantity}) => previousValue + quantity, 0);
    setPizzaQuantity(pizzaQuantity);
};

export const updateTotalCost = (items: OrderItemDTO[]) => {
    const itemCosts = items.map((item) => item.price * item.quantity);
    const totalCost = itemCosts.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
    setTotalCost(totalCost);
};

export const addItem = (item: OrderItemDTO) => {
    const currentItems = getItems();
    const itemIndex = currentItems.findIndex(currentItem => currentItem.id === item.id);
    window.dispatchEvent(new Event("storage"));
    if (itemIndex !== -1) {
        const theItem = currentItems[itemIndex];
        currentItems[itemIndex].quantity = theItem.quantity + 1;

        setItems(currentItems);
        updateQuantity(currentItems);
        updateTotalCost(currentItems);
        updateTotalCostWithOffers();

        return getQuantity();
    } else {
        currentItems.push(item);

        setItems(currentItems);
        updateQuantity(currentItems);
        updateTotalCost(currentItems);
        updateTotalCostWithOffers();

        return getQuantity();
    }
};

export const removeQuantity = (itemId: number) => {
    const currentItems = getItems();
    const itemIndex = currentItems.findIndex(item => item.id === itemId);
    const theItem = currentItems[itemIndex];

    if (theItem.quantity === 1) {
        const cartItemsMinusTheItem = currentItems.filter((item) => item.id !== theItem.id);
        setItems(cartItemsMinusTheItem);

        updateQuantity(cartItemsMinusTheItem);
        updateTotalCost(cartItemsMinusTheItem);
        updateTotalCostWithOffers();

        return getQuantity();
    } else {
        currentItems[itemIndex].quantity = theItem.quantity - 1;
        setItems(currentItems);

        updateQuantity(currentItems);
        updateTotalCost(currentItems);
        updateTotalCostWithOffers();

        return getQuantity();
    }
};

export const addQuantity = (itemId: number) => {
    const currentItems = getItems();
    const itemIndex = currentItems.findIndex(item => item.id === itemId);
    const theItem = currentItems[itemIndex];

    currentItems[itemIndex].quantity = theItem.quantity + 1;
    setItems(currentItems);

    updateQuantity(currentItems);
    updateTotalCost(currentItems);
    updateTotalCostWithOffers();

    return getQuantity();
};

export const clearCart = () => {
    localStorage.removeItem("CartId");
    localStorage.removeItem("CartItems");
    localStorage.removeItem("CartPizzaQuantity");
    localStorage.removeItem("CartQuantity");
    localStorage.removeItem("CartSecondAtHalfPriceApplied");
    localStorage.removeItem("CartTimesAppliedThreeForTwo");
    localStorage.removeItem("CartTotalCost");
    localStorage.removeItem("CartTotalCostWithOffers");
};

export const setCart = (cart: CartDTO) => {
    clearCart();
    setItems(cart.orderItems);
    updateQuantity(cart.orderItems);
    updateTotalCost(cart.orderItems);
    updateTotalCostWithOffers();
};

export const updateTotalCostWithOffers = () => {
    const totalCost = Number(getTotalCost());
    const pizzaQuantity = getPizzaQuantity();
    const pizzaItems = getPizzaItems();
    const pizzaPrices = pizzaItems.map(item => item.price);
    const lowestPricedPizza = Math.min(...pizzaPrices);

    const timesToApplyThreeForTwoOffer = Math.floor(pizzaQuantity / 3);
    if (timesToApplyThreeForTwoOffer !== 0) {
        for (let i = 0; i < timesToApplyThreeForTwoOffer; i++) {
            const newTotalCostWithOffers = totalCost - (lowestPricedPizza * timesToApplyThreeForTwoOffer);
            setTotalCostWithOffers(newTotalCostWithOffers);
        }
    }

    const applySecondPizzaHalfPriceOffer = (pizzaQuantity - timesToApplyThreeForTwoOffer) % 2 === 0;
    const helper = pizzaQuantity - (3 * timesToApplyThreeForTwoOffer);
    if (applySecondPizzaHalfPriceOffer && helper > 0) {
        const newTotalCostWithOffers = totalCost - (lowestPricedPizza * timesToApplyThreeForTwoOffer) - (lowestPricedPizza / 2);
        setTotalCostWithOffers(newTotalCostWithOffers);
        setAppliedSecondAtHalfPrice(1);
    } else {
        setAppliedSecondAtHalfPrice(0);
    }

    if (pizzaQuantity === 1 || pizzaQuantity === 0) {
        setTotalCostWithOffers(0);
    }

    setTimesAppliedThreeForTwoOffer(timesToApplyThreeForTwoOffer);
};