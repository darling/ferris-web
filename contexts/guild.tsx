import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";
import { GuildInfo } from "../interfaces/control";
import app from "../utils/auth/firebase";

export const GuildContext = createContext<GuildInfo | null>(null);

const GuildProvider = (props: any) => {
  const [guild, setGuild] = useState<GuildInfo | null>(null);
  const router = useRouter();
  const { query } = router;

  useEffect(() => {
    if (!query.id) {
      return;
    }

    console.log("Opening connection");
    const ref = app.database().ref(`guilds/${query.id}`);
    ref.on("value", (snapshot) => {
      console.log("Got update from database");
      setGuild({
        ...snapshot.val(),
        id: query.id,
        hasFerris: snapshot.exists(),
      });
    });

    return function close() {
      console.log("closing connection");
      setGuild(null);
      ref.off();
    };
  }, [query.id]);

  return (
    <GuildContext.Provider value={guild}>
      {props.children}
    </GuildContext.Provider>
  );
};

export default GuildProvider;
