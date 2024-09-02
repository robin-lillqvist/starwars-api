import axios from "axios";

export const fetchAllStarships = async () => {
  try {
    let starships = [];
    let url = "https://swapi.dev/api/starships/";
    let count = 0;

    while (url) {
      const response = await axios.get(url);
      starships = [...starships, ...response.data.results];
      count = response.data.count;
      next = response.data.next || null;
      previous = response.data.previous || null;
    }

    return { starships, count, next, previous };
  } catch (error) {
    console.error("Error fetching starships:", error);
    return { starships: [], count: 0, next: null, previous: null };
  }
};
