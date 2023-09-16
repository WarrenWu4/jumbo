import { useRef } from "react"

interface JumboInputProps {
    text: string;
    setText: Function;
    maxLength: number | undefined;
    className: string;
}

export default function JumboInput({text, setText, maxLength, className}:JumboInputProps) {
    
    const textRef = useRef<any>(null)

    const handleChange = (e:any) => {
        
        // update text
        setText(e.target.value);

        // auto resize text area box
        if (textRef !== null) {
            textRef.current.style.height = "12px"
            textRef.current.style.height = (textRef.current.scrollHeight) + 12 + "px"
        }
    }
    
    return (
        <>
            <textarea 
                ref={textRef}
                defaultValue={text} 
                maxLength={(maxLength !== undefined) ? maxLength : 250}
                className={className + " resize-none overflow-hidden outline-none"}
                onChange={handleChange}
            />
        </>
    )
}