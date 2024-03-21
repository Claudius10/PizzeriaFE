import styles from "./css/MobileNavigation.module.css";
import {Carousel, Embla} from "@mantine/carousel";
import NavigationItem from "./NavigationItem.tsx";
import pizzaIcon from "../../../resources/icons/products-nav/icons8-pizza-100.png";
import appetizerIcon from "../../../resources/icons/products-nav/icons8-appetizer-100.png";
import pastaIcon from "../../../resources/icons/products-nav/icons8-spaghetti-100.png";
import beverageIcon from "../../../resources/icons/products-nav/icons8-beverage-100.png";
import dessertIcon from "../../../resources/icons/products-nav/icons8-dessert-100.png";
import {useCallback, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const MobileNavigation = () => {
    const navigate = useNavigate();
    // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents,@typescript-eslint/no-unsafe-assignment
    const [embla, setEmbla] = useState<Embla | null>(null);

    const handleScroll = useCallback(() => {
        if (!embla) return;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
        const slides = embla.slideNodes();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call
        const currentSlide = embla.selectedScrollSnap();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
        const currentSliceInnerText = slides[currentSlide].innerText;
        switch (currentSliceInnerText) {
            case "Pizzas":

                navigate("/menu/pizzas");

                break;

            case "Entrantes": {
                navigate("/menu/entrantes");
                break;
            }

            case "Pastas": {
                navigate("/menu/pastas");
                break;
            }

            case "Postres": {
                navigate("/menu/postres");
                break;
            }

            case "Bebidas": {
                navigate("/menu/bebidas");
                break;
            }
        }
    }, [embla]);

    useEffect(() => {
        if (embla) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
            embla.on("settle", handleScroll);
        }
    }, [embla]);

    return <div className={styles.container}>
        <Carousel classNames={{control: styles.control}}
                  height={"fit-content"}
                  slideGap="xs"
                  controlsOffset="xs" controlSize={10}
                  loop
                  getEmblaApi={setEmbla}>
            <Carousel.Slide>
                <NavigationItem
                    title={"Pizzas"}
                    icon={pizzaIcon}
                    linkTo={"/menu/pizzas"}
                    height={"80px"}
                    width={"80px"}
                />
            </Carousel.Slide>
            <Carousel.Slide>
                <NavigationItem
                    title={"Entrantes"}
                    icon={appetizerIcon}
                    linkTo={"/menu/entrantes"}
                    height={"80px"}
                    width={"80px"}
                />
            </Carousel.Slide>
            <Carousel.Slide>
                <NavigationItem
                    title={"Pastas"}
                    icon={pastaIcon}
                    linkTo={"/menu/pastas"}
                    height={"80px"}
                    width={"80px"}
                />
            </Carousel.Slide>
            <Carousel.Slide>
                <NavigationItem
                    title={"Postres"}
                    icon={dessertIcon}
                    linkTo={"/menu/postres"}
                    height={"80px"}
                    width={"80px"}
                />
            </Carousel.Slide>
            <Carousel.Slide>
                <NavigationItem
                    title={"Bebidas"}
                    icon={beverageIcon}
                    linkTo={"/menu/bebidas"}
                    height={"80px"}
                    width={"80px"}
                />
            </Carousel.Slide>
        </Carousel>
    </div>;
};

export default MobileNavigation;