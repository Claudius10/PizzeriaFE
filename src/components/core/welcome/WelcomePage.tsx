import styles from "./css/WelcomePage.module.css";
import {queryResource} from "../../../api/open/resource";
import {useQuery} from "@tanstack/react-query";
import OffersList from "../../core/offers/OffersList";
import {OfferDTO} from "../../../interfaces/dto/resources.ts";

const WelcomePage = () => {
    const {data: offers, isSuccess, isLoading, isError} = useQuery<OfferDTO[]>({
        queryKey: ["resource", "offer"],
        queryFn: queryResource
    });

    // eslint-disable-next-line react/react-in-jsx-scope
    return <div className={styles.layout}>

        <div className={styles["welcome-text"]}>
            <h1 className={styles.title}>¡Bienvenido/a</h1>
            <h1 className={styles["title-mid"]}>a la Pizzería</h1>
            <h1 className={styles.title}>Fabulosa!</h1>
        </div>

        <h2 className={styles.offers}>¡Tenemos las mejores ofertas!</h2>

        {isSuccess && <OffersList offers={offers}/>}
        {isLoading && <p className={styles.apiLoading}>Cargando ofertas...</p>}
        {isError && <p className={styles.apiLoading}>Se ha producido un error al cargar las ofertas. Inténtelo más
            tarde.</p>}
    </div>;

};

export default WelcomePage;
