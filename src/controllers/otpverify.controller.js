import { config } from "dotenv";
import database from "../config/db.js";
import { promisify } from "util";
import { errorResponse } from '../utils/libs/response.js';


config();

const expiryMessage = `Otp is expired....request another otp`
const invalidUser = `Invalid User`


const getOtp = async (req, res) =>{
res.send('get request for otp route reached ')
}

const queryPromise = promisify(database.query).bind(database);

const verifyOtp = async (req, res, next) =>{

  let attempt = 0;

  const { otp } = req.body;

  if (!otp){
    return errorResponse(res, 'otp can not be empty', 400)
  }

  const user_id = otp.slice(6)
  console.log(user_id)

  const otpresult = await queryPromise(`SELECT * FROM otp WHERE user_id = ?`, [user_id]);
  console.log(otpresult)

  if (!otpresult[0]){
    return errorResponse(res, invalidUser, 400);
  }

  console.log(new Date(otpresult[0].expired_at) > new Date())
  console.log(new Date(otpresult[0].expired_at), 'and', new Date())
  // let time =JSON.stringify(new Date())
  // time = time.split('T').join(" ").split('Z').join(" ")
  // console.log(time)
  // console.log(String(otpresult[0].expired_at))
  // console.log(typeof time)

  if (new Date(otpresult[0].expired_at) > new Date()){
    if (otp === otpresult[0].otp){
      // delete otp from database
      await queryPromise(`DELETE FROM otp WHERE user_id = ?`, [user_id])
      // redirect to reset password page
      res.redirect(`http://localhost:${process.env.PORT}/v1/resetpassword/:${user_id}`)
    }else{
      return errorResponse(res, "please verify the otp code and try again", 400)
    }
  }else{
    return errorResponse(res, expiryMessage, 400)
  }


  
}



  // jwt decode and verify the id 
  // verify the otp
  // if valid user, carry out the rest logic on that user
//   try{
//     let payload  = jwt.verify(token, secret_key)

   
//     const verifyOtp = (attempt)=>{
//       if (attempt > 2){
//         return res.status(400).json('Try again in the next 1 hour')
//       }
//       if (otp === payload.otp){
//         return res.status(200).json('valid otp code')
//       }else{
//         attempt ++
//         res.status(400).json(`invalid otp. just ${3 - attempt} attemps left`)
//         verifyOtp(attempt)
//       }
//     }

    
//     verifyOtp(attempt);
//     // while (attempt < 3){
//     //   if (otp === payload.otp){
//     //     return res.status(200).json('valid otp')
//     //   }else{
//     //     attempt ++;
//     //     if (attempt === 3){
//     //       return res.status(400).json('try again in the next 1 hour');
//     //     }else{
//     //       res.status(400).json(`please verify the otp code and try again again. ${attempt} attemps left`)
//     //     }
//     //   }
//     // }

//     // while (attempt < 3){
//     //   if (otp !== payload.otp && attempt < 3){
//     //     attempt += 1;
//     //     return res.json(`please verify the otp and try again. just ${3 - attempt} attempt left`)
//     //   }else{
//     //     if (otp === payload.otp){
//     //       return res.json('valid otp code')
//     //     }else{
//     //       return res.json('try again in the next 1 hour')
//     //     }  
//     //   }

//     // }
//     // for (attempt; attempt < 3; attempt++){
//     //   if (otp === payload.otp){
//     //     res.json('valid otp')
//     //     break;
//     //   }else{
//     //     res.json(`please verify the otp and try again, just ${2 - attempt} attempt left`)
//     //     continue
//     //     next()
//     //     }
//     //   }
//     //   if (attempt > 3){
//     //     res.json('Try again in the next 1 hour')
//     // }
//   }catch(error){
//     res.json(error.message)
//     next()
//   }
  

// }


export default  { getOtp, verifyOtp } ;