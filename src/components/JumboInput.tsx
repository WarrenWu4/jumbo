import { useState } from "react"
import { twMerge } from "tailwind-merge";

interface JumboInputProps {
    value: string;
    textRef: React.RefObject<HTMLTextAreaElement>;
    maxLength?: number;
    className: string;
}


export default function JumboInput({value, textRef, maxLength, className}:JumboInputProps) {
    
    const [text, setText] = useState<string>(value)

    const handleChange = (e:any) => {
        // update text
        setText(e.target.value);
        // auto resize text area box
        if (textRef !== null && textRef.current !== null) {
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
                className={twMerge(className,"resize-none overflow-hidden outline-none")}
                onChange={handleChange}
            />
        </>
    )
}