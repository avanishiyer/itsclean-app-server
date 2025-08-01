import getDBClient from "./connect";

export default async function getBathroomById(
  bathroom_id: number
): Promise<Array<generalBathroomItem> | null | -1> {
  const client = await getDBClient();
  console.log(bathroom_id);

  try {
    const result = await client.query(`
    SELECT id, location, review_text, created_at, name, lat, lng, 
    cleanliness_rating, safety_rating, accessibility_rating, facilities_rating, functionality_rating, maintenance_rating, is_closed 
    FROM myapp_review
    WHERE id = ${bathroom_id}
    `);
    client.end();

    if (result.rowCount == 0) return null;

    return result.rows;
  } catch (error) {
    console.log(error);
    return -1;
  }
}
