import PusherServer from "pusher";
import PusherClient from "pusher-js";

export const pusherServer = new PusherServer({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_KEY,
  cluster: "eu",
});

export const pusherClient = new PusherClient(process.env.PUSHER_PUSHER_KEY, {
  cluster: "eu",
});
