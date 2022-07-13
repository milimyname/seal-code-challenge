

const dev = process.env.NODE_ENV !== "production";
export const server = dev ? "http://localhost:3000" : "https://seal-code-challenge.vercel.app";
export const dir = dev ? "public" : "";