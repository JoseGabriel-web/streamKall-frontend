import { controlBtnInterface } from "@customTypes"
import { FC } from "react"

const ControlBtn:FC<controlBtnInterface> = ({ svg, alternateSvg, state, callback, size }) => {
    
    const handleClick = () => {
        if(callback) {
            console.log('This is the callback -> ', callback)
            callback()
        }
    }
    
    return (
        <button onClick={() => handleClick()}>
            <img src={alternateSvg && !state?  alternateSvg : svg} height={size? size : "70%"} width={size? size : "70%"} style={{ maxWidth: '25px', maxHeight: '25px' }} />        
        </button>
    )
}

export default ControlBtn
