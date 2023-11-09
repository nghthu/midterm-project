import { cookies } from "next/headers";

export async function POST(req) {
  const data = await req.json();

  // const response = await fetch(
  //   "https://musical-crepe-96c606.netlify.app/login",
  //   {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   }
  // );

  console.log("data in server ---" + JSON.stringify(data));

  cookies().set("token", "lee", { httpOnly: true });

  return new Response(JSON.stringify({ message: "Log in successfully" }));
}
