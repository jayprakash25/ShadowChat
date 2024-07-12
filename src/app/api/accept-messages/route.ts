import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnection from "@/lib/db";
import UserModel from "@/model/User";
import { User } from "next-auth";

export async function POST(request: Request) {
  await dbConnection();

  const session = await getServerSession(authOptions);
  const user: User = session?.user;

  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "Not authenticated",
      },
      { status: 401 }
    );
  }

  const userId = user._id;
  const { acceptMessages } = await request.json();

  try {
    const updateUser = await UserModel.findByIdAndUpdate(
      userId,
      {
        isAcceptingMessage: acceptMessages,
      },
      { new: true }
    );


    if(!updateUser){
        return Response.json(
            {
              success: false,
              message: "failed to update message status",
            },
            {
              status: 401,
            }
          );
    }

    return Response.json(
        {
          success: true,
          message: "updated message status",
          updateUser
        },
        {
          status: 200,
        }
      );

  } catch (error) {
    console.log("Failed to update message status", error);
    return Response.json(
      {
        success: false,
        message: "failed to update message status",
      },
      {
        status: 500,
      }
    );
  }
}


export async function GET(request: Request){

    await dbConnection();

  const session = await getServerSession(authOptions);
  const user: User = session?.user;

  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "Not authenticated",
      },
      { status: 401 }
    );
  }

  const userId = user._id;



  try {
    
    const foundUser = await UserModel.findById(userId);

    if(!foundUser){
    return Response.json(
      {
        success: false,
        message: "User not found",
      },
      {
        status: 500,
      }
    );
    }

    return Response.json({
        success: true,
        isAcceptingMessage: foundUser.isAcceptingMessage
    })


  } catch (error) {
    console.log("Failed to update message status", error);
    return Response.json(
      {
        success: false,
        message: "error in getting message status",
      },
      {
        status: 500,
      }
    );
  }

}