import { Alert, Box, Button, CircularProgress, IconButton, Link, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import LogoutIcon from '@mui/icons-material/Logout';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const sxStyles = {
  container: {
    paddingTop: "20px"
  },
  button: {
    width: 400, backgroundColor: '#12372a', color: "white", border: 0, padding: 10,
  },
  typography: {
    textAlign: "center"
  },
  box: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    marginTop: "14px",
    gap: "20px"
  },
  allTransactions:{
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"coolumn",
    gap:"10px",
    margin:"30px 40px 10px 40px",
    flexWrap:'wrap'
  },
  eachTransactionBox:{
    border: '2px solid #12372a',
    borderRadius: '10px',
    color: '#789461',
    width:"400px",
    height:"70vh",
    overflowY:"auto",
    "@media(max-width: 1000px)": {
      width: '60%'
    },
    "@media(max-width: 700px)": {
      width: '300px',
      height: '60vh'
    },
    "@media(max-width: 400px)": {
      width: '200px',
      height: '40vh'
    },
    '::-webkit-scrollbar': {
      width: '3px'
    }

  },
  detail:{
    display: 'grid',
    gridTemplateColumns: 'auto auto auto',
    gap: '10%',
    alignItems: 'center',
    fontSize: '18px',
    padding: '20px',
    scrollbarWidth: 'none',
    lineBreak:'anywhere',
  }

}
export default function Mytickets() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState("")
  const [openOtp, setOtpOpen] = useState(false)
  const [otpValue, setOtpValue] = useState('')
  const [seeTransactions, setSeeTransactions] = useState(false)
  const [transactions, setTransactions] = useState([])

  const handleVerifyemail = () => {
    setOtpOpen(false)
    if (email.trim().length > 0) {
      setLoading(true)
      setError('')
      axios.post(`${process.env.REACT_APP_BACKEND_API}/api/transactions/requestOtp`, { email: email })
        .then((res) => {

          setLoading(false)
          setError('')
          setOtpOpen(true)
        })
        .catch(error => {
          setLoading(false)
          setError(error?.response?.data?.error || "Please check your internate conectiion")
        })
    }
  }

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo && userInfo.email) {
      const ONE_DAY = 24 * 60 * 60 * 1000;

      if (new Date().getTime() - userInfo.savedAt < ONE_DAY) {
        axios.post(`${process.env.REACT_APP_BACKEND_API}/api/transactions/verifyOtpAndGetTransactions`, { email: userInfo.email }, {
          headers: {
            "Content-Type": "application/json",
          }
        })
          .then((res) => {
            setTransactions(res.data.tickets)
            setSeeTransactions(true)
          })
          .catch(error => {
          })
      } else {
        localStorage.removeItem('userInfo');
      }
    }

  }, [])

  const handleVerifyOtp = () => {
    setOtpOpen(false)
    if (email.trim().length > 0) {
      setLoading(true)
      setError('')
      axios.post(`${process.env.REACT_APP_BACKEND_API}/api/transactions/verifyOtpAndGetTransactions`, { email, otp: otpValue }, {
        headers: {
          "Content-Type": "application/json",
        }
      })
        .then((res) => {
          setLoading(false)
          setError('')
          localStorage.setItem('userInfo', JSON.stringify({ email: res.data.email, savedAt: new Date().getTime() }));
          setTransactions(res.data.tickets)
          setSeeTransactions(true)
        })
        .catch(error => {
          setLoading(false)
          setError(error?.response?.data?.error || "Please check your internate conectiion")
        })
    }
  }

  const resendOtp = () => {
    setOtpValue('')
    setOtpOpen(false)
  }

  const logOut=()=>{
    localStorage.removeItem('userInfo')
    window.location.href='/mytickets'
  }

  return (
    <Box sx={sxStyles.container} >
      <Typography sx={sxStyles.typography} variant='h4'>My Tickets <IconButton onClick={logOut}><LogoutIcon/></IconButton></Typography>
      {!seeTransactions && <Box sx={sxStyles.box}>
        {openOtp ?
          <>
            <TextField
              type="number"
              className="form-control"
              name="oyp"
              placeholder="Check your email"
              onChange={(e) => setOtpValue(e.target.value)}
              value={otpValue}
              style={{ width: 400 }}
            />

            <Box sx={{ textAlign: "center" }}>
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
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              style={{ width: 400 }}
            />
            <Box sx={{ textAlign: "center" }}>
              {loading ?
                <CircularProgress />
                :
                <Button style={sxStyles.button} onClick={handleVerifyemail}>Verify Email</Button>
              }
            </Box>
          </>
        }

        {error && <Alert severity="error">{error}</Alert>}
      </Box>}

      {seeTransactions &&
        <Box sx={sxStyles.allTransactions}>
          {transactions.map((e) => {
            return <EachTransactions index={e._id} data={e} />
          })}

        </Box>
      }
    </Box>
  )
}

const EachTransactions = ({ data }) => {

  return (
    <Box sx={sxStyles.eachTransactionBox}>
      
      <Box sx={{display:"flex", justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
          <div style={{width:"100%"}}><img src={data?.ticketID?.image?.filePath} style={{ width: '100%', height: 300,objectFit:'cover',borderRadius:"10px 10px 0 0" }} /></div>
          <Box sx={{padding:"10px"}}>
              <div>
                <div style={{ fontSize: 10 }}>Ticket title</div>
                <div style={{ margin: '8px 0px' }}>{data.ticketID?.title}</div>
              </div>

              <div style={{ color: 'red' }} > 
                 <LocationOnIcon /> {data.ticketID?.location}
              </div>

          </Box>
      </Box>

      <Box sx={sxStyles.detail}>
          <div>
            <div style={{ fontSize: 10 }}>Ticket number</div>
            <div style={{ margin: '8px 0px' }}>{data?.ticketNumber}</div>
          </div>
          <div>
            <div style={{ fontSize: 10 }}>Ticket type</div>
            <div style={{ margin: '8px 0px' }}>{data.ticketType.toUpperCase()}</div>
          </div>
          <div>
            <div style={{ fontSize: 10 }}>Ticket start date</div>
            <div style={{ margin: '8px 0px' }}>{moment(data.ticketID?.endDate).format('LL')}</div>
          </div>
          <div>
            <div style={{ fontSize: 10 }}>Ticket End date</div>
            <div style={{ margin: '8px 0px' }}>{moment(data.ticketID?.startDate).format('LL')}</div>
          </div>
          <div>
            <div style={{ fontSize: 10 }}>Ticket price</div>
            <div style={{ margin: '8px 0px' }}>{data.amount}ETB</div>
          </div>
          <div>
            <div style={{ fontSize: 10 }}>Status</div>
            <div style={{ margin: '8px 0px' }}>{data.status}</div>
          </div>

      </Box>
      <Link sx={{paddingLeft:"10px"}} href={`/payment/success?tx_ref=${data.tx_ref}`}>Download</Link>
      <div style={{ fontSize: 10,padding:10 }}>
           Bought at {moment(data.createdAt).format('lll')}
       </div>
     
      

    </Box>
  )
}