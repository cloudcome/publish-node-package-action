import type { Context } from '@actions/github/lib/context';
import glob from 'fast-glob';
import fs from 'fs';
import path from 'path';

export default async function run(cwd: string, context: Context, dryRun = false) {
    console.log(process.env.PKG_NAME, process.env.PKG_VERSION);

    // @ref https://github.com/actions/toolkit/blob/457303960f03375db6f033e214b9f90d79c3fe5c/packages/github/src/context.ts
    const owner = context.payload.repository?.owner.login;

    if (!owner) {
        throw new Error('No owner found in context');
    }

    const rootPkgFile = path.join(cwd, '/package.json');
    const pkg = JSON.parse(fs.readFileSync(rootPkgFile, 'utf-8')) as { workspaces?: string[] };
    const pkgFiles = glob
        .sync(
            (pkg.workspaces || []).map((ws) => path.join(ws, 'package.json')),
            { cwd, onlyFiles: true },
        )
        .map((file) => path.join(cwd, file));

    [rootPkgFile, ...pkgFiles].forEach((pkgFile) => {
        const pkg = JSON.parse(fs.readFileSync(pkgFile, 'utf-8'));
        // originName        ->  underlineName
        // my-pkg            ->  my-pkg
        // @my-scope/my-pkg  ->  my-scope__my-pkg
        const underlineName = pkg.name.replace(/@(.*)\/(.*)/, '$1__$2');
        const ownerName = '@' + owner + '/' + underlineName;

        if (dryRun) {
            console.log('dryRun', pkgFile);
            console.log('change pkg.name from %s to %s', pkg.name, ownerName);
        } else {
            pkg.name = ownerName;
            fs.writeFileSync(pkgFile, JSON.stringify(pkg), 'utf-8');
        }
    });

    return '';
}
