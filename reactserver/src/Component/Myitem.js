import React from 'react'
import './Myitem.css';
import { useState } from 'react'
import Qrcode from './Qrcode'

const Myitem = ({onDelete,item,number,update,tocatchqr,tocheck}) => {
    const [edit, setEdit] = useState(false)
    const [name,Setitemname] = useState('')
    const [usage,Setitemusage] = useState('')
    const [stock,SetitemStock] = useState('')
  
    

    const edittext = (e,itemid)=> {
        setEdit(!edit)
        if(edit === true){ 
            if(name.length === 0 ||usage.length === 0 || stock === 0){alert("empty filed are not allow"); return}
            console.log({itemid,name,usage,stock})
            update({itemid,name,usage,stock})
        }
    }



    return (
        <div className ="toshow first">
            <div>{String(number+1)}</div>
            <div>{!edit?(item.Item):(<input type="text" value={name} onChange={(e)=>Setitemname(e.target.value)}></input>)} </div>
            <div> {!edit?item.ITEMusage:(<input type="text" value={usage} onChange={(e)=>Setitemusage(e.target.value)}></input>)}</div>
            <div> {!edit?item.Stockavailable:(<input type="text"value={stock} onChange={(e)=>SetitemStock(e.target.value)}></input>)}</div>
            <div> {item.updated_at}</div>
            <div> 
                <div><input type="button" value="Delete" onClick={() => onDelete(item._id)}></input></div>
                <div><input type="button" value={!edit?"Edit":"Update"} onClick={(e) => edittext(e,item._id)}></input></div>
            </div>
            <div style={{display:"flex"}}> <Qrcode itemid={item._id} catchqr={tocatchqr} ifchecked={tocheck}/> </div>
        </div>
    )
}

export default Myitem
