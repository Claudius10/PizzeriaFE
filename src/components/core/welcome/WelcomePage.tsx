import styles from "./css/WelcomePage.module.css";
import {queryResource} from "../../../api/open/resource";
import {useQuery} from "@tanstack/react-query";
import OffersList from "../../core/offers/OffersList";
import {OfferDTO} from "../../../interfaces/dto/resources.ts";
import {useState} from "react";
import {Center, Loader} from "@mantine/core";
import {Placeholder} from "../../layout/styled/elements.ts";

const WelcomePage = () => {
    const [bouncy, setBouncy] = useState(true);
    const {data: offers, isSuccess, isLoading, isError} = useQuery<OfferDTO[]>({
        queryKey: ["resource", "offer"],
        queryFn: queryResource
    });

    return <div className={styles.layout}>
        <div className={styles["welcome-text"]}>
            <h1 className={styles.title}>¡Bienvenido/a</h1>
            <h1 className={styles["title-mid"]}>a la Pizzería</h1>
            <h1 className={styles.title}>Fabulosa!</h1>
        </div>

        <h2 className={bouncy ? styles.offersBouncy : styles.offersStatic} onClick={() => setBouncy(!bouncy)}>Descubre
            las ofertas</h2>

        {isSuccess && <OffersList offers={offers}/>}
        {isLoading && <Center h={100}><Loader color="#a9004f" size="xl" type="dots"/></Center>}
        {isError && <Placeholder>Se ha producido un error al cargar las ofertas. Inténtelo más
            tarde.</Placeholder>}
    </div>;
};

export default WelcomePage;
