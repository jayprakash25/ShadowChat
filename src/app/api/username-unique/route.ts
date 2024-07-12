import dbConnection from "@/lib/db";
import UserModel from "@/model/User";
import {z} from "zod"
import { usernameValidation } from "@/schemas/signupSchema";


const querySchema =   z.object({
    username: usernameValidation
})

export async function GET(request: Request) {

    

    await dbConnection();

    try {
        const { searchParams } = new URL(request.url)
        const queryParams = {
            username: searchParams.get('username')
        }

        //validate using zod
        const result = querySchema.safeParse(queryParams)

        console.log(result);

        if(!result.success){
            const errors = result.error.format().username?._errors || []
            return Response.json(
                {
                    success: false,
                    message: 'Invalid query parameter'
                }, 
                {
                    status: 400
                }
            )
        }

        const {username} = result.data;

        const existingUser = await UserModel.findOne({username, isVerified: true})

        if(existingUser){
            return Response.json(
                {
                    success: false,
                    message: 'username already in use'
                }, 
                {
                    status: 400
                }
            ) 
        }



        return Response.json(
            {
                success: true,
                message: 'username is unique'
            },
            {
                status: 200
            }
        )

    } catch (error) {
        console.log("error validating username",error)
        return Response.json(
            {
                success: false,
                message: "Error checking username"
            },
            {
                status: 500
            }
        )
    }
}