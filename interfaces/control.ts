export interface GuildInfo {
  member_count: number;
  config?: GuildConfig;
  warns?: GuildWarns;
}

export interface GuildConfig {
  auto_role?: string;
  log_channel?: {
    channel: string;
    enabled: boolean;
    subs: number;
    webhook_id: string;
  };
  prefix: string;
}

export interface GuildWarns {
  [id: string]: Warn;
}

export interface Warn {
  by: string;
  reason?: string;
}
