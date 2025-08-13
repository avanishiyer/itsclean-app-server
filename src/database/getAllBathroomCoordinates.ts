import getDBClient from "./connect";

export default async function getAllBathroomCoordinates(): Promise<
  Array<bathroomCoordinates> | -1
> {
  const client = await getDBClient();

  try {
    const result = await client.query(`
    SELECT id, location, lng, lat, cleanliness_rating
    FROM myapp_review
    `);
    client.end();

    return result.rows;
  } catch (error) {
    console.error(error);
    return -1;
  }
}
