import { DateTime } from "luxon";
import getDBClient from "./connect";

export default async function postBathroomReview(
  details: insertBathroomReview
): Promise<-1> {
  const client = await getDBClient();
  const currentTimeZ = DateTime.utc().toLocal();

  try {
    const result = await client.query(
      `
      INSERT INTO myapp_review (location, review_text, created_at, name, image, lat, lng, 
      cleanliness_rating, safety_rating, accessibility_rating, facilities_rating, functionality_rating, maintenance_rating, is_closed, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
    `,
      [
        details.location,
        details.review_text,
        currentTimeZ,
        details.name,
        null,
        details.lat,
        details.lng,
        details.cleanliness_rating,
        details.safety_rating,
        details.accessibility_rating,
        details.facilities_rating,
        details.functionality_rating,
        details.maintenance_rating,
        details.is_closed,
        currentTimeZ,
      ]
    );
    client.end();

    return;
  } catch (error) {
    console.error(error);
    return -1;
  }
}
