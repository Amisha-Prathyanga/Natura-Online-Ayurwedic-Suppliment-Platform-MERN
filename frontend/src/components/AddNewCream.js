import React, { useState } from 'react';
import axios from 'axios';

export default function AddNewCream() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [type, setType] = useState('');
    const [mfd, setMfd] = useState('');
    const [exp, setExp] = useState('');
    const [weight, setWeight] = useState(0);

    const handleDropdown = (event) =>{
        setType(event.target.value)
    }

    function sendCreamData(event){
        event.preventDefault();

        const newCream = {
            name, description, price, quantity, type, mfd, exp, weight
        };

        axios.post("http://localhost:8002/cream/addCream/", newCream)
        .then((res) =>{
            console.log(res);
        })
        .catch((err) =>{
            console.log(err);
        });
    }

  return (
    <div>
        <form>
            <input
                type='text'
                placeholder='Name'
                name='name'
                onChange={(event) => {
                    setName(event.target.value)
                }}
            />
            <input
                type='text'
                placeholder='Description'
                name='description'
                onChange={(event) => {
                    setDescription(event.target.value)
                }}
            />
            <input
                type='text'
                placeholder='Price'
                name='price'
                onChange={(event) => {
                    setPrice(event.target.value)
                }}
            />
            <input
                type='text'
                placeholder='Quantity'
                name='quantity'
                onChange={(event) => {
                    setQuantity(event.target.value)
                }}
            />
            <input
                type='text'
                placeholder='Type'                  
                name='type'
                value={type}
                onChange={(event) => {
                    setType(event.target.value)
                }}
            />
            <select value={type} onChange={handleDropdown}>
                <option value="">Select and option</option>
                <option value="Option 1">Option 1</option>
                <option value="Option 2">Option 2</option>
                <option value="Option 3">Option 3</option>
            </select>
            <input
                type='date'
                placeholder='Manufactured Date'
                name='mfd'                          
                onChange={(event) => {
                    setMfd(event.target.value)
                }}
            />
            <input
                type='date'
                placeholder='Expiry Date'
                name='exp'            
                onChange={(event) => {
                    setExp(event.target.value)
                }}
            />
            <input
                type='text'
                placeholder='Weight'
                name='weight'
                onChange={(event) => {
                    setWeight(event.target.value)
                }}
            />
            <input type='submit' onClick={sendCreamData}/>
        </form>
    </div>
  )
}
