import { connectDb } from "@/helper/db"
import { User } from "@/models/user"
import { NextResponse } from "next/server"
import bcrypt from 'bcryptjs'

connectDb()

export async function GET(request) {
    let users = []
    try {
       users = await User.find(); 
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: 'failed to get user!!',
            success: false
        })
    }
    return NextResponse.json(users)
}

export async function POST (request) {
    const { name, email, password, about, profileURL } = await request.json();

    console.log({ name, email, password, about, profileURL });

    const user = new User({
        name, 
        email, 
        password, 
        about, 
        profileURL
    })

    try {
        user.password = bcrypt.hashSync(user.password, parseInt(process.env.BCRYPT_SALT))
        console.log(user);
        const createdUser = await user.save();
        const response = NextResponse.json(user, {
            status: 201,
        })
        return response
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: 'failed to create user!!',
            status: false
        }, {status: 500})
    }
}

// export async function POST(request) {
//     // const body = request.body
//     // console.log(body);
//     // console.log(request.method);
//     // console.log(request.cookies);
//     // console.log(request.headers);
//     // console.log(request.nextUrl.pathname);
//     // console.log(request.nextUrl.searchParams);
//     // const jsonData = await request.json()
//     // console.log(jsonData);

//     // const textData = await request.text()
//     // console.log(textData);

//     const { name, email, password, about, profileURL } = await request.json();

//     //create user object with user model
//     const user = new User({
//         name, 
//         email, 
//         password, 
//         about, 
//         profileURL 
//     })

//     try {
//         // save the object to database
//         const createdUser = await User.save();

//         const response = NextResponse.json(user, {
//             status: 201,
//         })
    
//         return response 
//     } catch (error) {
//         console.log(error);
//         return NextResponse.json({
//             message: 'failed to create user',
//             status: false
//         })
//     }
// }

export function DELETE(request) {
    console.log(`delete api called`);
    return NextResponse.json({
        message: 'deleted !!',
        status: true
    }, {status: 201, statusText: 'status text'})
}

export function PUT() {

}