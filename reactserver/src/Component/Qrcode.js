import React from 'react'
import QRCode from 'qrcode'
import { useState } from 'react'

const Qrcode = ({itemid,catchqr,ifchecked}) => {
    //   With async/await
      const [qrurl,Setqrurl] = useState("")
      const generateQR = async text => {
        try {
            const qrcodeurl = await QRCode.toDataURL(text)
            Setqrurl(qrcodeurl)
            // console.log(qrcodeurl)
            // return qrcodeurl
        } catch (err) {
          console.error(err)
        }
      }
    
      generateQR(itemid)
      const checkifmatchitemid = ifchecked.some((elem)=>(elem.itemid === itemid))
    return (
    <>
    <img src={qrurl} width="50%" alt="myimage"/> <input  checked={checkifmatchitemid} type="checkbox" onChange={(e)=>{catchqr(e.target,{itemid,qrurl})}} style={{margin:"auto"}}/>
    </>
    )


}

export default Qrcode
