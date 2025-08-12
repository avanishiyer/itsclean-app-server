import getDBClient from "./connect";

export default async function getCommentByBathroom(
  bathroom_id: number
): Promise<Array<generalBathroomComment> | null | -1> {
  const client = await getDBClient();

  try {
    const result = await client.query(`
    SELECT id, commenter_name, comment_text, created_at, review_id,  
    cleanvalue, safetyvalue, accessibilityvalue, facilitiesvalue, functionalityvalue, maintenancevalue, is_closed 
    FROM myapp_comment
    WHERE review_id = ${bathroom_id}
    `);
    client.end();

    if (result.rowCount == 0) return null;
    console.log(result.rows);

    return result.rows;
  } catch (error) {
    console.error(error);
    return -1;
  }
}
