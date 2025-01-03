import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { users } from '../../mockData';

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {

            },
            async authorize(credentials, req) {
                const { username, password } = credentials;

                const user = users.find(u => u.username === username && u.password === password);

                if (user) {
                    return user;
                } else {
                    return null;
                }
            }
        })
    ],
    session: {
        strategy: "jwt",
        maxAge: 60 * 60, // 1 ชั่วโมง
    updateAge: 15 * 60, // ขยายเวลาอีก 15 นาทีเมื่อมีการใช้งาน
    },
    secret: process.env.SESSION_SECRET,
    pages: {
        signIn: "/",
    },
    jwt: {
      maxAge: 60 * 3,
    },
    callbacks:{
       jwt : async ({token, user, account, profile, isNewUser}) => {
            if (user) {
                token.id = user.id;
                token.username = user.username;
            }
            return token;
        },
        session : async ({token, session, account, profile, isNewUser}) => {

            if(session && session.user){
                
                session.user.id = token.id
            }
            return session
        }
    
    }

}
const port = NextAuth(authOptions)
export { port as GET, port as POST }