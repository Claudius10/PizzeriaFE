import styles from "./css/StoreList.module.css";
import {useQuery} from "@tanstack/react-query";
import {ChangeEvent, useEffect, useRef} from "react";
import {queryResource} from "../../../../../api/open/resource";
import {StoreDTO} from "../../../../../interfaces/dto/resources";
import {Required, Select} from "../../../../layout/styled/elements";
import {getSessionStorageForm, sessionStorageFormExists} from "../FormSessionStorageUtils";

interface Props {
    onSetStoreId: (id: number) => void;
    isAddressFormInvalid?: boolean;
}

const StoreList = (props: Props) => {
    const storePickUpSelectRef = useRef<HTMLSelectElement>(null);

    const {data: storeList} = useQuery<StoreDTO[]>({
        queryKey: ["resource", "store"],
        queryFn: queryResource,

    });

    useEffect(() => {
        if (sessionStorageFormExists()) {
            const sessionStorageForm = getSessionStorageForm();

            if (sessionStorageForm.address.id) {
                if (storePickUpSelectRef.current !== null) {
                    storePickUpSelectRef.current.value = `${sessionStorageForm.address.id}`;
                }
            }
        }
    }, []);

    const setSelectedStore = (event: ChangeEvent<HTMLSelectElement>) => {
        const selectedStore = storeList?.find((store: StoreDTO) => store.id === Number(event.target.value)) as StoreDTO;
        props.onSetStoreId(selectedStore.id);
    };

    return <>
        <label className={styles.label} htmlFor="storePickUp">
            Seleccione tienda<Required>*</Required>
        </label>

        <Select
            id="storePickUp"
            onChange={setSelectedStore}
            ref={storePickUpSelectRef}
            $height={"2rem"}
            $width={"100%"}
            $margin={"0 0 0.5rem 0"}
            $padding={"0 0 0 0.5rem"}
            $border={props.isAddressFormInvalid ? "1px solid rgb(199, 30, 30)" : "1px solid #a9004f"}>
            <option hidden/>
            {storeList?.map((store: StoreDTO) => (
                <option key={store.id} value={store.id}>
                    {store.address.street}, número {store.address.streetNr} | Horario:{" "}
                    {store.schedule} | Tlf: {store.phoneNumber}
                </option>))}
        </Select>
    </>;
};

export default StoreList;