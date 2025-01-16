import cp from 'child_process';
import fs from 'fs';
import path from 'path';
import type { InternalPublishOptions, PublishTarget } from './types';
import core from '@actions/core';

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
        core.info('found .npmrc');
        core.info('backup .npmrc ' + path.relative(process.cwd(), backupFile));
        fs.copyFileSync(npmrcFile, backupFile);
    } else {
        core.info('not found .npmrc');
    }

    const registry = registries[options.target];
    const authURL = new URL(registry);

    core.info(`append .npmrc authToken(${options.token.length})`);
    fs.appendFileSync(npmrcFile, `\n//${authURL.host}/:_authToken=${options.token}\n`, 'utf-8');

    core.info('append .npmrc registry');
    fs.appendFileSync(npmrcFile, `registry=${registry}\n`, 'utf-8');

    core.info('publishing package');
    const command = [
        //
        'npm',
        'publish',
        options.target === 'npm' && '--provenance',
        `--tag=${options.tag}`,
        options.dryRun && '--dry-run',
        core.isDebug() && '--verbose',
    ]
        .filter(Boolean)
        .join(' ');

    try {
        core.info('npm --version');
        cp.execSync('npm --version', {
            cwd,
            stdio: 'inherit',
            env: process.env,
        });
        core.info(command);
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
