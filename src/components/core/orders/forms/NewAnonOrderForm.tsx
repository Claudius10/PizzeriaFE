import styles from "./css/NewAnonOrderForm.module.css";
import {NavLink, useNavigate} from "react-router-dom";
import {FormProvider, useForm} from "react-hook-form";
import useModal from "../../../../hooks/useModal";
import {useAppDispatch} from "../../../../store/hooks";
import {useMutation} from "@tanstack/react-query";
import {createAnonOrder} from "../../../../api/open/anon";
import {OnCancelOrder, OnError} from "../../../layout/modal/OrderFormModals";
import {orderState} from "../../../../store/order-slice";
import {
    getItems,
    getQuantity,
    getTotalCost,
    getTotalCostWithOffers
} from "../../cart/CartLocalStorageFunctions";
import {ApiErrorDTO} from "../../../../interfaces/dto/api-error";
import {removeItemIds} from "../../../../functions/form";
import AnonClientForm from "./anon/AnonClientForm";
import AnonDeliveryForm from "./anon/AnonDeliveryForm";
import AdditionalDataForm from "./common/AdditionalDataForm";
import {Button, Placeholder, Prompt, RedirectWrapper} from "../../../layout/styled/elements";
import Modal from "../../../../hooks/Modal";
import {AnonOrderForm} from "../../../../interfaces/dto/forms/order";
import {AnonOrderFormDefaultValues, clearSessionStorageForm} from "./FormSessionStorageUtils";
import Cart from "../../cart/Cart";
import {CreatedAnonOrderDTO} from "../../../../interfaces/dto/order";

const NewAnonOrderForm = () => {
    const {isModalOpen, modalContent, openModal, closeModal} = useModal();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const createOrder = useMutation({
        mutationFn: createAnonOrder,
        onSuccess: (order: CreatedAnonOrderDTO) => {
            dispatch(orderState.setOrderSummary(order));
            form.reset(AnonOrderFormDefaultValues);
            clearSessionStorageForm();
            navigate("resumen");
        },
        onError: (error: ApiErrorDTO) => {
            openModal(<OnError errorMsg={error.errorMsg} closeModal={closeModal}/>);
        },
    });

    const form = useForm<AnonOrderForm>({
        mode: "onBlur", // Validation strategy before submitting behaviour.
        reValidateMode: "onBlur",  // Validation strategy after submitting behaviour.
        defaultValues: AnonOrderFormDefaultValues
    });

    const toggleCancelOrderModal = () => {
        form.reset(AnonOrderFormDefaultValues);
        openModal(<OnCancelOrder redirectTo={"/menu/pizzas"} closeModal={closeModal}/>);
    };

    const onSubmitHandler = (form: AnonOrderForm) => {
        // deliveryHour prop is delivery_hour column in DB
        // deliveryNow prop is only a helper for this front-end form
        // to not add an extra column in the orderDetails db table
        // in the end deliveryHour === deliveryNow always
        if (form.orderDetails && form.orderDetails.deliveryHour === null) {
            form.orderDetails.deliveryHour = form.orderDetails.deliverNow;
        }

        // set needed data for order
        form.cart.orderItems = removeItemIds(getItems());
        form.cart.totalQuantity = getQuantity();
        form.cart.totalCost = getTotalCost();
        form.cart.totalCostOffers = getTotalCostWithOffers();

        createOrder.mutate(form);
    };

    // have to set manually the error for triggering the red border
    // for the delivery select (A domicilio/Recoger) when Recoger is selected
    // on first render after submit with empty address.id
    const setAddressError = () => {
        if (form.getValues("address.id") === null && form.getValues("address.street") === null) {
            form.setError("address.street", {type: "validate", message: "La opción no puede faltar"});
        }
    };

    const formJSX =
        <FormProvider {...form}>
            <form className={styles.formContainer} onSubmit={form.handleSubmit(onSubmitHandler)}>
                <AnonClientForm/>
                <AnonDeliveryForm/>
                <AdditionalDataForm/>

                <div className={styles.buttons}>
                    <Button
                        type="button"
                        onClick={toggleCancelOrderModal}>
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
        {createOrder.isPending && <Placeholder>Cargando...</Placeholder>}
        {!createOrder.isPending &&
            <div>
                <Prompt
                    $fontSize={"1.9rem"}
                    $color={"#a9004f"}>
                    Aquí no te puedes equivocar...
                </Prompt>

                <Prompt
                    $fontSize={"1.9rem"}
                    $margin={"0 0 0.5rem 0"}
                    $color={"#a9004f"}>
                    Continua con tu pedido.
                </Prompt>

                <div className={styles.form}>
                    {formJSX}
                    <div className={styles.cart}>
                        <Cart/>
                    </div>
                </div>
            </div>}
    </>;
};

export default NewAnonOrderForm;