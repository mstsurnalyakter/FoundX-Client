import envConfig from "@/src/config";


export const getRecentPosts = async () => {
  const fetchOption = {
    next:{
      tags:['posts']
    }
  }

  const res = await fetch(
    `${envConfig.backendURL}/items?sortBy=-createdAt&limit=9`,
    fetchOption
  );

  return res.json();
};
