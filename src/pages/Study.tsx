import { useEffect, useState } from "react"
import { Set } from "../types";
import { useParams } from "react-router-dom";

export default function Study() {

    const [setData, setSetData] = useState<Set>();
    const {set_id} = useParams();

    // fetch data
    function fetchSet() {
        // fetch set from localstorage
        if (set_id) {
            const current = localStorage.getItem(set_id);
            if (current) {
                const parsed = JSON.parse(current);
                setSetData(parsed);
            }
        }
    }

    useEffect(() => {

        fetchSet();

    }, [])

    return (
        <div>

        </div>
    )
}
