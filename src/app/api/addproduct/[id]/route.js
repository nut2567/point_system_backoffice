import { NextResponse } from "next/server";
import mongoose from 'mongoose';
import { connetMongoDB } from '@lib/mongodb';
import Post from '@models/schema';

// เชื่อมต่อกับ MongoDB ก่อนที่จะเรียกใช้ API
if (mongoose.connection.readyState === 0) {
  connetMongoDB();
}

export async function GET(req, { params }) {
  const { id } = params;
  const product = await Post.findById(id);
  const time = new Date();

  return NextResponse.json({ message: "Success", time, product }, { status: 200 });
}

export async function POST(req, { params }) {
  const { id } = params;
  const { name, image, points, expiryDate, description } = await req.json();

  await Post.findByIdAndUpdate(id, { name, image, points, expiryDate, description });

  const time = new Date();
  return NextResponse.json({ message: "Success update product", time }, { status: 200 });
}
