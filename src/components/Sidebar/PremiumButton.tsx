import { BsQuestionCircle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export default function PremiumButton() {

    const nav = useNavigate()
    const premiumInfo = (e:any) => {
        e.preventDefault()
        nav("/premium/info")
    }
    const stripePaymentLink = "https://buy.stripe.com/test_cN229xcbb8PPcuI4gg"

    return (
        <a href={stripePaymentLink} target="_blank" className="w-full px-4 py-3 border-2 border-green-300 border-solid rounded-lg text-green-800 bg-green-200 dark:bg-green-800 dark:border-green-600 dark:text-green-200 flex items-center justify-between">
        buy premium 
        <button type="button" onClick={premiumInfo} >
            <BsQuestionCircle size={16} />
        </button>
        </a>
    )
}