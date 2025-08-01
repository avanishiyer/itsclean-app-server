import getDBClient from "./connect";

export default async function getBathroomsList(
  bot_range: number,
  top_range: number
): Promise<Array<generalBathroomList> | -1> {
  const client = await getDBClient();

  try {
    const result = await client.query(`
    SELECT id, location, review_text, created_at, name, lat, lng, cleanliness_rating, is_closed
    FROM myapp_review
    LIMIT ${top_range} OFFSET ${bot_range}
    `);
    client.end();
    return result.rows;
  } catch (error) {
    console.log(error);
    return -1;
  }
}
