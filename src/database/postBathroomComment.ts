import { DateTime } from "luxon";
import getDBClient from "./connect";

export default async function postBathroomComment(
  details: insertBathroomComment
): Promise<-1> {
  const client = await getDBClient();
  const currentTimeZ = DateTime.utc().toLocal();

  try {
    const result = await client.query(
      `
      INSERT INTO myapp_comment (commenter_name, comment_text, created_at, review_id,
      cleanvalue, safetyvalue, accessibilityvalue, facilitiesvalue, functionalityvalue, maintenancevalue, is_closed)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    `,
      [
        details.name,
        details.comment_text,
        currentTimeZ,
        details.bathroom_id,
        details.cleanliness_rating,
        details.safety_rating,
        details.accessibility_rating,
        details.facilities_rating,
        details.functionality_rating,
        details.maintenance_rating,
        details.is_closed,
      ]
    );
    client.end();

    return;
  } catch (error) {
    console.log(error);
    return -1;
  }
}
