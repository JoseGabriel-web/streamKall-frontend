import { controlBtnInterface } from "@customTypes"
import { FC } from "react"

const ControlBtn:FC<controlBtnInterface> = ({ svg, alternateSvg, state, callback }) => {
    
    const handleClick = () => {
        if(callback) {
            console.log('This is the callback -> ', callback)
            callback()
        }
    }
    
    return (
        <button onClick={() => handleClick()}>
            <img src={alternateSvg && !state?  alternateSvg : svg} height="70%" width="70%" style={{ maxWidth: '25px', maxHeight: '25px' }} />        
        </button>
    )
}

export default ControlBtn
