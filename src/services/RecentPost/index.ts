import envConfig from "@/src/config";
import { delay } from "@/src/utils/delay";

export const getRecentPosts = async () => {
  const res = await fetch(
    `${envConfig.backendUrl}/items?sortBy=-createdAt&limit=9`
  );
  await delay(900)
  return res.json();
};
