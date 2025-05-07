import { NextResponse } from 'next/server';

async function generateSignature() {
  const clientKey = process.env.SKY_CLIENT_KEY;
  const secretKey = process.env.SKY_SECRET_KEY;
  const baseUrl = process.env.SKY_API_URL;
  const timestamp = process.env.SKY_TIME_STAMP;

  const response = await fetch(`${baseUrl}/v1/partner/generate-signature`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      clientkey: clientKey || "",
      secretkey: secretKey || "",
      timestamp: timestamp || "",
    },
    body: JSON.stringify({}),
  });

  if (!response.ok) {
    throw new Error("Failed to generate signature");
  }

  return response.json();
}

export async function GET() {
  try {
    const clientKey = process.env.SKY_CLIENT_KEY;
    const secretKey = process.env.SKY_SECRET_KEY;
    const baseUrl = process.env.SKY_API_URL;
    const timestamp = process.env.SKY_TIME_STAMP;

    // Generate signature first
    const signatureData = await generateSignature();

    // Get locations
    const locationsResponse = await fetch(`${baseUrl}/v1/partner/get-alllocation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        clientkey: clientKey || "",
        secretkey: secretKey || "",
        timestamp: timestamp || "",
        signature: signatureData.signature || "",
      },
      body: JSON.stringify({}),
    });

    if (!locationsResponse.ok) {
      throw new Error("Failed to fetch locations");
    }

    const data = await locationsResponse.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}