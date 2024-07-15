import "next-auth";

declare module "next-auth" {
  interface User {
    _id?: string;
    isVerified?: boolean;
    isAcceptingMessage?: boolean;
    username?: String;
  }

  interface Session {
    user: {
      _id?: String;
      isVerified?: boolean;
      isAcceptingMessage?: boolean;
      username?: String;
    } & DefaultSession['user']
  }
}

declare module "next-auth/jwt"{
    interface JWT{
       _id?: String;
       isVerified?: boolean;
       isAcceptingMessage?: boolean;
       username?: String
    }
}
