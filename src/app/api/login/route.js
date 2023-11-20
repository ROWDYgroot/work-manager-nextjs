import { getResponseMessage } from "@/helper/responseMessage"
import { User } from "@/models/user"
import { NextResponse } from "next/server"
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"

export async function POST(request) {
    const {email, password} = await request.json()

    try {

       //user check
       const user = await User.findOne({email: email}) 

       if(user === null) {
        throw new Error("user not found")
       }

       //password check
       const isMatched = bcrypt.compareSync(password, user.password)

       if(!isMatched) {
        throw new Error("password not matched")
       }

       //generate token
       const token = jwt.sign({
        _id: user._id,
        name: user.name
       }, process.env.JWT_KEY)

       console.log(token);

    //    create next response
       const response = NextResponse.json({
        message: "Login success!!",
        success: true
       })
    
    response.cookies.set("authToken", token, {
        expiresIn: '1d',
        httpOnly: true
    })

    return response

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: error.message,
            success: false
        },{
            status: 500
        })
    }
}


// import { NextResponse } from "next/server";
// import { User } from "@/models/user";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// export async function POST(request) {
//   console.log("login api");
//   const { email, password } = await request.json();

//   try {
//     // 1.get user
//     const user = await User.findOne({
//       email: email,
//     });

//     if (user == null) {
//       throw new Error("user not found !!");
//     }

//     // 2.password check
//     const matched = bcrypt.compareSync(password, user.password);
//     if (!matched) {
//       throw new Error("Password not matched !!");
//     }

//     // 3. generate token

//     const token = jwt.sign(
//       {
//         _id: user._id,
//         name: user.name,
//       },
//       process.env.JWT_KEY
//     );

//     // 4.create nextresponse-- cookie

//     const response = NextResponse.json({
//       message: "Login success !!",
//       success: true,
//       user: user,
//     });

//     response.cookies.set("authToken", token, {
//       expiresIn: "1d",
//       httpOnly: true,
//     });

//     console.log(user);
//     console.log(token);

//     return response;
//   } catch (error) {
//     return NextResponse.json(
//       {
//         message: error.message,
//         success: false,
//       },
//       {
//         status: 500,
//       }
//     );
//   }
// }
