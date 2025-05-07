// eslint-disable-next-line @typescript-eslint/no-unused-vars
const fetchLocations = async (language: string) => {
  try {
    const response = await fetch('/api/locations');
    
    if (!response.ok) {
      throw new Error("Failed to fetch locations");
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};

export { fetchLocations };