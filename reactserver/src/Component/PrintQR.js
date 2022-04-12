import React from 'react'
import QRCode from 'qrcode'
// import { useState,useEffect } from 'react'

const PrintQR = ({qrcollection,catchselectall,checkselecall}) => {
 
  
    const qrlist = async ()=>{
        // console.log(qrcollection[0].qrurl)
        
        var win = window.open('');


        await Promise.all(qrcollection.map(async (qrdata) =>{
            const qrurl = await QRCode.toDataURL(qrdata.itemid)
            win.document.write('<img src="' + qrurl+ '" onload="window.print();window.close()" width="25%"/>')
            // win.document.write('<img src="' + eachqr.qrurl + '" onload="window.print();window.close()" width="25%"/>')
        }))
        
        win.focus();
        
    }
    
    return (
        <>
        <input type="button" value="toprintQR" onClick={qrlist}/>
        <input type="checkbox" checked={checkselecall} onChange={(e)=>{catchselectall(e.target)}}/>    
        </>
    )
}

export default PrintQR
