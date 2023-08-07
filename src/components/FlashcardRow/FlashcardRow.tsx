export default function FlashcardRow(props: {row:string[]}) {
    
    const addFace = () => {
        console.log("wip")
    }

    return (
        <div className="flex w-full gap-x-4">
            {
                props.row.map((data) =>
                    <div className="w-full text-xl px-4 py-2 border-solid border-black border-4 rounded-md">
                        {data}
                    </div>
                )
            }
            <button type="button" onClick={addFace} className="text-xl bg-black rounded-md text-white h-14 aspect-square">+</button>
        </div>
    )
}