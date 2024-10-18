import axios from "axios"

async function getusers(user) {
    const resp = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/addproduct`);


 console.log(resp);
}
export default async function page(){
    const user = await getusers();
    return (
        <div>
            test
        </div>
    )
}