import styles from "./ExtraInfo.module.css";
import React from "react";

export const OfferItemTitle = "Para más información pulse aquí";
export const UpdateTerms = "Condiciones de actualización";
export const UpdateInfoContent: React.ReactElement = (
    <div className={styles["update-info"]}>
        <p>Tiempos límite para modificar el pedido: </p>
        <p>Cesta: 10 minutos | Datos: 15 minutos | Anulación: 20 minutos</p>
    </div>
);
