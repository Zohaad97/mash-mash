import { APILINK } from "./config";

export const post = async query => {
  let req = await fetch(APILINK.baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query: query
    })
  });
  return req;
};
