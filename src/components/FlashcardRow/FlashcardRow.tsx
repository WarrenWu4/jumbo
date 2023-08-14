export default function FlashcardRow(props: {input:Map<number, string>}) {
    
    const addFace = () => {
        console.log("wip")
    }

    return (
        <div className="flex w-full gap-x-4">
            {
                Object.entries(props.input).map((e, index) => {
                    return (
                        <div key={index} className="w-full border-black border-4 border-solid rounded-md text-base flex items-center px-4">
                            {e[1]}
                        </div>
                    )
                })
            }
            <button type="button" onClick={addFace} className="text-xl bg-black rounded-md text-white h-14 aspect-square">+</button>
        </div>
    )
}