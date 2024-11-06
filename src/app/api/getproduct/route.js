import {users} from '../mockData';
import { connetMongoDB } from '@lib/mongodb';
import Post from '@models/schema';
import { NextResponse } from 'next/server';

export async function GET() {
  
  await connetMongoDB();
  
  const Product = await Post.find({})
  const time = new Date();
   
  return NextResponse.json({message:"Success",Product,time},{status: 200})
  }
