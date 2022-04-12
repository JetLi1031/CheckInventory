import React,{ useState,useEffect } from 'react'
import Myitem from './Myitem';
import './Myitem.css';
import PrintQR from './PrintQR';

const Myitems = ({showitem,toDelete,toUpdate}) => {
    const [qrarray,Setqrarray] = useState([])
    // const [ifchecked,Setifchecked] = useState([]) // Problem found
    const [ifselectall,Setselectall] = useState(false)
    // const getlegth = async ()=> {return await showitem.length}

    useEffect(() => {
        Setselectall(qrarray.length === showitem.length)
    }, [qrarray,showitem]);
    
    
    const catchqritem = (event,itemidanddata) => {
        
        if(event.checked === true){
            Setqrarray([...qrarray,itemidanddata])
        }
        else{Setqrarray(qrarray.filter((qrid)=> (qrid.itemid !== itemidanddata.itemid)))
            Setselectall(false)
        }
        // console.log(qrarray)
    }
    const selectallfunc = (eventtarget) => {
        // Array.from(Array(showitem.length),x => false)
        Setselectall(!ifselectall)  
        if(eventtarget.checked === true){  
            const arrofdicforitemid = showitem.map(item => ({itemid:item._id}))   
        
            Setqrarray(arrofdicforitemid)
        }
        else{
            Setqrarray([])
         }
        }
   // Setifchecked([false]) //callling function
    return (
        <div>
        {showitem.length>0 ? (<div className='toshow' >
            <div> No. </div>
            <div> My item</div>
            <div> item usage </div>
            <div> stock available </div>
            <div> last updated </div>
            <div> Option </div>
            <div> Qrcode print</div>
        </div>):null}
        
        {
            showitem.map((item,index) => {
                return <Myitem item={item} key={index} number={index} onDelete={toDelete} update={toUpdate} tocatchqr={catchqritem} tocheck={qrarray}/>})
        }
        {showitem.length>0 ?<PrintQR qrcollection={qrarray} checkselecall={ifselectall} catchselectall={selectallfunc}/>:null}
        </div>
        // <div>
        //    <Item onDelete={} items={}></Item> 
        // </div>
    )
}

export default Myitems
