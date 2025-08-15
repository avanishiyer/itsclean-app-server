import { DateTime } from "luxon";
import getDBClient from "./connect";

export default async function postBathroomReview(
  details: insertBathroomReview
): Promise<number> {
  const client = await getDBClient();
  const currentTimeZ = DateTime.utc().toLocal();
  console.log(details);

  try {
    const result = await client.query(
      `
      INSERT INTO myapp_review (location, review_text, created_at, name, image, lat, lng, 
      cleanliness_rating, safety_rating, accessibility_rating, facilities_rating, functionality_rating, maintenance_rating, is_closed, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING id
    `,
      [
        details.location,
        details.review_text,
        currentTimeZ,
        details.name,
        null,
        details.lat,
        details.lng,
        details.cleanliness_rating || 0,
        details.safety_rating || 0,
        details.accessibility_rating || 0,
        details.facilities_rating || 0,
        details.functionality_rating || 0,
        details.maintenance_rating || 0,
        details.is_closed,
        currentTimeZ,
      ]
    );
    client.end();
    if (result.rows.length > 0) {
      const newId = result.rows[0].id;
      console.log("Inserted review with ID:", newId);
      return newId;
    }
    return -1;
  } catch (error) {
    console.error(error);
    return -1;
  }
}
