import { users } from '../mockData';
import jwt from 'jsonwebtoken';
export async function POST(req) {

  const secretKey = 'P@55w0rD'; // Secret key สำหรับ sign token

  try {
    const { username, password } = await req.json(); // แก้ไขชื่อจาก usernaem เป็น username

    // หา user ที่มี username และ password ตรงกัน
    const user = users.find((e) => e.username === username && e.password === password);

    // ถ้าไม่พบผู้ใช้ ให้คืนค่า status 401 (Unauthorized)
    if (!user) {
      return new Response(JSON.stringify({ message: "Username or password Invalid" }), {
        status: 401,
      });
    }
    const token = jwt.sign({ userInfo: user }, secretKey, { expiresIn: '1h' });

    // ถ้าพบผู้ใช้ คืนค่า user กลับไป
    return new Response(JSON.stringify({message: 'Login successful', token }), {
      status: 200,
    });

  } catch (error) {

    console.log(error);
  }
}
