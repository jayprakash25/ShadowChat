import dbConnection from "@/lib/db";
import UserModel from "@/model/User";

export async function POST(request: Request) {
  await dbConnection();
  try {
    const { username, code } = await request.json();

    const decodedUsername = decodeURIComponent(username);
    const user = await UserModel.findOne({ username: decodedUsername });

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 500 }
      );
    }

    const isCodeValid = user.verifyCode === code;
    const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

    if (isCodeValid && isCodeNotExpired) {
      user.isVerified = true;
      await user.save();

      return Response.json(
        {
          success: true,
          message: "User Successfully Created",
        },
        { status: 200 }
      );
    } else if(!isCodeNotExpired){
        return Response.json(
            {
              success: false,
              message: "Verification Code expired.",
            },
            { status: 400 }
          );
    } else if(!isCodeValid){
        return Response.json(
            {
              success: false,
              message: "Verification code not valid"
            },
            { status: 400 }
          );
    }
  } catch (error) {
    console.log("error in verifying", error);
    return Response.json(
      {
        success: false,
        message: "Error verifying username",
      },
      {
        status: 500,
      }
    );
  }
}
