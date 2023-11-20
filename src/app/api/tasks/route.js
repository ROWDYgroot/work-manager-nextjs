import { getResponseMessage } from "@/helper/responseMessage";
import { Task } from "@/models/task"
import { NextResponse } from "next/server"

export const GET = async (request) => {
    try {
        const tasks = await Task.find()
        return NextResponse.json(tasks);
    } catch (error) {
        console.log(error);
        return getResponseMessage("Error in getting data", 404, false)
    }
}

export const POST = async (request) => {

    try {
        const { title, content, userId } = await request.json()
        const task = new Task({
            title, 
            content, 
            userId 
        })

        const createdTask = await task.save();

        return NextResponse.json(createdTask, {
            status: 201
        })
        
    } catch (error) {
        console.log(error);
        return getResponseMessage("failed to create task", 400, false)
    }
}
