import PusherServer from "pusher";
import PusherClient from "pusher-js";

export const pusherServer = new PusherServer({
  appId: "1654638",
  key: "a10d7b2f6e9a9bce6fd0",
  secret: "48829bac1be0ac1b6324",
  cluster: "eu",
});

export const pusherClient = new PusherClient('a10d7b2f6e9a9bce6fd0', {
  cluster: "eu",
});
