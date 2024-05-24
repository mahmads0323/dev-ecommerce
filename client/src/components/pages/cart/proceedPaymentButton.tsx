import { useNavigate } from "react-router-dom"
import Button from "../../reusable/button"

const ProceedPaymentButton = ()=>{
    const navigate = useNavigate()
    const handleProceedTopayment = ()=>{
        navigate("/payment")
    }
    return <Button content="Make payment" type="button" onClick={handleProceedTopayment} classNames="!h-8 !text-sm lg:!h-10"/>
}

export default ProceedPaymentButton;