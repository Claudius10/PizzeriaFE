import styles from "./AccountNav.module.css";
import {NavLink, Outlet} from "react-router-dom";

const AccountNav = () => {
    return <>
        <div className={styles.layout}>
            <div className={styles.container}>
                <div className={styles.links}>
                    <NavLink to={""} end className={({isActive, isPending}) =>
                        isPending ? `${styles.pending}` : isActive ? `${styles.active}` : `${styles.pending}`}>
                        Perfil
                    </NavLink>

                    <NavLink to={"pedido/historial?pageSize=5&pageNumber=1"} className={({isActive, isPending}) =>
                        isPending ? `${styles.pending}` : isActive ? `${styles.active}` : `${styles.pending}`}>
                        Pedidos
                    </NavLink>

                    <NavLink to={"configuracion"} className={({isActive, isPending}) =>
                        isPending ? `${styles.pending}` : isActive ? `${styles.active}` : `${styles.pending}`}>
                        Configuración
                    </NavLink>
                </div>
            </div>
        </div>
        <Outlet/>
    </>;
};

export default AccountNav;