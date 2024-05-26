import { Alert, Box, Button, CircularProgress, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const sxStyles={
    container:{
        paddingTop:"100px"
    },
    button:{width: 400, backgroundColor: '#12372a',color:"white", border: 0, padding: 10,
    },
    typography:{
        textAlign:"center"
    },
    box:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"column",
        marginTop:"14px",
        gap:"20px"
    }
}
export default function Mytickets() {
  const [email,setEmail] =useState("")
  const [error,setError] =useState("")
  const [loading,setLoading] =useState("")
  const [openOtp,setOtpOpen] =useState(false)
  const [otpValue,setOtpValue] =useState('')
  const [seeTransactions,setSeeTransactions] =useState(false)
  const [transactions,setTransactions] =useState([])

  const handleVerifyemail=()=>{
    setOtpOpen(false)
    if(email.trim().length>0){
        setLoading(true)
        setError('')
         axios.post(`${process.env.REACT_APP_BACKEND_API}/api/transactions/requestOtp`,{email:email})
         .then((res)=>{
            console.log(res);
            setLoading(false)
            setError('')
            setOtpOpen(true)
         })
         .catch(error=>{
            console.log(error);
            setLoading(false)
            setError(error?.response?.data?.error||"Please check your internate conectiion")
         })
    }
  }

  useEffect(()=>{
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    console.log(userInfo);
    if(userInfo&&userInfo.email){
        const ONE_DAY = 24 * 60 * 60 * 1000;

        if (new Date().getTime() - userInfo.savedAt < ONE_DAY) {
             axios.post(`${process.env.REACT_APP_BACKEND_API}/api/transactions/verifyOtpAndGetTransactions`,{email:userInfo.email},{
                headers:{
                    "Content-Type": "application/json",
            }
             })
             .then((res)=>{
                console.log(res);
                setTransactions(res.data.tickets)
                setSeeTransactions(true)
             })
             .catch(error=>{
                console.log(error);
             })
        }else{
            localStorage.removeItem('userInfo');
        }
    }

  },[])

  const handleVerifyOtp=()=>{
    setOtpOpen(false)
    if(email.trim().length>0){
        setLoading(true)
        setError('')
         axios.post(`${process.env.REACT_APP_BACKEND_API}/api/transactions/verifyOtpAndGetTransactions`,{email,otp:otpValue},{
            headers:{
                "Content-Type": "application/json",
        }
         })
         .then((res)=>{
            console.log(res);
            setLoading(false)
            setError('')
            localStorage.setItem('userInfo', JSON.stringify({email:res.data.email,savedAt:new Date().getTime()}));
            setTransactions(res.data.tickets)
            setSeeTransactions(true)
         })
         .catch(error=>{
            console.log(error);
            setLoading(false)
            setError(error?.response?.data?.error||"Please check your internate conectiion")
         })
    }
   }
  
   const resendOtp=()=>{
    setOtpValue('')
    setOtpOpen(false)
   }

  return (
    <Box sx={sxStyles.container} >
         <Typography sx={sxStyles.typography} variant='h4'>My Tickets</Typography>
         {!seeTransactions&&<Box sx={sxStyles.box}>
             {openOtp ?
               <>
                <TextField
                    type="number"
                    className="form-control"
                    name="oyp"
                    placeholder="Check your email"
                    onChange={(e)=>setOtpValue(e.target.value)}
                    value={otpValue}
                    style={{width: 400}}
                />

                <Box sx={{textAlign:"center"}}>
                        {loading ? 
                        <CircularProgress />
                        :
                        <Button style={sxStyles.button} onClick={handleVerifyOtp}>Verify OTP</Button>
                        }
                </Box>
                <Box><Button onClick={resendOtp}>Resend</Button></Box>
               </>
             
             :
               <>
                    <TextField
                                type="email"
                                className="form-control"
                                name="email"
                                placeholder="you@example.com"
                                onChange={(e)=>setEmail(e.target.value)}
                                value={email}
                                style={{width: 400}}
                            />
                    <Box sx={{textAlign:"center"}}>
                        {loading ? 
                        <CircularProgress />
                        :
                        <Button style={sxStyles.button} onClick={handleVerifyemail}>Verify Email</Button>
                        }
                    </Box>
               </>
             }

           {error&&<Alert severity="error">{error}</Alert>}
         </Box>}

         {seeTransactions&&
           <Box>
                {transactions.map((e)=>{
                    return <EachTransactions index={e._id} data={e} />
                })}

           </Box>
         }
    </Box>
  )
}

const EachTransactions=({data})=>{

    return(
        <Box>
             {data.ticketNumber}
        </Box>
    )
}