import {isRouteErrorResponse, useRouteError} from "react-router-dom";
import styles from "./ErrorPage.module.css";

const ErrorPage = () => {
    const error = useRouteError();

    if (isRouteErrorResponse(error)) {
        return (
            <div className={styles.error}>
                <h1>Oops!</h1>
                <h2>{error.status}</h2>
                <p>{error.statusText}</p>
                {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
                {error.data?.message && <p>{error.data.message}</p>}
            </div>
        );
    } else {
        return (
            <div>
                <div className={styles.error}>
                    <span>Oops...</span>
                    <p>
                        {" "}
                        Ocurrió un error. Si crees que esto no debería suceder, contacta con
                        nosotros.
                    </p>
                </div>
            </div>
        );
    }
};

export default ErrorPage;
