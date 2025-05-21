import { client } from "sanity-studio/studio/client";

export const sanityQuery = async ({
  type,
  fields,
}: {
  type: string;
  fields?: string;
}) => {
  const query = `*[_type == "${type}"]{${fields || "_id"}}`;
  const data = await client.fetch(query);

  return { data };
};
