// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string;
      role: string;       // ✅ this must match your backend
      token: string;
    };
  }

  interface User {
    id: string;
    email: string;
    name?: string;
    role: string;
    token: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    name?: string;
    role: string;
    token: string;
  }
}
