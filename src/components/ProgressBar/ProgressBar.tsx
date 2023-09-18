import { useMemo, useState } from "react"

interface ProgressBarProps {
    currValue: number;
    maxValue: number;
}

export default function ProgressBar({currValue, maxValue}:ProgressBarProps) {

    // calculate the percentage based on max & current
    const [percentage, setPercentage] = useState<number>(currValue / maxValue * 100)
    
    useMemo(() => {

        setPercentage(currValue / maxValue * 100)

    }, [currValue])

    return (
        <div className="w-full flex justify-between items-center px-4">
            <div className="w-full h-2 bg-black/40 rounded-md">

                <div style={{width: percentage+"%"}} className="bg-green-400 h-full rounded-[inherit] text-left">
                    {""}
                </div>

            </div>
            <div className="min-w-fit ml-8 text-xl">
                {currValue} / {maxValue}
            </div>
        </div>
    )
}