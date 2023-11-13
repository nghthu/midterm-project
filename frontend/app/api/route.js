import { cookies } from "next/headers";

export async function GET() {
  const accessToken = cookies().get("accessToken");
  const refreshToken = cookies().get("refreshToken");

  if (refreshToken === undefined || refreshToken === null) {
    return new Response(JSON.stringify({ error: "Login needed" }));
  }

  return new Response(
    JSON.stringify({
      message: "Already Login",
    })
  );
}
