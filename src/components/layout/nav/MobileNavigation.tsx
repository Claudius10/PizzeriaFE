import styles from "./css/MobileNavigation.module.css";
import 'swiper/css';
import NavigationItem from "./NavigationItem.tsx";
import pizzaIcon from "../../../resources/icons/products-nav/icons8-pizza-100.png";
import appetizerIcon from "../../../resources/icons/products-nav/icons8-appetizer-100.png";
import pastaIcon from "../../../resources/icons/products-nav/icons8-spaghetti-100.png";
import beverageIcon from "../../../resources/icons/products-nav/icons8-beverage-100.png";
import dessertIcon from "../../../resources/icons/products-nav/icons8-dessert-100.png";
import {useNavigate} from "react-router-dom";
import {Swiper, SwiperSlide} from "swiper/react";
import {useRef} from "react";
import type {Swiper as SwiperClass} from "swiper/types";
import {IconImg} from "../styled/elements.ts";
import arrowRight from "../../../resources/icons/arrow-right.png";
import arrowLeft from "../../../resources/icons/arrow-left.png";

const MobileNavigation = () => {
    const navigate = useNavigate();
    const swiperRef = useRef<SwiperClass | null>(null);
    const navigateOnSwipe = (i: number) => {
        switch (i) {
            case 0:
                navigate("/menu/pizzas");
                break;
            case 1:
                navigate("/menu/entrantes");
                break;
            case 2:
                navigate("/menu/pastas");
                break;
            case 3:
                navigate("/menu/postres");
                break;
            case 4:
                navigate("/menu/bebidas");
                break;
        }
    };

    return <div className={styles.container}>
        <IconImg className={swiperRef.current?.isBeginning ? styles.changedNotAllowed : styles.changedAllowed}
                 onClick={() => swiperRef.current?.slidePrev()} src={arrowLeft} $height={"26px"} $width={"26px"}/>
        <Swiper
            onSwiper={swiper => (swiperRef.current = swiper)}
            onSlideChangeTransitionEnd={(swiper) => {
                navigateOnSwipe(swiper.activeIndex);
            }}>
            <SwiperSlide>
                <NavigationItem
                    title={"Pizzas"}
                    icon={pizzaIcon}
                    linkTo={"/menu/pizzas"}
                    height={"80px"}
                    width={"80px"}
                />
            </SwiperSlide>
            <SwiperSlide>
                <NavigationItem
                    title={"Entrantes"}
                    icon={appetizerIcon}
                    linkTo={"/menu/entrantes"}
                    height={"80px"}
                    width={"80px"}
                />
            </SwiperSlide>
            <SwiperSlide>
                <NavigationItem
                    title={"Pastas"}
                    icon={pastaIcon}
                    linkTo={"/menu/pastas"}
                    height={"80px"}
                    width={"80px"}
                />
            </SwiperSlide>
            <SwiperSlide>
                <NavigationItem
                    title={"Postres"}
                    icon={dessertIcon}
                    linkTo={"/menu/postres"}
                    height={"80px"}
                    width={"80px"}
                />
            </SwiperSlide>
            <SwiperSlide>
                <NavigationItem
                    title={"Bebidas"}
                    icon={beverageIcon}
                    linkTo={"/menu/bebidas"}
                    height={"80px"}
                    width={"80px"}
                />
            </SwiperSlide>
        </Swiper>
        <IconImg className={swiperRef.current?.isEnd ? styles.changedNotAllowed : styles.changedAllowed}
                 onClick={() => swiperRef.current?.slideNext()} src={arrowRight} $height={"26px"} $width={"26px"}/>
    </div>;
};

export default MobileNavigation;