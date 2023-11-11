import chalk from "chalk";
import { cookies } from "next/headers";
import { GET_PROFILE_URI } from "@/lib/constants";

export async function GET(req) {
  console.log(chalk.bgCyan("---------------fetch---------------"));

  const accessToken = cookies().get("accessToken");

  if (!accessToken) {
    console.log(chalk.red(accessToken));
    return new Response(
      JSON.stringify({
        message: "Login needed",
      })
    );
  }

  // const response = await fetch(GET_PROFILE_URI, {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${accessToken}`,
  //   },
  // });

  // const responseBody = await response.json();

  // if (responseBody?.error) {
  //   return new Response(JSON.stringify({ message: "No User Found" }));
  // }

  // if (response.status === 401 || !response.ok) {
  //   return new Response(JSON.stringify({ message: "Something went wrong" }));
  // }

  // console.log(responseBody);
  // cookies().set("refreshToken", responseBody.refreshToken, { httpOnly: true });
  // cookies().set("accessToken", responseBody.accessToken);
  // // localStorage.setItem("accessToken", responseBody.accessToken);

  return new Response(
    JSON.stringify({
      message: "Fetch Profile successfully",
    })
  );
}
