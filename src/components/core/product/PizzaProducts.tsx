import styles from "./css/Products.module.css";
import {useState} from "react";
import {useLoaderData} from "react-router-dom";
import {ProductDTO} from "../../../interfaces/dto/resources";
import ProductList from "./ProductList";
import {SegmentedControl} from "@mantine/core";

const PizzaProducts = () => {
    const pizzasList = useLoaderData() as ProductDTO[];
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
        <div className={styles.format}>
            <SegmentedControl
                classNames={{root: styles.segment}}
                radius="xl"
                color={"#a9004f"}
                onChange={(value) => {
                    if (value === "C") {
                        setClassics();
                    } else {
                        setGourmet();
                    }
                }}
                data={[
                    {label: 'Clásica', value: 'C'},
                    {label: 'Gourmet', value: 'G'},
                ]}
            />

            <SegmentedControl
                classNames={{root: styles.segment}}
                radius="xl"
                color={"#a9004f"}
                onChange={(value) => {
                    if (value === "M") {
                        setMediumSize();
                    } else {
                        setFamiliarSize();
                    }
                }}
                data={[
                    {label: 'Mediana', value: 'M'},
                    {label: 'Familiar', value: 'F'},
                ]}
            />
        </div>

        <div className={styles.productListWithFormat}>
            <ProductList items={pizzas}/>
        </div>
    </div>;
};

export default PizzaProducts;