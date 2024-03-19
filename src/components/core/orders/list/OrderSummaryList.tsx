import styles from "./css/OrderSummaryList.module.css";
import OrderSummaryItem from "./OrderSummaryItem";
import {OrderSummaryDTO} from "../../../../interfaces/dto/order";
import Pagination from "./Pagination";

type Props = {
    orders: OrderSummaryDTO[];
    totalPages: number;
}

const OrderSummaryList = (props: Props) => {
    const isEmpty = props.orders.length === 0;
    return <div className={styles.container}>
        {isEmpty && <p className={styles.empty}>No hay pedidos</p>}
        {!isEmpty && props.orders.map((item) => <OrderSummaryItem key={item.id} orderSummary={item}/>)}
        {!isEmpty && <Pagination totalPages={props.totalPages}/>}
    </div>;
};

export default OrderSummaryList;