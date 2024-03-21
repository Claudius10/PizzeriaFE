import styles from "./css/MainNavigation.module.css";
import pizzaIcon from "../../../resources/icons/products-nav/icons8-pizza-100.png";
import appetizerIcon from "../../../resources/icons/products-nav/icons8-appetizer-100.png";
import pastaIcon from "../../../resources/icons/products-nav/icons8-spaghetti-100.png";
import dessertIcon from "../../../resources/icons/products-nav/icons8-dessert-100.png";
import beverageIcon from "../../../resources/icons/products-nav/icons8-beverage-100.png";

import NavigationItem from "./NavigationItem";

const MainNavigation = () => {
    return <div className={styles.container}>
        <NavigationItem
            title={"Pizzas"}
            icon={pizzaIcon}
            linkTo={"/menu/pizzas"}
            height={"80px"}
            width={"80px"}
        />
        <NavigationItem
            title={"Entrantes"}
            icon={appetizerIcon}
            linkTo={"/menu/entrantes"}
            height={"80px"}
            width={"80px"}
        />
        <NavigationItem
            title={"Pastas"}
            icon={pastaIcon}
            linkTo={"/menu/pastas"}
            height={"80px"}
            width={"80px"}
        />
        <NavigationItem
            title={"Postres"}
            icon={dessertIcon}
            linkTo={"/menu/postres"}
            height={"80px"}
            width={"80px"}
        />
        <NavigationItem
            title={"Bebidas"}
            icon={beverageIcon}
            linkTo={"/menu/bebidas"}
            height={"80px"}
            width={"80px"}
        />
    </div>;
};

export default MainNavigation;