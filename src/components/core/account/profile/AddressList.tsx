import styles from "./css/AddressList.module.css";
import {useState} from "react";
import {getCookie} from "../../../../functions/web";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {deleteUserAddress, findUserAddressListById} from "../../../../api/locked/user/data";
import {ApiErrorDTO} from "../../../../interfaces/dto/api-error";
import {ApiError} from "../../../layout/modal/GeneralModals";
import useModal from "../../../../hooks/useModal";
import {Button, Placeholder} from "../../../layout/styled/elements";
import AddressItem from "./AddressItem";
import Modal from "../../../../hooks/Modal";
import NewAddressForm from "./forms/NewAddressForm";

const AddressList = () => {
    const {isModalOpen, openModal, modalContent, closeModal} = useModal();
    const [showForm, setShowForm] = useState<boolean>(false);
    const queryClient = useQueryClient();

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    const {data: addressList, isLoading, isSuccess, isError} = useQuery({
        queryKey: ["user", "addressList", getCookie("id")],
        queryFn: findUserAddressListById
    });

    const removeAddress = useMutation({
        mutationFn: deleteUserAddress,
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ["user", "addressList"]});
            toggleForm();
        },
        onError: (error: ApiErrorDTO) => {
            openModal(<ApiError errorMsg={error.errorMsg} closeModal={closeModal}/>);
        }
    });

    const delAddress = (addressId: number) => {
        removeAddress.mutate({userId: getCookie("id"), addressId: addressId});
    };

    return <>
        <Modal content={modalContent} show={isModalOpen} hide={closeModal}/>
        <div className={styles.container}>
            <p className={styles.text}>Domicilio(s)</p>
            {isLoading && <Placeholder>Cargando...</Placeholder>}
            {isSuccess && addressList.length === 0 && <p className={styles.text}>La lista de domicilios está vacía</p>}
            {isSuccess && addressList.map((item) => <AddressItem key={item.id} address={item} onDelete={delAddress}/>)}
            {isError && <p className={styles.text}>Ocurrió un error.</p>}
            <Button type={"button"} onClick={toggleForm}>Añadir</Button>
            {showForm && <NewAddressForm handler={toggleForm}/>}
        </div>
    </>;
};

export default AddressList;