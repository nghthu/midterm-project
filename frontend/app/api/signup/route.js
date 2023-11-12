import { SIGNUP_URI } from "@/lib/constants";
import chalk from "chalk";

export async function POST(req) {
  const data = await req.json();
  console.log(data);

  const response = await fetch(SIGNUP_URI, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const responseBody = await response.json();
  console.log(chalk.bgYellow("response body"), responseBody);

  if (responseBody?.error) {
    console.log(chalk.bgRed("error"));
    return new Response(JSON.stringify({ error: responseBody.error }));
  }

  if (!response.ok) {
    console.log(chalk.bgRed("not ok"));
    return new Response(JSON.stringify({ error: "Something went wrong" }));
  }

  console.log(chalk.bgGreen("ok"));
  return new Response(JSON.stringify({ message: "Sign up successfully" }));
}
