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
	name?: string;
	position?: string;
	type: string;
	id: string;
	topic?: string;
	nsfw?: string;
}

export interface GuildConfig {
	prefix?: string;
	// Admins need to be a list of ids
	admins?: string[];
	auto_role?: string;
	muted_role?: string;
	// Same with mods
	mods?: string[];
	members_can_use_bot?: boolean;
	automod?: IAutoModSettings;
	logging?: {
		channel: string;
		enabled: boolean;
		subs: LoggingTypes[];
		webhook_id: string;
	};
	custom?: {
		[key: string]: {
			channel_list?: string[];
			role_list?: string[];
			whitelist?: boolean;
			embed?: Embed;
		};
	};
}

export interface IAutoModSettings extends IAutoModFilters {
	channels?: string[];
	channels_whitelist?: boolean;
	roles?: string[];
	roles_whitelist?: boolean;
	enabled?: boolean;
}

export interface IAutoModFilters {
	word_filter?: {
		tags?: IBannedWord[];
		enabled?: boolean;
	};
	link_filter?: {
		tags?: ITaggedLinks[];
		enabled?: boolean;
	};
}

export interface ITaggedLinks extends IAutomodTag {
	// This tag is just and only just the domain ie "google.com"
	slug?: string;
	domainOnly?: boolean;
}
export interface IBannedWord extends IAutomodTag {
	strict?: boolean;
	case_sensitive?: boolean;
}

export interface IAutomodTag {
	tag: string;
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
	[timestamp: string]: Warn;
}

export interface Warn {
	by: string;
	automated?: boolean;
	reason?: string;
}
