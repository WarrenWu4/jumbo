import { useEffect, useState } from "react"
import { Set } from "../types";
import { useParams } from "react-router-dom";

export default function Study() {

    const [setData, setSetData] = useState<Set>();
    const {set_id} = useParams();

    // fetch data
    function fetchSet() {
        // fetch set from localstorage
        const current = localStorage.getItem('sets');
        if (current) {
            const parsed = JSON.parse(current);
            const set = parsed.find((set: Set) => set.id === set_id);
            if (set) {
                setSetData(set);
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