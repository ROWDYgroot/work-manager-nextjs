// import { User } from "../../../../models/user";
import { User } from "@/models/user";
import { NextResponse } from "next/server";

export const GET = async (request, {params}) => {
    const { userId } = params;

    const user = await User.findById(userId).select('-password')
    return NextResponse.json(user)
}

export async function DELETE(request, {params}) {
    
    const  { userId } = params
    
    try {
        await User.deleteOne({
            _id: userId,
        })

        return NextResponse.json({
            message: 'user deleted',
            success: true,
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: 'error in deleting user',
            success: false,
        })
    }
}

export const PUT = async (request, {params}) => {
    const { userId } = params

    const { name, password, about, profileURL } = await request.json();

    try {
        const user = await User.findById(userId)

        user.name = name;
        user.password = password;
        user.about = about;
        user.profileURL = profileURL;

        const updatedUser = await user.save()
        return NextResponse.json(updatedUser)

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: 'failed to update',
            success: false,
        })
    }
}