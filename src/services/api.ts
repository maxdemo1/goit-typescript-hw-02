import axios from "axios";
const ACCESS_KEY = "eg025x8Xhb-_SCm_dMhaGwSom46g0aD2naHiHNJiK24";
axios.defaults.baseURL = "https://api.unsplash.com//search/photos";

export async function requestForImage<T>(
  searchQuery: string,
  page = 1
): Promise<T> {
  try {
    const response = await axios.get("", {
      params: {
        client_id: ACCESS_KEY,
        query: searchQuery,
        page: page,
        per_page: 12,
        orientation: "landscape",
      },
    });
    const { data: responseData } = response;
    return responseData;
  } catch (error) {
    throw new Error();
  }
}
