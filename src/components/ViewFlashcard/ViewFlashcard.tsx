import { useEffect, useState } from "react";

interface ViewFlashcardProps {
    set_id: string;
}

const ViewFlashcard = ({set_id}: ViewFlashcardProps) => {
    
    const [loaded, setLoaded] = useState<boolean>(false)

    useEffect(() => {
        
        let subscribed = true
        // rerender whenever set_id changes
        setLoaded(false)

        const getData = () => {
            if (!subscribed) return
            console.log(loaded)
        }

        getData()

        return () => {
            subscribed = false
        }

    }, [set_id])

    return (
        <div>

        </div>
    )
}

export default ViewFlashcard