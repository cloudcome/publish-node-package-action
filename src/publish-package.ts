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
    // monorepo 下的所有 package 都参考根目录的 npmrc
    const npmrcFile = path.resolve('.npmrc');
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
            cwd,
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
