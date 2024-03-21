import {QueryClient} from "@tanstack/react-query";
import React, {Suspense} from "react";
import {createBrowserRouter, createRoutesFromElements, redirect, Route} from "react-router-dom";
import Main from "./Main";
import {productLoader} from "../api/open/resource";
import PizzaProducts from "../components/core/product/PizzaProducts";
import AppetizerProducts from "../components/core/product/AppetizerProducts";
import PastaProducts from "../components/core/product/PastaProducts";
import DessertProducts from "../components/core/product/DessertProducts";
import BeverageProducts from "../components/core/product/BeverageProducts";
import ErrorPage from "../components/layout/placeholder/error/ErrorPage";
import WelcomePage from "../components/core/welcome/WelcomePage";
import Register from "../components/core/auth/Register";
import Login from "../components/core/auth/Login";
import AccountNav from "../components/core/account/AccountNav";
import Profile from "../components/core/account/profile/Profile";
import Settings from "../components/core/account/settings/Settings";
import FallbackPage from "../components/layout/placeholder/error/FallbackPage";
import ProductPage from "../components/core/product/ProductPage";
import {userLoader} from "../api/locked/user/settings";
import Orders from "../components/core/orders/list/Orders";
import UserOrderSummary from "../components/core/orders/UserOrderSummary";
import UpdateUserOrderForm from "../components/core/orders/forms/UpdateUserOrderForm";
import NewOrderPage from "../components/core/orders/forms/NewOrderPage";
import NewAnonOrderForm from "../components/core/orders/forms/NewAnonOrderForm";
import NewUserOrderForm from "../components/core/orders/forms/NewUserOrderForm";
import {isUserLoggedIn} from "../functions/web";
import AnonOrderSummary from "../components/core/orders/AnonOrderSummary";
import {modals} from "@mantine/modals";

const Routes = (queryClient: QueryClient) => {
    const NotFoundPage = React.lazy(
        () => import("../components/layout/placeholder/error/NotFoundPage")
    );

    return createBrowserRouter(
        createRoutesFromElements(
            <Route
                path="/"
                element={<Main/>}
                errorElement={<ErrorPage/>}>

                <Route
                    index element={<WelcomePage/>}
                    errorElement={<ErrorPage/>}
                />

                <Route
                    path="registracion-usuario"
                    element={<Register/>}
                    errorElement={<ErrorPage/>}
                />

                <Route
                    path="iniciar-sesion"
                    element={<Login/>}
                    errorElement={<ErrorPage/>}
                />

                <Route
                    path="perfil"
                    element={<AccountNav/>}
                    errorElement={<ErrorPage/>}
                    loader={() => {
                        if (!isUserLoggedIn()) {
                            const logoutBc = new BroadcastChannel("session");
                            logoutBc.postMessage("session-expired");
                            logoutBc.close();
                            console.log("from routes");
                            modals.openContextModal({
                                modal: "agree",
                                title: "Advertencia",
                                innerProps: {
                                    modalBody: "No hay una sesión activa o la anterior caducó. Por favor, reinicie la sesión."
                                }
                            });
                            return redirect("/iniciar-sesion");
                        }
                        return null;
                    }}
                >
                    <Route
                        index element={<Profile/>}
                        errorElement={<ErrorPage/>}
                        loader={userLoader(queryClient, ["user", "data"])}
                    />

                    <Route
                        path={"pedido/historial"}
                        element={<Orders/>}
                        errorElement={<ErrorPage/>}
                    />

                    <Route
                        path={"pedido/historial/:orderId"}
                        element={<UserOrderSummary/>}
                        errorElement={<ErrorPage/>}>
                    </Route>

                    <Route
                        path="pedido/historial/:orderId/actualizacion"
                        element={<UpdateUserOrderForm/>}
                        errorElement={<ErrorPage/>}
                        loader={userLoader(queryClient, ["user", "data"])}
                    />

                    <Route
                        path={"configuracion"}
                        element={<Settings/>}
                        errorElement={<ErrorPage/>}
                    />
                </Route>

                <Route path={"/menu"} element={<ProductPage/>} errorElement={<ErrorPage/>}>
                    <Route
                        path="pizzas"
                        element={<PizzaProducts/>}
                        errorElement={<ErrorPage/>}
                        loader={productLoader(queryClient, ["pizza"])}
                    />

                    <Route
                        path="entrantes"
                        element={<AppetizerProducts/>}
                        errorElement={<ErrorPage/>}
                        loader={productLoader(queryClient, ["appetizer"])}
                    />

                    <Route
                        path="pastas"
                        element={<PastaProducts/>}
                        errorElement={<ErrorPage/>}
                        loader={productLoader(queryClient, ["pasta"])}
                    />

                    <Route
                        path="postres"
                        element={<DessertProducts/>}
                        errorElement={<ErrorPage/>}
                        loader={productLoader(queryClient, ["dessert"])}
                    />

                    <Route
                        path="bebidas"
                        element={<BeverageProducts/>}
                        errorElement={<ErrorPage/>}
                        loader={productLoader(queryClient, ["beverage"])}
                    />
                </Route>

                <Route path={"/pedido-nuevo"} element={<NewOrderPage/>} errorElement={<ErrorPage/>}>

                    <Route
                        path={"/pedido-nuevo"}
                        index element={<NewAnonOrderForm/>}
                        errorElement={<ErrorPage/>}
                    />

                    <Route
                        path="resumen"
                        element={<AnonOrderSummary/>}
                        errorElement={<ErrorPage/>}
                    />

                    <Route
                        path="usuario"
                        element={<NewUserOrderForm/>}
                        errorElement={<ErrorPage/>}
                        loader={userLoader(queryClient, ["user", "data"])}
                    />
                </Route>

                <Route
                    path="*"
                    element={
                        <Suspense fallback={<FallbackPage/>}>
                            <NotFoundPage/>
                        </Suspense>}
                    errorElement={<ErrorPage/>}
                />
            </Route>
        )
    );
};

export default Routes;

