import chalk from "chalk";
import { cookies } from "next/headers";
import {
  EDIT_PROFILE_URI,
  GET_PROFILE_URI,
  REFRESH_TOKEN_URI,
} from "@/lib/constants";

export async function GET(req) {
  const accessToken = cookies().get("accessToken");
  console.log(chalk.bgYellow("accessToken"), accessToken);
  const refreshToken = cookies().get("refreshToken");
  console.log(chalk.bgGreen("refreshToken"), refreshToken);

  if (refreshToken === undefined || refreshToken === null) {
    console.log(chalk.bgRed("login needed"));
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

  if (responseData?.error) {
    const refreshResponse = await fetch(REFRESH_TOKEN_URI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken: refreshToken.value }),
    });

    const newAccessToken = await refreshResponse.json();
    cookies().set("accessToken", newAccessToken.accessToken);
    console.log(chalk.bgYellow("new access token"), newAccessToken);

    const reResponse = await fetch(GET_PROFILE_URI, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${newAccessToken.accessToken}`,
      },
    });

    const reResponseData = await reResponse.json();
    console.log(reResponseData);

    return new Response(
      JSON.stringify({
        info: reResponseData,
      })
    );
  }

  if (!response.ok) {
    return new Response(JSON.stringify({ error: responseData.error }));
  }

  return new Response(
    JSON.stringify({
      info: responseData,
    })
  );
}

export async function PUT(req) {
  const data = await req.json();
  console.log(data);

  const accessToken = cookies().get("accessToken");
  console.log(chalk.bgYellow("accessToken"), accessToken);
  const refreshToken = cookies().get("refreshToken");
  console.log(chalk.bgGreen("refreshToken"), refreshToken);

  if (refreshToken === undefined || refreshToken === null) {
    console.log(chalk.bgRed("login needed"));
    return new Response(JSON.stringify({ error: "Login needed" }));
  }

  const response = await fetch(EDIT_PROFILE_URI, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken.value}`,
    },
    body: JSON.stringify(data),
  });

  const responseData = await response.json();
  console.log(responseData);

  if (responseData?.error) {
    const refreshResponse = await fetch(REFRESH_TOKEN_URI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken: refreshToken.value }),
    });

    const newAccessToken = await refreshResponse.json();
    cookies().set("accessToken", newAccessToken.accessToken);
    console.log(chalk.bgYellow("new access token"), newAccessToken);

    const reResponse = await fetch(EDIT_PROFILE_URI, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken.value}`,
      },
      body: JSON.stringify(data),
    });

    const reResponseData = await reResponse.json();
    console.log(reResponseData);

    return new Response(
      JSON.stringify({
        info: reResponseData,
      })
    );
  }

  if (!response.ok) {
    return new Response(JSON.stringify({ error: responseData.error }));
  }

  return new Response(
    JSON.stringify({
      info: responseData,
    })
  );
}
