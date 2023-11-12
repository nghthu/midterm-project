import { cookies } from "next/headers";
import { LOGIN_URI } from "@/lib/constants";

export async function POST(req) {
  const data = await req.json();

  console.log(data);

  const response = await fetch(LOGIN_URI, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    return new Response(JSON.stringify({ message: "Something went wrong" }));
  }

  const responseBody = await response.json();

  if (responseBody?.error) {
    return new Response(JSON.stringify({ message: "No User Found" }));
  }

  console.log(responseBody);
  cookies().set("refreshToken", responseBody.refreshToken, { httpOnly: true });
  cookies().set("accessToken", responseBody.accessToken);

  return new Response(JSON.stringify({ message: "Log in successfully" }));
}
