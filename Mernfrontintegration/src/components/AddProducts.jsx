import React, { useState } from 'react'
import { API } from '../utils/api';
export default function AddProducts() {
const [name,setName]=useState("")
const [description,setDescription]=useState("")
const [price,setPrice]=useState(0)
const [image,setImage]=useState("")
   const handleSubmit =async(e)=>{
    e.preventDefault();
    try {
        const res = await fetch(`${API}/api/postProducts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
      name,
      description,
      price,
      image
    })});
      if (res.ok) {
        alert("Product Added Successfully!");
        setName("");
        setDescription("");
        setPrice("");
        setImage("");
      }    
    } catch (error) {
      console.log(error);
      alert("Server error");  
    }
   }
  return (
   <div>
    <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={name}
          onChange={(e)=>{setName(e.target.value)}}
        /><br />
         <input
          type="text"
          name="description"
          placeholder="Description"
          value={description}
          onChange={(e)=>{setDescription(e.target.value)}}
        /><br />
          <input
          type="number"
          name="price"
          placeholder="Price"
          value={price}
          onChange={(e)=>{setPrice(e.target.value)}}
        /><br />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={image}
          onChange={(e)=>{setImage(e.target.value)}}
        /><br />
        <button type="submit">Add Product</button>

    </form>
   </div>
  )
}