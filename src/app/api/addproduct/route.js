import {users} from '../mockData';
import { connetMongoDB } from '@lib/mongodb';
import Post from '@models/schema';
import { NextResponse } from 'next/server';

export async function GET() {
    // const res = await fetch('https://data.mongodb-api.com/...', {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'API-Key': process.env.DATA_API_KEY,
    //   },
    // })
    // const data = await res.json()
   
    return Response.json(users)
  }

  export async function POST(req) {
    const {
      name,
      image,
      points,
      expiryDate,
      description,
    } = await req.json();
   await connetMongoDB();
   await Post.create({name, image, points, expiryDate, description})
   
  const time = new Date();
    return NextResponse.json({message:"Success",time},{status: 200})
  }