import styles from "./css/NewAnonOrderForm.module.css";
import {NavLink, useNavigate} from "react-router-dom";
import {FormProvider, useForm} from "react-hook-form";
import {useAppDispatch} from "../../../../store/hooks";
import {useMutation} from "@tanstack/react-query";
import {createAnonOrder} from "../../../../api/open/anon";
import {orderState} from "../../../../store/order-slice";
import {
    getItems,
    getQuantity,
    getTotalCost,
    getTotalCostWithOffers
} from "../../cart/CartLocalStorageFunctions";
import {removeItemIds} from "../../../../functions/form";
import AnonClientForm from "./anon/AnonClientForm";
import AnonDeliveryForm from "./anon/AnonDeliveryForm";
import AdditionalDataForm from "./common/AdditionalDataForm";
import {Button, Prompt, RedirectWrapper} from "../../../layout/styled/elements";
import {AnonOrderForm} from "../../../../interfaces/dto/forms/order";
import {defaultAnonOrderFormValues, clearSessionStorageForm} from "./FormSessionStorageUtils";
import {CreatedAnonOrderDTO} from "../../../../interfaces/dto/order";
import {useSessionStorage} from "../../../../hooks/usehooks-ts/usehooks-ts.ts";
import {useEffect} from "react";
import {modals} from "@mantine/modals";
import {Center, Loader} from "@mantine/core";

const NewAnonOrderForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [formValues, setFormValues] = useSessionStorage('form', defaultAnonOrderFormValues);

    const form = useForm<AnonOrderForm>({
        mode: "onBlur", // Validation strategy before submitting behaviour.
        reValidateMode: "onBlur",  // Validation strategy after submitting behaviour.
        defaultValues: defaultAnonOrderFormValues
    });

    useEffect(() => {
        form.reset(formValues);

        return () => {
            setFormValues(form.getValues());
        };
    }, []);

    const createOrder = useMutation({
        mutationFn: createAnonOrder,
        onSuccess: (order: CreatedAnonOrderDTO) => {
            dispatch(orderState.setOrderSummary(order));
            form.reset(defaultAnonOrderFormValues);
            clearSessionStorageForm();
            navigate("resumen");
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
                    form.reset(defaultAnonOrderFormValues);
                    navigate("/menu/pizzas");
                }
            }
        });
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
        {createOrder.isPending && <Center h={500}><Loader color="#a9004f" size="xl" type="dots"/></Center>}
        {!createOrder.isPending &&
            <div>
                <Prompt
                    $fontSize={"1.9rem"}
                    $margin={"1rem 0 1rem 0"}
                    $color={"#e4e6ed"}>
                    Aquí no te puedes equivocar...
                </Prompt>

                <Prompt
                    $fontSize={"1.9rem"}
                    $margin={"0 0 2rem 0"}
                    $color={"#e4e6ed"}>
                    Continua con tu pedido.
                </Prompt>

                <div className={styles.form}>
                    {formJSX}
                </div>
            </div>}
    </>;
};

export default NewAnonOrderForm;