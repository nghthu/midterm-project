import chalk from "chalk";
import { cookies } from "next/headers";
import { GET_PROFILE_URI } from "@/lib/constants";

export async function GET(req) {
  const accessToken = cookies().get("accessToken");
  console.log(chalk.bgYellow(accessToken.value));

  if (!accessToken) {
    return new Response(JSON.stringify({ error: "Login needed" }));
  }

  const response = await fetch(GET_PROFILE_URI, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken.value}`,
    },
  });

  const responseData = await response.json();
  console.log(responseData);

  if (!response.ok) {
    console.log(chalk.bgRed("jwt expired"));
    return new Response(JSON.stringify({ error: responseData.error }));
  }

  if (responseData?.error) {
    console.log(chalk.redBright("jwt expired"));
    return new Response(JSON.stringify({ error: "JWT expired" }));
  }

  return new Response(
    JSON.stringify({
      info: responseData,
    })
  );
}
