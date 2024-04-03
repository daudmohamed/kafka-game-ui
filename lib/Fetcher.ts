import { NextResponse } from "next/server";
import { isStatusOk } from "@/lib/utils";
import logger from "@/lib/logger";

type FetcherProps = {
  url: string;
  method: string;
  headers: HeadersInit;
  body?: {};
};

const Fetcher = async <T>({
  url,
  method,
  headers,
  body,
}: FetcherProps): Promise<NextResponse> => {
  let response;
  logger.info("Fetcher calling url: " + url);
  let b;
  if (body instanceof FormData) {
    b = body;
  } else {
    b = body ? JSON.stringify(body) : undefined;
  }
  headers = { ...headers, "Cache-Control": "no-cache, max-age=0" };

  try {
    response = await fetch(url, {
      method: method,
      headers: headers,
      body: b,
      cache: 'no-store'
    });
  } catch (error) {
    logger.error("Failed to fetch data: ", { error });
    return NextResponse.json([{ key: "error", value: error }], {
      status: 500,
    });
  }

  if (!isStatusOk(response)) {
    logger.error("Failed to fetch data, invalid response", {
      status: response.status,
      statusText: response.statusText,
    });
    try {
      const json = await response.json();
      logger.error("Error json:", json);
    } catch (error) {
      logger.error("unable to parse error json");
    }
    return NextResponse.json([{ key: "error", value: response.statusText }], {
      status: response.status,
    });
  }

  logger.info("Response status: " + response.status);

  if (response.status === 204) {
    return NextResponse.json({});
  }

  const data: T = await response.json();
  return NextResponse.json(data);
};

export default Fetcher;
