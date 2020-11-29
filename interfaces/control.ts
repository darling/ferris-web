export interface GuildInfo {
	hasFerris?: boolean;
	id?: string;
	member_count: number;
	name?: string;
	icon?: string;
	blocked?: boolean;
	roles?: {
		[id: string]: Role;
	};
	channels?: {
		[id: string]: Channel;
	};
}

export interface Role {
	name: string;
	position: string;
	permissions: string;
}

export interface Channel {
	name: string;
	position: string;
	type: string;
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
