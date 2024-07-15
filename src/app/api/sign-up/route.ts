import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import dbConnection from "@/lib/db";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  await dbConnection();
  

  try {
    const { username, email, password } = await request.json();
    const verifiedUser = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (verifiedUser) {
      return Response.json(
        {
          success: false,
          message: "username already taken",
        },
        { status: 400 }
      );
    }

    const existingUserByEmail = await UserModel.findOne({
      email,
    });

    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    console.log(verifyCode)

    if (existingUserByEmail) {
      if (existingUserByEmail.isVerified) {
        return Response.json(
          {
            success: false,
            message: "User already exists with this email",
          },
          { status: 400 }
        );
      } else {
        const hashedPassword = await bcrypt.hash(password, 10)
        existingUserByEmail.password = hashedPassword;
        existingUserByEmail.verifyCode = verifyCode;
        existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000)
        await existingUserByEmail.save()
      }
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);

      const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,
        verifyCode,
        verifyCodeExpiry: expiryDate,
        isVerified: false,
        isAcceptingMessage: true,
        message: [],
      });

      await newUser.save();
    }

    //    send verification email
    const sendEmail = await sendVerificationEmail(email, username, verifyCode);

    if (!sendEmail.success) {
      return Response.json(
        {
          success: false,
          message: sendEmail.message,
        },
        { status: 500 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "User signed-up successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error signing up", error);
    return Response.json(
      {
        success: false,
        message: "Error signing-up user",
      },
      { status: 500 }
    );
  }
}
