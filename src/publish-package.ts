import cp from 'child_process';
import fs from 'fs';
import path from 'path';
import type { InternalPublishOptions, PublishTarget } from './types';

const registries: Record<PublishTarget, string> = {
    npm: 'https://registry.npmjs.org',
    github: 'https://npm.pkg.github.com',
};

export function publishPackage(pkgPath: string, options: InternalPublishOptions) {
    const cwd = path.resolve(pkgPath, '..');
    const npmrcFile = path.join(cwd, '.npmrc');
    const backupFile = npmrcFile + '-' + Date.now();
    const exists = fs.existsSync(npmrcFile);

    if (exists) {
        fs.copyFileSync(npmrcFile, backupFile);
    }

    const registry = registries[options.target];
    const authURL = new URL(registry);
    fs.appendFileSync(npmrcFile, `//${authURL.host}/:_authToken=${options.token}`, 'utf-8');
    fs.appendFileSync(npmrcFile, `registry=${registry}`, 'utf-8');

    const command = [
        //
        'npm',
        'publish',
        options.target === 'npm' && '--provenance',
        `--tag=${options.tag}`,
    ]
        .filter(Boolean)
        .join(' ');

    try {
        cp.execSync(command, {
            cwd: path.resolve(pkgPath, '..'),
            stdio: 'inherit',
            env: process.env,
        });
    } finally {
        if (exists) {
            fs.renameSync(backupFile, npmrcFile);
        } else {
            fs.unlinkSync(npmrcFile);
        }
    }
}
