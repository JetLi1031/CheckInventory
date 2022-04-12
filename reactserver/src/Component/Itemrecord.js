import PropTypes from 'prop-types'
import {useState} from 'react'



const Itemrecord = (props) =>{
    const [item,Setitemname] = useState('')
    const [usage,Setitemusage] = useState('')
    const [stock,SetitemStock] = useState('')
   

    
    const preventrefresh  = (e) => {
        e.preventDefault()
        // console.log("dawdaw")
        if(item.length === 0 ||usage.length === 0 || stock === 0)
        {alert("all filed must be filled !"); return} 
        props.onAdd({item,usage,stock})
        Setitemname('')
        Setitemusage('')
        SetitemStock('')
    }
    return(
     
        <form onSubmit={preventrefresh}> 
        <label htmlFor="name">Item :  </label>
        <input 
        id="name" 
        type="text" 
        value={item}
        onChange={(e) => Setitemname(e.target.value)}/> <br/>
        <label htmlFor="usage" type="text" >Usage :  </label>
        <input 
        id="itemusage" 
        type="text" 
        value={usage}
        onChange={(e) => Setitemusage(e.target.value)}/> <br/>
        <label htmlFor="stock" type="text" >Stockavailable :  </label>
        <input 
        id="Stock" 
        type="text" 
        value={stock}
        onChange={(e) => SetitemStock(e.target.value)}/> <br/>
        <input type="Submit" readOnly value="Submit" />  
        </form>
     

    )
    

}



export default Itemrecord;