import React, { useState } from 'react'
import OtpInput from './OtpInput';

const OtpLoginForm = () => {
    const [phoneNumber , setPhoneNumber] = useState("");
    const [isphoneNumber,setIsphoneNumber] = useState(false);

    const handlesubmit = (event)=>{
        event.preventDefault();

        //Phone Number validation
        const regex =/[^0-9]/g;
        if(phoneNumber.length<10 || regex.test(phoneNumber)){
            alert("Invalid Phone Number")
            return;
        }
        //BE API
        //OTP interface
        setIsphoneNumber(true);
    }
    const handlephonenumber = (event)=>{
        setPhoneNumber(event.target.value);
    }

    const onOtpSubmit = (otp)=>{
        alert(`Login Successfully ${otp}`);
    }

  return (
    <div>
        {!isphoneNumber?
        <form onSubmit={handlesubmit} >
            <input type='text'
            value={phoneNumber} placeholder='Enter Phone Number'
            onChange={handlephonenumber} 
            />
            <button type='submit'>Submit</button>
        </form>
        :<div>
            <p>OTP sent to {phoneNumber}</p>
            <OtpInput length={4} onOtpSubmit={onOtpSubmit}/>
        </div>}
    </div>
  )
}

export default OtpLoginForm