import { useEffect, useState } from "react"
import { Set } from "../types";
import { useParams } from "react-router-dom";

export default function Study() {

    const [setData, setSetData] = useState<Set>();
    const {setId} = useParams();

    // fetch data
    function fetchSet() {
        // fetch set from localstorage
        if (setId) {
            const current = localStorage.getItem(setId);
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
