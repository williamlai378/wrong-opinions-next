import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredidentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from 'next-auth/providers/google'
import prismaClient from '../../../../prisma/client'
import bcrypt from 'bcrypt'

export const authOptions = {
    adapter: PrismaAdapter(prismaClient),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        CredidentialsProvider({
            name: "Credentials",
            credentials: {
                email: {label: "Email", type: 'text', placeholder: 'Email'},
                password: {label: 'Password', type: 'password'},
                username: {label: 'Username', type: 'text', placeholder: 'User Name'}
            },
            async authorize(credentials, req) {
                // check to see if email and password inputs exist
                if(!credentials.email || !credentials.password) {
                    throw new Error('Please enter an email and/or password')
                }

                // check if user exists
                const user = await prismaClient.User.findUnique({
                    where: {
                        email: credentials.email
                    }
                })

                
                if(!user || !user?.password) {
                    throw new Error("User not found")
                }
                // check to see if passwords match
                const passwordMatch = await bcrypt.compare(credentials.password, user.password);

                if(!passwordMatch) {
                    throw new Error("Incorrect Password")
                }

                return {...user, randomKey: "Hey cool"}
            }
        })
    ],
    
    secret: process.env.JWT_SECRET,
    session: {
        strategy: "jwt",
        maxAge: 4 * 60 * 60,
    },
    callbacks: {
        session: ({session, token}) => {
            return {
                ...session,
                user : {
                    ...session.user,
                    id: token.id,
                    username: token.username,
                    randomKey: token.randomKey
                }
            }
        },
        jwt: ({token, user}) => {

            if(user) {
                return {
                    ...token,
                    id: user.id,
                    key: user.randomKey,
                    username: user.username
                }
            }
            return token 
        },
        signOut: async ({token, session}) => {
            res.setHeaders("Set Cookies", "");
            token = {};
            session = {};
        }
    },
    debug: process.env.NODE_ENV === 'development'
}

const handler = NextAuth(authOptions);
export {handler as GET, handler as POST};

