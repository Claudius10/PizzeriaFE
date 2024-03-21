import styles from "./css/NewUserOrderForm.module.css";
import {FormProvider, useForm} from "react-hook-form";
import UserInfo from "./user/UserInfo";
import DeliveryForm from "./user/DeliveryForm";
import AdditionalDataForm from "./common/AdditionalDataForm";
import {NavLink, useLoaderData} from "react-router-dom";
import useModal from "../../../../hooks/useModal";
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
import {OnCancelOrder, OnError, OnUserOrderSuccess} from "../../../layout/modal/OrderFormModals";
import {ApiErrorDTO} from "../../../../interfaces/dto/api-error";
import {removeItemIds} from "../../../../functions/form";
import {Button, Placeholder, Prompt, RedirectWrapper} from "../../../layout/styled/elements";
import Modal from "../../../../hooks/Modal";
import {UserOrderForm} from "../../../../interfaces/dto/forms/order";
import {clearSessionStorageForm, defaultUserFormValues} from "./FormSessionStorageUtils";
import Cart from "../../cart/Cart";
import {useSessionStorage} from "../../../../hooks/usehooks-ts/usehooks-ts.ts";
import {useEffect} from "react";

const NewUserOrderForm = () => {
    const {isModalOpen, modalContent, openModal, closeModal} = useModal();
    const queryClient = useQueryClient();
    const dispatch = useAppDispatch();
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
            openModal(<OnUserOrderSuccess redirectTo={"/menu/pizzas"} id={orderId} closeModal={closeModal}/>);
        },
        onError: (response: ApiErrorDTO) => {
            openModal(<OnError errorMsg={response.errorMsg} closeModal={closeModal}/>);
        },
    });

    const onCancelOrder = () => {
        dispatch(orderState.clear());
        clearCart();
        form.reset(defaultUserFormValues);
        openModal(<OnCancelOrder redirectTo={"/menu/pizzas"} closeModal={closeModal}/>);
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
        form.cart.totalCost = getTotalCost();
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
        <Modal show={isModalOpen} hide={closeModal} content={modalContent}/>
        {newOrder.isPending && <Placeholder>Cargando...</Placeholder>}
        {!newOrder.isPending &&
            <div>
                <Prompt
                    $fontSize={"1.9rem"}
                    $color={"#a9004f"}
                    $margin={"0.5rem 0 0 0"}>
                    Aquí no te puedes equivocar...
                </Prompt>

                <Prompt
                    $fontSize={"1.9rem"}
                    $color={"#a9004f"}
                    $margin={"0 0 0.5rem 0"}>
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