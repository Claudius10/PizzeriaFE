import styles from "./css/Products.module.css";
import {useState} from "react";
import {useLoaderData} from "react-router-dom";
import {ProductDTO} from "../../../interfaces/dto/resources";
import ProductFormatMenu from "./ProductFormatMenu";
import ProductList from "./ProductList";
import {Prompt, RoundButton} from "../../layout/styled/elements";

const PizzaProducts = () => {
    const pizzasList = useLoaderData() as ProductDTO[];
    const pizzaFormats = pizzasList.map((pizza) => pizza.format);
    const uniqueFormats = pizzaFormats.filter((value, index, array) => array.indexOf(value) === index);
    const mediumClassicPizzas = pizzasList.filter((pizza: ProductDTO) => pizza.price === 13.30);
    const mediumGourmetPizzas = pizzasList.filter((pizza: ProductDTO) => pizza.price === 14.75);
    const familiarClassicPizzas = pizzasList.filter((pizza: ProductDTO) => pizza.price === 18.30);
    const familiarGourmetPizzas = pizzasList.filter((pizza: ProductDTO) => pizza.price === 20.25);
    const [pizzas, setPizzas] = useState<ProductDTO[]>(mediumClassicPizzas);

    const setClassics = () => {
        if (pizzas[0].format === "Mediana") {
            setPizzas(mediumClassicPizzas);
        }

        if (pizzas[0].format === "Familiar") {
            setPizzas(familiarClassicPizzas);
        }
    };

    const setGourmet = () => {
        if (pizzas[0].format === "Mediana") {
            setPizzas(mediumGourmetPizzas);
        }

        if (pizzas[0].format === "Familiar") {
            setPizzas(familiarGourmetPizzas);
        }
    };

    const setMediumSize = () => {
        if (pizzas[0].price === 18.30) {
            setPizzas(mediumClassicPizzas);
        }

        if (pizzas[0].price === 20.25) {
            setPizzas(mediumGourmetPizzas);
        }
    };

    const setFamiliarSize = () => {
        if (pizzas[0].price === 13.30) {
            setPizzas(familiarClassicPizzas);
        }

        if (pizzas[0].price === 14.75) {
            setPizzas(familiarGourmetPizzas);
        }
    };

    return <div className={styles.layout}>
        <Prompt $fontSize={"3rem"}
                $margin={"0 0 0.5rem 0"}
                className={styles.mobilePrompt}>
            Pizzas
        </Prompt>

        <div className={styles.format}>
            <div className={styles.type}>
                <RoundButton $width={"7rem"} $height={"2rem"} onClick={setClassics}>Clásicas</RoundButton>
                <RoundButton $width={"7rem"} $height={"2rem"} onClick={setGourmet}>Gourmet</RoundButton>
            </div>

            <ProductFormatMenu formats={uniqueFormats} formatHandlers={[setMediumSize, setFamiliarSize]}/>
        </div>

        <div className={styles.products}>
            <ProductList items={pizzas}/>
        </div>
    </div>;
};

export default PizzaProducts;