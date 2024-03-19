import styles from "./css/Pagination.module.css";
import {useNavigate, useSearchParams} from "react-router-dom";
import {ChangeEvent} from "react";
import {Button, Select} from "../../../layout/styled/elements";

type Props = {
    totalPages?: number;
}

const Pagination = (props: Props) => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const pageSize = searchParams.get("pageSize");
    const pageNumber = searchParams.get("pageNumber");

    const changePageNumber = (event: ChangeEvent<HTMLSelectElement>) => {
        navigate(`?pageSize=${pageSize}&pageNumber=${event.target.value}`);
    };

    const changePageSize = (event: ChangeEvent<HTMLSelectElement>) => {
        navigate(`?pageSize=${event.target.value}&pageNumber=${1}`);
    };

    const nextPage = () => {
        const nextPage = Number(pageNumber) + 1;
        navigate(`?pageSize=${pageSize}&pageNumber=${nextPage}`);
    };

    const previousPage = () => {
        const previousPage = Number(pageNumber) - 1;
        navigate(`?pageSize=${pageSize}&pageNumber=${previousPage}`);
    };

    let pageArray: number[] = [];
    if (props.totalPages) {
        pageArray = Array.from(Array(props.totalPages), (_e, i) => i + 1);
    }

    return <div className={styles.container}>

        <div className={styles.buttons}>
            <Button disabled={Number(pageNumber) === 1} onClick={previousPage}>Atrás</Button>
            <Button disabled={Number(pageNumber) === props.totalPages || props.totalPages === 0}
                    onClick={nextPage}>Siguiente</Button>
        </div>

        <div className={styles.pages}>
            <div>
                <span className={styles.text}>Tamaño página: </span>
                <Select
                    id={"pageSize"}
                    name={"pageSize"}
                    onChange={changePageSize}
                    $padding={"0 0 0 0.5rem"}>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                </Select>
            </div>
            <div>
                <span className={styles.text}>Página: </span>
                <Select
                    id={"pageNumber"}
                    name={"pageNumber"}
                    onChange={changePageNumber}
                    value={Number(pageNumber)}
                    $padding={"0 0 0 0.5rem"}>
                    {pageArray.map((number) => <option key={number} value={number}>{number}</option>)}
                </Select>
            </div>
        </div>
    </div>;
};

export default Pagination;