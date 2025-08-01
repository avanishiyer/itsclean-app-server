import getDBClient from "./connect";

export default async function checkIfBathroomExists(
  bathroom_id: number
): Promise<true | false | -1> {
  const client = await getDBClient();

  try {
    const result = await client.query(
      `
      SELECT * FROM myapp_review
      WHERE id = $1
    `,
      [bathroom_id]
    );
    client.end();

    if ((result.rowCount = 0)) {
      return false;
    }
    return true;
  } catch (error) {
    console.log(error);
    return -1;
  }
}
