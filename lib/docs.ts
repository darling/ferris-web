import { readdirSync, statSync } from 'fs';
import { join } from 'path';

const docsDirectory = join(process.cwd(), 'docs');

export function getFiles(dir: any, files_?: any) {
	files_ = files_ || [];
	var files = readdirSync(dir);
	for (var i in files) {
		var name = files[i];
		if (statSync(dir + '/' + name).isDirectory()) {
			getFiles(dir + '/' + name, files_);
		} else {
			files_.push(dir + '/' + name);
		}
	}
	return files_;
}
