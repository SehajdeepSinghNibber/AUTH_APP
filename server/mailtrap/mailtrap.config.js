import { MailtrapClient } from "mailtrap";
import config from "../src/config/config.js";

const TOKEN = config.MAILTRAP_TOKEN;

if (!TOKEN) {
  throw new Error("MAILTRAP_TOKEN is required");
}

export const mailTrapClient = new MailtrapClient({
  token: TOKEN,
});

export const sender = {
  email: "hello@demomailtrap.co",
  name: "Sehajdeep Singh",
};