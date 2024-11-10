import {users} from '../mockData';
import { connetMongoDB } from '@lib/mongodb';
import Post from '@models/schema';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

if (mongoose.connection.readyState === 0) {
  connetMongoDB();
}

  export async function POST(req) {
    
    const {
      name,
      image,
      points,
      expiryDate,
      description,
    } = await req.json();
    // ตรวจสอบว่ามีสินค้าชื่อนี้อยู่แล้วหรือไม่
  const time = new Date();
    const existingPost = await Post.findOne({ name });
    if (existingPost) {
        // ถ้าชื่อสินค้าซ้ำ ให้ส่งข้อความแจ้งเตือนกลับไป
    return NextResponse.json({message:"สินค้าชื่อนี้มีอยู่แล้ว กรุณาใช้ชื่ออื่น",time},{status: 200})
    }
   await Post.create({name, image, points, expiryDate, description})
   
    return NextResponse.json({message:"Success add product",time},{status: 200})
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