import styles from "./css/UpdateUserOrderForm.module.css";
import {FormProvider, useForm} from "react-hook-form";
import {useLoaderData, useNavigate, useParams} from "react-router-dom";
import UserInfo from "./user/UserInfo";
import DeliveryForm from "./user/DeliveryForm";
import AdditionalDataForm from "./common/AdditionalDataForm";
import useModal from "../../../../hooks/useModal";
import {getCookie} from "../../../../functions/web";
import {useAppDispatch, useAppSelector} from "../../../../store/hooks";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {UserDataDTO} from "../../../../interfaces/dto/user";
import {orderState} from "../../../../store/order-slice";
import {
    clearCart,
    getItems,
    getQuantity,
    getTotalCost,
    getTotalCostWithOffers, setCart
} from "../../cart/CartLocalStorageFunctions";
import {findUserOrder, updateUserOrder} from "../../../../api/locked/user/orders";
import {OnError, OnOrderUpdateSuccess} from "../../../layout/modal/OrderFormModals";
import {ApiErrorDTO} from "../../../../interfaces/dto/api-error";
import {removeItemIds} from "../../../../functions/form";
import {Button, Prompt} from "../../../layout/styled/elements";
import Modal from "../../../../hooks/Modal";
import Cart from "../../cart/Cart";
import {UpdatingUserOrderForm} from "../../../../interfaces/dto/forms/order";
import {clearSessionStorageForm} from "./FormSessionStorageUtils";
import {useEffect} from "react";

const defaultUserOrderUpdateFormValues: UpdatingUserOrderForm = {
    orderId: null,
    userId: null,
    addressId: null,
    createdOn: null,
    orderDetails: {
        id: null,
        deliveryHour: null,
        changeRequested: null,
        deliverNow: null,
        deliveryComment: null,
        paymentChange: null,
        paymentType: null
    },
    cart: {
        id: null,
        orderItems: null,
        totalCost: null,
        totalCostOffers: null,
        totalQuantity: null,
    },
};

const UpdateUserOrderForm = () => {
    const {isModalOpen, modalContent, openModal, closeModal} = useModal();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {orderId} = useParams();
    const queryClient = useQueryClient();
    const user = useLoaderData() as UserDataDTO;
    const cartId = useAppSelector(state => state.order.cartId);
    const cartQuantity = useAppSelector(state => state.order.cartQuantity);
    const isUpdatePending = useAppSelector(state => state.order.updatePending);
    const isUpdateUserOrderPage = location.pathname === `/perfil/pedido/historial/${orderId}/actualizacion`;
    const {
        data: userOrder,
        isSuccess,
    } = useQuery({
        queryKey: ["user", "order", orderId],
        queryFn: findUserOrder,
    });

    useEffect(() => {
        if (isSuccess && ((cartId === null || cartQuantity === 0 || orderId && Number(orderId) !== cartId))) {
            setCart(userOrder.cart);
            dispatch(orderState.setCartId(userOrder.cart.id));
            dispatch(orderState.setCartQuantity(getQuantity()));
        }

        // if user refreshes window set back the pending flag
        if (isUpdateUserOrderPage && !isUpdatePending) {
            dispatch(orderState.setUpdatePending(true));
        }
    }, [cartId]);

    const updateOrder = useMutation({
        mutationFn: updateUserOrder,
        onSuccess: async (orderId) => {
            form.reset(defaultUserOrderUpdateFormValues);
            clearSessionStorageForm();
            dispatch(orderState.setRefetchPending(true));
            await queryClient.invalidateQueries({queryKey: ["user", "orders"]});
            await queryClient.invalidateQueries({queryKey: ["user", "order"]});
            openModal(<OnOrderUpdateSuccess id={orderId} redirectTo={`/perfil/pedido/historial/${orderId}`}
                                            closeModal={closeModal}/>);
        },
        onError: (response: ApiErrorDTO) => {
            openModal(<OnError errorMsg={response.errorMsg} closeModal={closeModal}/>);
        },
    });

    const form = useForm<UpdatingUserOrderForm>({
        mode: "onBlur",
        reValidateMode: "onBlur",
        defaultValues: defaultUserOrderUpdateFormValues,
    });

    const navToPizzas = () => {
        navigate("/menu/pizzas");
    };

    const onCancelUpdate = () => {
        clearSessionStorageForm();
        clearCart();
        dispatch(orderState.clear());
        form.reset(defaultUserOrderUpdateFormValues);
        navigate(`/perfil/pedido/historial/${orderId}`);
    };

    const onSubmitHandler = (form: UpdatingUserOrderForm) => {
        // deliveryHour prop is delivery_hour column in DB
        // deliveryNow prop is only a helper for this front-end form
        // to not add an extra column in the orderDetails db table
        // in the end deliveryHour === deliveryNow always
        if (form.orderDetails && form.orderDetails.deliveryHour === null) {
            form.orderDetails.deliveryHour = form.orderDetails.deliverNow;
        }

        form.cart.orderItems = removeItemIds(getItems());
        form.cart.totalQuantity = getQuantity();
        form.cart.totalCost = getTotalCost();
        form.cart.totalCostOffers = getTotalCostWithOffers();

        form.userId = Number(getCookie("id"));

        if (isSuccess) {
            form.orderId = userOrder.id;
            form.createdOn = userOrder.createdOn;
            form.orderDetails.id = userOrder.orderDetails.id;
            form.cart.id = userOrder.id;
        }

        updateOrder.mutate(form);
    };

    const formJSX =
        <FormProvider {...form}>
            <form className={styles.formContainer} onSubmit={form.handleSubmit(onSubmitHandler)}>
                <UserInfo user={user}/>
                <DeliveryForm/>
                <AdditionalDataForm/>

                <div className={styles.buttons}>
                    <Button type="button" onClick={onCancelUpdate}>
                        Cancelar
                    </Button>

                    <Button type="button"
                            onClick={navToPizzas}>
                        Menú
                    </Button>

                    <Button type="submit"
                            $color={Object.keys(form.formState.errors).length === 0 ? "#a9004f" : "rgb(199, 30, 30)"}>
                        Actualizar pedido
                    </Button>
                </div>
            </form>
        </FormProvider>;

    return <>
        <Modal show={isModalOpen} hide={closeModal} content={modalContent}/>
        <div className={styles.container}>
            <Prompt
                $fontSize={"2rem"}
                $margin={"0.5rem 0 0 0"}
                $color={"#a9004f"}>
                El capricho es humano...
            </Prompt>
            <Prompt
                $fontSize={"2rem"}
                $margin={"0 0 0 0"}
                $color={"#a9004f"}>
                Actualiza tu pedido.
            </Prompt>

            <div className={styles.form}>
                {formJSX}
                <div className={styles.cart}>
                    <Cart/>
                </div>
            </div>
        </div>
    </>;
};

export default UpdateUserOrderForm;