import styles from "./css/Profile.module.css";
import gearIcon from "../../../../resources/icons/gear.png";
import {CircleIcon} from "../../../layout/buttons/InteractiveIcons";
import {useLoaderData, useRevalidator} from "react-router-dom";
import {UserDataDTO} from "../../../../interfaces/dto/user";
import {useState} from "react";
import ContactNumberForm from "./forms/ContactNumberForm";
import AddressList from "./AddressList";
import NameForm from "./forms/NameForm";
import EmailForm from "./forms/EmailForm";

type FormState = {
    showNameForm: boolean;
    showEmailForm: boolean;
    showContactNumberForm: boolean;
}

const Profile = () => {
    const user = useLoaderData() as UserDataDTO;
    const revalidator = useRevalidator();
    const [formState, setFormState] = useState<FormState>({
        showContactNumberForm: false,
        showEmailForm: false,
        showNameForm: false
    });

    const toggleNameForm = () => {
        setFormState({...formState, showNameForm: !formState.showNameForm});
    };

    const toggleEmailForm = () => {
        setFormState({...formState, showEmailForm: !formState.showEmailForm});
    };

    const toggleContactNumberForm = () => {
        setFormState({...formState, showContactNumberForm: !formState.showContactNumberForm});
    };

    return <div className={styles.layout}>
        <div className={styles.group}>

            <div className={styles.panel}>
                <div className={styles.section}>
                    <div className={styles.field}>
                        <p className={styles.text}>Nombre: <span className={styles.value}>{user.name}</span></p>
                        <CircleIcon action={toggleNameForm} icon={gearIcon} height={"14px"} width={"14px"}/>
                    </div>
                    {formState.showNameForm && <NameForm hide={toggleNameForm} revalidate={revalidator.revalidate}/>}
                </div>

                <div className={styles.section}>
                    <div className={styles.field}>
                        <p className={styles.text}>Email: <span className={styles.value}>{user.email}</span></p>
                        <CircleIcon action={toggleEmailForm} icon={gearIcon} height={"14px"} width={"14px"}/>
                    </div>
                    {formState.showEmailForm && <EmailForm/>}
                </div>

                <div className={styles.section}>
                    <div className={styles.field}>
                        <p className={styles.text}>Número de contacto: <span
                            className={styles.value}>{user.contactNumber}</span></p>
                        <CircleIcon action={toggleContactNumberForm} icon={gearIcon} height={"14px"}
                                    width={"14px"}/>
                    </div>
                    {formState.showContactNumberForm &&
                        <ContactNumberForm hide={toggleContactNumberForm} revalidate={revalidator.revalidate}/>}
                </div>
            </div>

            <AddressList/>
        </div>
    </div>;
};

export default Profile;