import core from '@actions/core';
import github from '@actions/github';
import glob from 'fast-glob';
import fs from 'fs';
import path from 'path';
import type { InternalPublishOptions, PublishTarget } from './types';
import { publishPackage } from './publish-package';

type PKG = {
    name: string;
    version: string;
    private?: boolean;
    workspaces?: string[];
};

const registries: Record<PublishTarget, string> = {
    npm: 'https://registry.npmjs.org',
    github: 'https://npm.pkg.github.com',
};

export async function publishPackages(options: InternalPublishOptions) {
    const registry = registries[options.target];

    if (!registry) {
        throw new Error(`Invalid registry target: ${options.target}`);
    }

    // @ref https://github.com/actions/toolkit/blob/457303960f03375db6f033e214b9f90d79c3fe5c/packages/github/src/context.ts
    const owner = github.context.payload.repository?.owner.login;
    const cwd = process.cwd();

    if (!owner) {
        throw new Error('No owner found in context');
    }

    const rootPkgFile = path.join(cwd, 'package.json');
    const pkg = JSON.parse(fs.readFileSync(rootPkgFile, 'utf-8')) as PKG;
    const childPkgPaths = glob.sync(
        (pkg.workspaces || []).map((ws) => path.join(ws, 'package.json')),
        { cwd, onlyFiles: true },
    );

    const pkgPaths = ['package.json', ...childPkgPaths];
    core.info(`pkgPaths: ${JSON.stringify(pkgPaths)}`);
    const length = pkgPaths.length;

    let order = 1;
    for (const pkgPath of pkgPaths) {
        core.info(`[${order++}/${length}] read package ${pkgPath}`);

        const pkgFile = path.join(cwd, pkgPath);
        const origin = fs.readFileSync(pkgFile, 'utf-8');
        const pkg = JSON.parse(origin) as PKG;

        if (pkg.private && !options.includePrivate) {
            core.info(`skip private package ${pkgPath}`);
            continue;
        }

        if (options.target === 'github') {
            // originName        ->  underlineName
            // my-pkg            ->  my-pkg
            // @my-scope/my-pkg  ->  my-scope__my-pkg
            const underlineName = pkg.name.replace(/@(.*)\/(.*)/, '$1__$2');
            const ownerName = '@' + owner + '/' + underlineName;

            core.info(`rewrite package name: ${pkg.name}->${ownerName}`);
            pkg.name = ownerName;
            fs.writeFileSync(pkgFile, JSON.stringify(pkg), 'utf-8');
        }

        try {
            core.info(`publish package: ${pkgPath} ${pkg.name}@${pkg.version} as ${options.tag} to ${options.target}`);
            publishPackage(pkgPath, options);
        } finally {
            if (options.target === 'github') {
                fs.writeFileSync(pkgPath, origin, 'utf-8');
            }
        }
    }

    return '';
}
