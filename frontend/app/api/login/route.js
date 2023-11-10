import { cookies } from "next/headers";

export async function POST(req) {
  const data = await req.json();

  console.log(data);

  const response = await fetch(
    "https://musical-crepe-96c606.netlify.app/api/v1/auth/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  const responseBody = await response.json();

  if (responseBody?.error) {
    return new Response(JSON.stringify({ message: "No User Found" }));
  }

  if (response.status === 401 || !response.ok) {
    return new Response(JSON.stringify({ message: "Something went wrong" }));
  }

  console.log(responseBody);
  cookies().set("refreshToken", responseBody.refreshToken, { httpOnly: true });
  cookies().set("accessToken", responseBody.accessToken);
  // localStorage.setItem("accessToken", responseBody.accessToken);

  return new Response(
    JSON.stringify({
      message: "Log in successfully",
    })
  );
}
