import styles from "./css/NewUserOrderForm.module.css";
import {FormProvider, useForm} from "react-hook-form";
import UserInfo from "./user/UserInfo";
import DeliveryForm from "./user/DeliveryForm";
import AdditionalDataForm from "./common/AdditionalDataForm";
import {NavLink, useLoaderData, useNavigate} from "react-router-dom";
import {getCookie} from "../../../../functions/web";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useAppDispatch} from "../../../../store/hooks";
import {UserDataDTO} from "../../../../interfaces/dto/user";
import {createUserOrder} from "../../../../api/locked/user/orders";
import {orderState} from "../../../../store/order-slice";
import {
    clearCart,
    getItems,
    getQuantity,
    getTotalCost,
    getTotalCostWithOffers
} from "../../cart/CartLocalStorageFunctions";
import {removeItemIds} from "../../../../functions/form";
import {Button, Prompt, RedirectWrapper} from "../../../layout/styled/elements";
import {UserOrderForm} from "../../../../interfaces/dto/forms/order";
import {clearSessionStorageForm, defaultUserFormValues} from "./FormSessionStorageUtils";
import Cart from "../../cart/Cart";
import {useSessionStorage} from "../../../../hooks/usehooks-ts/usehooks-ts.ts";
import {useEffect} from "react";
import {modals} from "@mantine/modals";
import {Center, Loader} from "@mantine/core";

const NewUserOrderForm = () => {
    const queryClient = useQueryClient();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const user = useLoaderData() as UserDataDTO;
    const [formValues, setFormValues] = useSessionStorage('form', defaultUserFormValues);

    const form = useForm<UserOrderForm>({
        mode: "onBlur", // Validation strategy before submitting behaviour.
        reValidateMode: "onBlur", // Validation strategy after submitting behaviour.
        defaultValues: defaultUserFormValues
    });

    useEffect(() => {
        form.reset({
            userId: null,
            addressId: formValues.addressId,
            orderDetails: formValues.orderDetails,
            cart: formValues.cart
        });

        return () => {
            setFormValues(form.getValues());
        };
    }, []);

    const newOrder = useMutation({
        mutationFn: createUserOrder,
        onSuccess: async (orderId: number) => {
            await queryClient.invalidateQueries({queryKey: ["user", "orders"]});
            form.reset(defaultUserFormValues);
            clearSessionStorageForm();
            dispatch(orderState.clear());
            clearCart();
            modals.openContextModal({
                modal: "agree",
                title: "Pedido nuevo",
                innerProps: {
                    modalBody: `Pedido ${orderId} confirmado.`,
                    onConfirm: () => {
                        navigate("/menu/pizzas");
                    }
                }
            });
        },
        onError: (error: string) => {
            modals.openContextModal({
                modal: "agree",
                title: "Error",
                innerProps: {
                    modalBody: error
                }
            });
        },
    });

    const onCancelOrder = () => {
        modals.openContextModal({
            modal: "confirm",
            title: "Pedido nuevo",
            innerProps: {
                modalBody: "¿Desea proceder con la cancelación del pedido?",
                onConfirm: () => {
                    dispatch(orderState.clear());
                    clearCart();
                    form.reset(defaultUserFormValues);
                    navigate("/menu/pizzas");
                }
            }
        });
    };

    const onSubmitHandler = (form: UserOrderForm) => {
        // deliveryHour prop is delivery_hour column in DB
        // deliveryNow prop is only a helper for this front-end form
        // to not add an extra column in the orderDetails db table
        // in the end deliveryHour === deliveryNow always
        if (form.orderDetails && form.orderDetails.deliveryHour === null) {
            form.orderDetails.deliveryHour = form.orderDetails.deliverNow;
        }

        form.userId = Number(getCookie("id"));

        // set needed data for order
        form.cart.orderItems = removeItemIds(getItems());
        form.cart.totalQuantity = getQuantity();
        form.cart.totalCost = Number(getTotalCost().toFixed(2));
        form.cart.totalCostOffers = getTotalCostWithOffers();

        newOrder.mutate(form);
    };

    // have to set manually the error for triggering the red border
    // for the delivery select (A domicilio/Recoger) when Recoger is selected
    // on first render after submit with empty address.id
    const setAddressError = () => {
        if (form.getValues("addressId") === null) {
            form.setError("addressId", {message: "La opción no puede faltar"});
        }
    };

    const formJSX =
        <FormProvider {...form}>
            <form className={styles.formContainer} onSubmit={form.handleSubmit(onSubmitHandler)}>
                <UserInfo user={user}/>
                <DeliveryForm/>
                <AdditionalDataForm/>

                <div className={styles.buttons}>
                    <Button type="button"
                            onClick={onCancelOrder}>
                        Cancelar
                    </Button>

                    <RedirectWrapper>
                        <NavLink to={"/menu/pizzas"}>
                            Menú
                        </NavLink>
                    </RedirectWrapper>

                    <Button type="submit" onClick={setAddressError}
                            $color={Object.keys(form.formState.errors).length === 0 ? "#a9004f" : "rgb(199, 30, 30)"}>
                        Realizar pedido
                    </Button>
                </div>
            </form>
        </FormProvider>;

    return <>
        {newOrder.isPending && <Center h={500}><Loader color="#a9004f" size="xl" type="dots"/></Center>}
        {!newOrder.isPending &&
            <div>
                <Prompt
                    $fontSize={"1.9rem"}
                    $color={"#e4e6ed"}
                    $margin={"1rem 0 1rem 0"}>
                    Aquí no te puedes equivocar...
                </Prompt>

                <Prompt
                    $fontSize={"1.9rem"}
                    $color={"#e4e6ed"}
                    $margin={"0 0 2rem 0"}>
                    Continua con tu pedido.
                </Prompt>

                <div className={styles.form}>
                    {formJSX}
                    <div className={styles.cart}>
                        <Cart inDrawer={false}/>
                    </div>
                </div>
            </div>}
    </>;
};

export default NewUserOrderForm;