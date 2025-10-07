import express from 'express';
import dotenv from 'dotenv';
dotenv.config()
import cookieparser from 'cookie-parser'
import cors from 'cors'

const app = express()


app.use(cors({
    origin : process.env.FRONTEND_URL,
    methods : ['GET', 'POST', 'PUT', 'DELETE'],
    credentials : true,
    // optionsSuccessStatus : 200,
}))


// using middleeares

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cookieparser())


// import all router here
import authRouter from './routes/auth.router.js'
import userRouter from './routes/user.router.js'
import shopRouter from './routes/shop.router.js'
import productRouter from './routes/product.router.js'


app.use('/api/v1/auth', authRouter)
app.use('/api/v1/user', userRouter)
app.use('/api/v1/shop', shopRouter)
app.use('/api/v1/product', productRouter)

export {app};
