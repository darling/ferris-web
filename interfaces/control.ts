export interface GuildInfo {
  hasFerris?: boolean;
  id?: string;
  member_count: number;
  name?: string;
  icon?: string;
  config?: GuildConfig;
  warns?: GuildWarns;
  blocked?: boolean;
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
