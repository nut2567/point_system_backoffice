import {users} from '../mockData';
import { connetMongoDB } from '@lib/mongodb';
import Post from '@models/schema';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

if (mongoose.connection.readyState === 0) {
  connetMongoDB();
}


  export async function DELETE(req,{ params }) {
    
  console.log(req.nextUrl.searchParams.get('id'),params);
   // ดึง query parameter 'id' จาก URL
   const id  = req.nextUrl.searchParams.get('id');

   if (!id) {
     return new Response("ID is required", { status: 400 });
   }
   await Post.findByIdAndDelete(id)
   
  const time = new Date();
    return NextResponse.json({message:"Success dalete product",time},{status: 200})
  }