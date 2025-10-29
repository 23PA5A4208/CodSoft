const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
app.use(cors());
app.use(bodyParser.json());

let otpStore = {}; // in-memory store: phone -> otp

function genOtp(){ return Math.floor(100000 + Math.random()*900000).toString(); }

app.post('/send-otp',(req,res)=>{
  const {phone} = req.body;
  if(!phone) return res.status(400).json({error:'phone required'});
  const otp = genOtp();
  otpStore[phone] = otp;
  console.log('OTP for',phone,'=',otp);
  return res.json({ok:true, message:'OTP generated (see server logs in real demo)'}); // do not return otp in real apps
});

app.post('/verify-otp',(req,res)=>{
  const {phone, otp} = req.body;
  if(!phone || !otp) return res.status(400).json({error:'phone and otp required'});
  if(otpStore[phone] && otpStore[phone] === otp){
    delete otpStore[phone];
    return res.json({ok:true, message:'verified'});
  } else {
    return res.status(400).json({ok:false, message:'invalid otp'});
  }
});

const port = process.env.PORT || 4000;
app.listen(port, ()=>console.log('Mock backend listening on',port));
