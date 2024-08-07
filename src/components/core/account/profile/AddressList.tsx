import styles from "./css/AddressList.module.css";
import {useState} from "react";
import {getCookie} from "../../../../functions/web";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {deleteUserAddress, findUserAddressListById} from "../../../../api/locked/user/data";
import {Button} from "../../../layout/styled/elements";
import AddressItem from "./AddressItem";
import NewAddressForm from "./forms/NewAddressForm";
import {modals} from "@mantine/modals";
import {Center, Loader} from "@mantine/core";

const AddressList = () => {
    const [showForm, setShowForm] = useState<boolean>(false);
    const queryClient = useQueryClient();

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    const {data: addressList, isLoading, isSuccess, isError, error} = useQuery({
        queryKey: ["user", "addressList", getCookie("id")],
        queryFn: findUserAddressListById
    });

    const removeAddress = useMutation({
        mutationFn: deleteUserAddress,
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ["user", "addressList"]});
            toggleForm();
        },
        onError: (error: string) => {
            modals.openContextModal({
                modal: "agree",
                title: "Error",
                innerProps: {
                    modalBody: error
                }
            });
        }
    });

    const delAddress = (addressId: number) => {
        removeAddress.mutate({userId: getCookie("id"), addressId: addressId});
    };

    return <div className={styles.container}>
        <p className={styles.text}>Domicilio(s)</p>
        {isLoading && <Center h={100}><Loader color="#a9004f" size="xl" type="dots"/></Center>}
        {isSuccess && addressList.length === 0 && <p className={styles.text}>La lista de domicilios está vacía</p>}
        {isSuccess && addressList.map((item) => <AddressItem key={item.id} address={item} onDelete={delAddress}/>)}
        {isError && <p className={styles.text}>{error.message}</p>}
        <Button type={"button"} onClick={toggleForm}>Añadir</Button>
        {showForm && <NewAddressForm handler={toggleForm}/>}
    </div>;
};

export default AddressList;