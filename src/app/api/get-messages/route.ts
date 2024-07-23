import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnection from "@/lib/db";
import UserModel from "@/model/User";
import { User } from "next-auth";
import mongoose from "mongoose";

export async function GET(request: Request) {
  await dbConnection();
  const session = await getServerSession(authOptions);
  const _user: User = session?.user;

  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "Not authenticated",
      },
      { status: 401 }
    );
  }

  const userId = new mongoose.Types.ObjectId(_user._id);

  try {
    const user = await UserModel.aggregate([
      { $match: { _id: userId, "message.0": {$exists: true} } },
      { $unwind: "$message" },
      { $sort: { "message.createdAt": -1 } },
      { $group: { _id: "$_id", message: { $push: "$message" } } },
    ]);
 
    if (!user[0]) {
      return Response.json(
        {
          success: false,
          message: "No messages for you in the database",
        },
        {
          status: 401,
        }
      );
    }

    console.log(user[0])

    if(!user[0].message) {
      return Response.json(
        {
          success: true,
          message: "No messages found",
        },
        {
          status: 200,
        }
      );
    }

    return Response.json(
      {
        success: true,
        messages: user[0].message,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("error occured at get messages", error);
    return Response.json(
      {
        success: false,
        message: "Internal server error",
      },
      {
        status: 500,
      }
    );
  }
}
