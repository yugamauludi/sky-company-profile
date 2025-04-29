// eslint-disable-next-line @typescript-eslint/no-unused-vars
const fetchLocations = async (language: string) => {
  try {
    const clientKey = process.env.NEXT_PUBLIC_SKY_CLIENT_KEY;
    const secretKey = process.env.NEXT_PUBLIC_SKY_SECRET_KEY;
    const baseUrl = process.env.NEXT_PUBLIC_SKY_API_URL;
    const timestamp = process.env.NEXT_PUBLIC_SKY_TIME_STAMP;

    const generateSignatureResponse = await fetch(
      `${baseUrl}/v1/partner/generate-signature`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          clientkey: clientKey || "",
          secretkey: secretKey || "",
          timestamp: timestamp || "",
        },
        body: JSON.stringify({}),
      }
    );

    if (!generateSignatureResponse.ok) {
      throw new Error("Signature error");
    }

    const signatureData = await generateSignatureResponse.json();

    const locationsResponse = await fetch(
      `${baseUrl}/v1/partner/get-alllocation`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          clientkey: clientKey || "",
          secretkey: secretKey || "",
          timestamp: timestamp || "",
          signature: signatureData.signature || "",
        },
        body: JSON.stringify({}),
      }
    );

    if (!locationsResponse.ok) {
      throw new Error("Locations error");
    }

    const locationsData = await locationsResponse.json();
    return locationsData.data;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};

export { fetchLocations };