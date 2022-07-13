import { cwd } from "process";


const dev = process.env.NODE_ENV !== "production";
export const server = dev ? "http://localhost:3000" : "https://seal-code-challenge.herokuapp.com";
export const dir = dev ? "public/img" : `${cwd()}/img`;