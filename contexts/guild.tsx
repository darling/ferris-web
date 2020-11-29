import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";
import { GuildInfo } from "../interfaces/control";
import { db } from "../utils/auth/firebase";

export const GuildContext = createContext<GuildInfo | null>(null);

const GuildProvider = (props: any) => {
  const [guild, setGuild] = useState<GuildInfo | null>(null);
  const router = useRouter();
  const { query } = router;

  useEffect(() => {
    const id = `${query.id}`;

    if (!id) {
      return;
    }

    console.log("Opening connection for guild", id);
    const doc = db.collection('guilds').doc(id)
    const close = doc.onSnapshot(snapshot => {
      console.log('database response')
      const data = snapshot.data()
      setGuild({
        ...data,
        id: id,
        hasFerris: snapshot.exists
      } as GuildInfo)
    }, () => {
      console.log("permission denied");
        setGuild({
          blocked: true,
          member_count: 0,
          hasFerris: false,
        });
    })

    return () => {
      console.log('closing connection')
      setGuild(null);
      close();
    };
  }, [query.id]);

  return (
    <GuildContext.Provider value={guild}>
      {props.children}
    </GuildContext.Provider>
  );
};

export default GuildProvider;
