import React, { useEffect, useRef, useState } from 'react'

const OtpInput = ({length=4,onOtpSubmit=()=>{}}) => {
    const [otp,setotp] = useState(new Array(length).fill(""));
    const inputref = useRef([]);

    const handleonChange =(index,e)=>{
        const value   = e.target.value;
        if(isNaN(value)) return;
        const newotp =[...otp];
        newotp[index]=value.substring(value.length-1);
        setotp(newotp);

        //submit trigger
        const combinedotp = newotp.join("");
        if(combinedotp.length===length) onOtpSubmit(combinedotp);
        
        // move to next input
        if(value && index<length-1 && inputref.current[index+1]){
            if(index<length-2 && otp[index+1]){
                inputref.current[index+2].focus();
            }
            else{
                inputref.current[index+1].focus();
            }
            

    
        }



    };
    const handleonClick =(index)=>{
        inputref.current[index].setSelectionRange(1,1);

        //move to previous if it is empty
        if(index>0 && !otp[index-1]){
            inputref.current[otp.indexOf("")].focus();
        }
        
    };

    const handleonkeydown = (index,e)=>{
        if(e.key==="Backspace" && !otp[index] && index>0 && inputref.current[index-1] ){
            inputref.current[index-1].focus();
        }

    }

    useEffect(()=>{
        if(inputref.current[0]){
            inputref.current[0].focus();
        }
    },[]);

  return (
    <div>
        {otp.map((value,index)=>{
            return (
                <input
                key={index}
                ref={(input)=> inputref.current[index]=input}
                type='text'
                value={value}
                onChange={(e)=>handleonChange(index,e)}
                onClick={()=>handleonClick(index)}
                onKeyDown={(e)=>handleonkeydown(index,e)}
                className='otpinput'


                />
            );
        })}
    </div>
  )
}

export default OtpInput