import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/verificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string
): Promise<ApiResponse>{
    try {
        await resend.emails.send({
            from: '<onboarding@resend.dev>',
            to: email,
            subject: 'OTP Verification',
            react: VerificationEmail({username, otp: verifyCode}),
          });  
          console.log(email)
          console.log("Email sent")
          return {success: true, message: 'Verification email sent successfullys'}
    } catch (error) {
        console.log("Error sending verification email", error)
        return {success: false, message: 'Failed to send verification email'}
}
}