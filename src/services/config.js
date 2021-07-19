export const APILINK = {
  baseUrl:
    process.env.NODE_ENV == "production"
      ? "https://server.mashmush.com/graphql"
      : "http://localhost:5000/graphql"
};
