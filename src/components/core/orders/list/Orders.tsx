import {useQuery} from "@tanstack/react-query";
import {useSearchParams} from "react-router-dom";
import OrderSummaryList from "./OrderSummaryList";
import {getCookie} from "../../../../functions/web";
import {findUserOrders} from "../../../../api/locked/user/orders";
import {Placeholder} from "../../../layout/styled/elements";
import {Center, Loader} from "@mantine/core";

const Orders = () => {
    const [searchParams] = useSearchParams();
    const pageSize = searchParams.get("pageSize");
    const pageNumber = searchParams.get("pageNumber");

    const {isError, isLoading, isSuccess, data: ordersSlice, error} = useQuery({
        queryKey: ["user", "orders", pageSize, pageNumber, getCookie("id")],
        queryFn: findUserOrders
    });

    return <>
        {isLoading && <Center h={500}><Loader color="#a9004f" size="xl" type="dots"/></Center>}
        {isError && <Placeholder>{error.message}</Placeholder>}
        {isSuccess && <OrderSummaryList orders={ordersSlice.content} totalPages={ordersSlice.totalPages}/>}
    </>;
};

export default Orders;