import { LoggingTypes } from './logging';

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
	logging?: {
		channel: string;
		enabled: boolean;
		subs: LoggingTypes[];
		webhook_id: string;
	};
	prefix: string;
	custom?: {
		[key: string]: {
			channel_list?: string[];
			role_list?: string[];
			whitelist?: boolean;
			embed?: Embed;
		};
	};
}

export interface Embed {
	title?: string;
	description?: string;
	url?: string;
	timestamp?: Date | number;
	color?: number;
	fields?: {
		name: string;
		value: string;
		inline?: boolean;
	}[];
	author?: {
		name?: string;
		url?: string;
		iconURL?: string;
	};
	thumbnail?: {
		url?: string;
	};
	image?: {
		url?: string;
	};
	footer?: {
		text?: string;
		iconURL?: string;
	};
}

export interface GuildWarns {
	[id: string]: Warn;
}

export interface Warn {
	by: string;
	reason?: string;
}
