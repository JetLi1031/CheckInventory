
import './App.css';
import Itemrecord from './Component/Itemrecord';
import Myitems from './Component/Myitems';
import {useState,useEffect } from 'react'




function App() {
  const [myitem,Setitem] = useState([])
  //

  //function declaration (debugged)
const getitems = async () => {
  const getmyitem = await fetch("http://localhost:8181/interface/item/")
  //  console.log(getmyitem)
   const resitem = await getmyitem.json() 
  //  console.log(resitem)
   return resitem
}

  useEffect(() => {
    const requestitems = async () => {
      const itemfromserver = await getitems()
      console.log(itemfromserver)
      Setitem(itemfromserver)
    }

    requestitems()
  }, [])


const deleteitem = async (id) => {
  /*const deleteres =*/ await fetch(
    `http://localhost:8181/interface/item/${id}`,
    {
    method : "DELETE"
  })
  // console.log(deleteres)
  // const check =myitem.filter((filteritem)=>(filteritem._id !== id))
  // console.log(check)
  Setitem(myitem.filter((filteritem)=>(filteritem._id !== id)))
  // console.log(myitem)
}

const additem  = async (itemcollection) => {
  // console.log(credential)
  const formres = await fetch(
    "http://localhost:8181/interface/item",
    {
    method : "POST",
    headers: {
      'Content-type':'application/json',
    },
    body: JSON.stringify(itemcollection)
  })

  const sevres = await formres.json()
  Setitem([...myitem,sevres])
  console.log(myitem)

}

const updateitem  = async (updaterequired) => {
  // console.log(credential)
  const formres = await fetch(
    "http://localhost:8181/interface/item",
    {
    method : "PUT",
    headers: {
      'Content-type':'application/json',
    },
    body: JSON.stringify(updaterequired)
  })

  /*const sevres = */await formres.json()
  // Setitem([...myitem,sevres])
  // console.log(myitem)
  Setitem(await getitems())
}

  return (
    <div className="App">
      <Itemrecord onAdd={additem}/>
      <Myitems showitem={myitem} toDelete={deleteitem} toUpdate={updateitem}> </Myitems>
      
    </div>
  );
}

export default App;
