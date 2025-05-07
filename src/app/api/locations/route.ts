import { NextResponse } from 'next/server';

async function generateSignature() {
    const clientKey = process.env.NEXT_PUBLIC_SKY_CLIENT_KEY;
    const secretKey = process.env.NEXT_PUBLIC_SKY_SECRET_KEY;
    const baseUrl = process.env.NEXT_PUBLIC_SKY_API_URL;
    const timestamp = process.env.NEXT_PUBLIC_SKY_TIME_STAMP;

    try {
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
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
    } catch (error) {
        console.error("Generate signature error:", error);
        throw error;
    }
}

export async function GET() {
    try {
        const clientKey = process.env.NEXT_PUBLIC_SKY_CLIENT_KEY;
        const secretKey = process.env.NEXT_PUBLIC_SKY_SECRET_KEY;
        const baseUrl = process.env.NEXT_PUBLIC_SKY_API_URL;
        const timestamp = process.env.NEXT_PUBLIC_SKY_TIME_STAMP;

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
            throw new Error(`HTTP error! status: ${locationsResponse.status}`);
        }

        const data = await locationsResponse.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error in GET locations:", error);
        return NextResponse.json(
            { error: "Internal Server Error", details: error instanceof Error ? error.message : 'Unknown error occurred' },
            { status: 500 }
        );
    }
}