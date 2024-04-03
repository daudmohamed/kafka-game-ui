import { NextRequest, NextResponse } from "next/server";
import Fetcher from "@/lib/Fetcher";
import { Team } from "@/lib/model";
import { handleResponse } from "@/lib/utils";
import logger from "@/lib/logger";

const baseUrl = process.env.KAFKA_GAME_API_URL;


export async function GET(): Promise<NextResponse> {
  const url = `${baseUrl}/teams`;
  const headers = {
    "Content-Type": "application/json",
  };
  return Fetcher<Team[]>({
    url: url,
    method: "GET",
    headers: headers,
  })
    .then(handleResponse)
    .then((data) => {
        logger.info(data)
        return NextResponse.json(data);
    })
    .catch((error) => {
      return NextResponse.json([{ key: "error", value: error }], {
        status: 500,
      });
    });
}
