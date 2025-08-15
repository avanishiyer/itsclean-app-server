import getDBClient from "./connect";

export default async function getBathroomsList(): Promise<
  Array<generalBathroomList> | -1
> {
  const client = await getDBClient();

  try {
    const result = await client.query(`
    SELECT id, location, name, review_text, cleanliness_rating, is_closed
    FROM myapp_review ORDER BY id DESC
    `);
    client.end();
    return result.rows;
  } catch (error) {
    console.error(error);
    return -1;
  }
}
