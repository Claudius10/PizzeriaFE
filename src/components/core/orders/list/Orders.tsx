import {useQuery} from "@tanstack/react-query";
import {useSearchParams} from "react-router-dom";
import OrderSummaryList from "./OrderSummaryList";
import {getCookie} from "../../../../functions/web";
import {findUserOrders} from "../../../../api/locked/user/orders";
import {Placeholder} from "../../../layout/styled/elements";
import {Loader} from "@mantine/core";

const Orders = () => {
    const [searchParams] = useSearchParams();
    const pageSize = searchParams.get("pageSize");
    const pageNumber = searchParams.get("pageNumber");

    const {isError, isLoading, isSuccess, data: ordersSlice} = useQuery({
        queryKey: ["user", "orders", pageSize, pageNumber, getCookie("id")],
        queryFn: findUserOrders
    });

    return <>
        {isLoading && <Loader color="#a9004f" size="xl" type="dots"/>}
        {isError && <Placeholder>Se ha producido un error</Placeholder>}
        {isSuccess && <OrderSummaryList orders={ordersSlice.content} totalPages={ordersSlice.totalPages}/>}
    </>;
};

export default Orders;