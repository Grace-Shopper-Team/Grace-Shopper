import { Action } from 'history';
import React, { useEffect, useState } from 'react';
import {useAtom} from 'jotai'
import CheckOutlogIn from './Store/CheckOutlogIn'

const GuessForm = (props) => {
    const [CheckOutIn] = useAtom(CheckOutlogIn)
    console.log("hola_____", CheckOutIn)
    return (
        <form
        action= 'http://localhost:3000/api/cart/stripe'
        method= 'POST'>
            <div>
                <label htmlFor='firstname'>
                    <small>First Name</small>
                </label>
                <input name='firstname' type='text' required />
        </div>
        <div>
            <label htmlFor='lastname'>
                <small>Last Name</small>
            </label>
            <input name='lastname' type='text' required />
         </div>
         <div>
            <label htmlFor='email'>
                 <small>Email</small>
             </label>
             <input
            name='email'
             type='text'
             required/>
             <span style={{ color: 'red' }}></span>
         </div>
         <div>
             <label htmlFor='address'>
                 <small>Address</small>
             </label>
            <input name='address' type='text' />
        </div>
         <div>
             <label htmlFor='city'>
                 <small>City</small>
             </label>
             <input name='city' type='text' />
         </div>
         <div>
             <label htmlFor='state'>
                 <small>State</small>
            </label>
             <select name='state' defaultValue='default'>
                <option value='default' disabled>
                     Select a State
                 </option>
                {states.map((state) => (
                <option key={state} value={state}>
                    {state}
                </option>
            ))}
            </select>
        </div>
         <div>
            <label htmlFor='zip'>
                 <small>Zipcode</small>
            </label>
            <input name='zip' type='number' />
        </div>
        <button type='submit'
        >Submit</button>
        </form>
    )
}

const states = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
    'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia',
    'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
    'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland',
    'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
    'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
    'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma',
    'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
    'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia',
    'Washington', 'West Virginia', 'Wisconsin', 'Wyoming',
  ];

export default GuessForm;