import styles from "./css/DeliveryForm.module.css";
import gearIcon from "../../../../../resources/icons/gear.png";
import AnonFormReducer, {formActions, formState} from "../common/FormReducer";
import {ChangeEvent, useEffect, useReducer, useRef} from "react";
import {FieldError, get, useFormContext} from "react-hook-form";
import {useQuery} from "@tanstack/react-query";
import {CircleIcon} from "../../../../layout/buttons/InteractiveIcons";
import {useNavigate} from "react-router-dom";
import StoreList from "../common/StoreList";
import {findUserAddressListById} from "../../../../../api/locked/user/data";
import {getCookie} from "../../../../../functions/web";
import {FormError, Required, Select} from "../../../../layout/styled/elements";

const DeliveryForm = () => {
    const [state, dispatch] = useReducer(AnonFormReducer, formState);
    const deliverySelectRef = useRef<HTMLSelectElement>(null);
    const navigate = useNavigate();
    const form = useFormContext();
    const addressError = get(form.formState.errors, "addressId") as FieldError;

    const revalidate = () => {
        void form.trigger("addressId"); // trigger manual field validation
    };

    const {data: addressList} = useQuery({
        queryKey: ["user", "addressList", getCookie("id")],
        queryFn: findUserAddressListById,
    });

    useEffect(() => {
        const addressId = form.getValues("addressId") as number;

        // NOTE - addressId === 1 or 2 means it's a store not a random address
        // TODO - create a boolean flag indicating whatever an address is a store
        if (addressId !== null && (addressId === 1 || addressId === 2) && deliverySelectRef.current !== null) {
            dispatch(formActions.setPickUp(true));
            deliverySelectRef.current.value = "StorePickUp";
        }

    }, [deliverySelectRef.current?.value]);

    const selectAddressOrStore = (event: ChangeEvent<HTMLSelectElement>) => {
        form.resetField("addressId", {keepError: true, defaultValue: null});

        if (event.target.value === "StorePickUp") {
            dispatch(formActions.setPickUp(true));
        }

        if (event.target.value === "HomeDelivery") {
            dispatch(formActions.setPickUp(false));
        }
    };

    const setStoreId = (storeId: number) => {
        form.setValue("addressId", storeId);
        void form.trigger("addressId");
    };

    const navToProfile = () => {
        navigate("/perfil");
    };

    const userAddressList = addressList?.length === 0 ? <p>La lista de domicilios está vacía</p> : <>
        <Select
            $height={"2rem"}
            $width={"100%"}
            $margin={"0 0 0 0"}
            $padding={"0 0 0 0.5rem"}
            $border={addressError ? "1px solid rgb(199, 30, 30)" : "1px solid #a9004f"}
            {...form.register("addressId", {
                validate: (value, formValues) => {
                    if (formValues.addressId) {
                        return true;
                    }

                    if (value === "" || value === undefined || value === null) {
                        return "La opción no puede faltar";
                    }
                },
                onChange: revalidate
            })}>
            <option hidden/>
            {addressList?.map((item) =>
                <option
                    key={item.id}
                    value={item.id}>
                    Calle: {item.street}
                    {" "}
                    |
                    {" "}
                    Número: {item.streetNr}
                    {" "}
                    |
                    {" "}
                    Portal: {item.gate ? item.gate : "N/A"}
                    {" "}
                    |
                    {" "}
                    Escalera: {item.staircase ? item.staircase : "N/A"}
                    {" "}
                    |
                    {" "}
                    Piso: {item.floor ? item.floor : "N/A"}
                    {" "}
                    |
                    {" "}
                    Puerta: {item.door ? item.door : "N/A"}
                </option>)}
        </Select>
        {addressError && <FormError>{addressError.message}</FormError>}
    </>;

    return <div className={styles.container}>
        <div className={styles.header}>
            <h1>Datos de entrega</h1>
            <CircleIcon action={navToProfile} icon={gearIcon} height={"14px"} width={"14px"}/>
        </div>

        <label className={styles.label} htmlFor="delivery">
            ¿Viene a recoger o se lo mandamos a domicilio?<Required>*</Required>
        </label>

        <Select
            id="delivery"
            onChange={selectAddressOrStore}
            ref={deliverySelectRef}
            $height={"2rem"}
            $width={"100%"}
            $margin={"0 0 0.5rem 0"}
            $padding={"0 0 0 0.5rem"}
            $border={form.getFieldState("addressId").invalid ? "1px solid rgb(199, 30, 30)" : "1px solid #a9004f"}>
            <option value={"HomeDelivery"}>A domicilio</option>
            <option value={"StorePickUp"}>Recoger</option>
        </Select>

        {state.pickUp ? <StoreList isAddressFormInvalid={!!addressError} onSetStoreId={setStoreId}/> : userAddressList}
    </div>;
};

export default DeliveryForm;