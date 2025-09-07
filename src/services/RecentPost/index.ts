import envConfig from "@/src/config";

export const getRecentPosts = async () => {
  const res = await fetch(
    `${envConfig.backendUrl}/items?sortBy=-createdAt&limit=9`
  );

  return res.json();
};
