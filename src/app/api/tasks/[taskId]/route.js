import { getResponseMessage } from "@/helper/responseMessage"
import { Task } from "@/models/task"
import { NextResponse } from "next/server"

export const GET = async (request, {params}) => {
    const { taskId } = params
    
    try {
        const task = await Task.findById(taskId)
        return NextResponse.json(task)
    } catch (error) {
        console.log(error);
        return getResponseMessage("error in gettint task!!", 404, false)
    }
}

export const PUT = async (request, {params}) => {
    
    try {
        const { taskId } = params

        const { title, content, status } = await request.json()

        let task = await Task.findById(taskId)

        task.title = title
        task.content = content
        task.status = status

        const updatedTask = await task.save()
        return NextResponse.json(updatedTask)
    } catch (error) {
        console.log(error);
        return getResponseMessage('failed to update', 400, false)
    }
}

export const DELETE = async (request, {params}) => {
    try {
        const { taskId } = params

        await Task.deleteOne({
            _id: taskId,
        })
        return getResponseMessage("Task deleted", 201, true)
    } catch (error) {
        console.log(error);
        return getResponseMessage("failed to delete !!", 404, false)
    }

}

