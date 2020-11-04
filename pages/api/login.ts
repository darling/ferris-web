import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { stringify } from "querystring";
import { admin } from "../../utils/auth/firebase-admin";

const DISCORD_API_ENDPOINT = "https://discord.com/api";
const DISCORD_CLIENT_ID = "637804742935838751";
const DISCORD_CLIENT_SECRET = "guhpkDIXMEoFKQup_6jrKHdz0q8hUwXa";
const DISCORD_REDIRECT_URI = "https://ferrisbot.app/login";

interface UserGuild {
  id: string;
  name: string;
  icon: string;
  owner: boolean;
  permissions: number;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.body);
  const { code } = req.body;

  if (!code) {
    res.redirect(
      `${DISCORD_API_ENDPOINT}/oauth2/authorize?response_type=code&client_id=${DISCORD_CLIENT_ID}&redirect_uri=${DISCORD_REDIRECT_URI}&scope=identify%20guilds`
    );
    return;
  }

  const data = {
    client_id: DISCORD_CLIENT_ID,
    client_secret: DISCORD_CLIENT_SECRET,
    grant_type: "authorization_code",
    code: code,
    redirect_uri: DISCORD_REDIRECT_URI,
    scope: "identify guilds",
  };

  const discordAuth = await axios.post(
    DISCORD_API_ENDPOINT + "/oauth2/token",
    stringify(data),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    }
  );

  const DISCORD_ACCESS_TOKEN = discordAuth.data["access_token"];

  const discordInfo = await axios.get(DISCORD_API_ENDPOINT + "/users/@me", {
    headers: { Authorization: "Bearer " + DISCORD_ACCESS_TOKEN },
  });

  const discordGuilds = await axios.get(
    DISCORD_API_ENDPOINT + "/users/@me/guilds",
    {
      headers: { Authorization: "Bearer " + DISCORD_ACCESS_TOKEN },
    }
  );

  const guildsOutput: UserGuild[] = discordGuilds.data.filter(
    (guild: UserGuild) => (guild.permissions & 0x00000020) == 0x00000020
  );

  let guilds: any = {};
  guildsOutput.forEach((guild) => {
    guilds[guild.id] = {
      name: guild.name,
      icon: guild.icon,
    };
  });

  const uid: string = discordInfo.data["id"];
  const ref = admin.database().ref(`users/${uid}`);

  const { discriminator, username, avatar } = discordInfo.data;

  await ref.set({
    discrim: discriminator,
    username: username,
    avatar: avatar,
    guilds: guilds,
  });

  const token = await admin.auth().createCustomToken(uid);

  const avatarHash = discordInfo.data["avatar"];
  const isGif = avatarHash.startsWith("a_");

  await admin
    .auth()
    .getUser(uid)
    .catch(async (err) => {
      if (err.code === "auth/user-not-found") {
        await admin.auth().createUser({
          uid: uid,
        });
      } else {
        throw Error(err.code);
      }
    });

  await admin.auth().updateUser(uid, {
    displayName: discordInfo.data["username"],
    photoURL: `https://cdn.discordapp.com/avatars/${uid}/${avatarHash}.${
      isGif ? "gif" : "png"
    }`,
  });

  res.setHeader("Content-Type", "text/plain");
  res.send(JSON.stringify(token));
};
