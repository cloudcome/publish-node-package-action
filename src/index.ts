import type { Context } from '@actions/github/lib/context';
import mapWorkspaces from '@npmcli/map-workspaces';
import fs from 'fs';
import path from 'path';

export default async function rewritePkgJSON(cwd: string, context: Context) {
    console.log(process.env.PKG_NAME, process.env.PKG_VERSION);

    // @ref https://github.com/actions/toolkit/blob/457303960f03375db6f033e214b9f90d79c3fe5c/packages/github/src/context.ts
    const owner = context.payload.repository?.owner.login;

    if (!owner) {
        throw new Error('No owner found in context');
    }

    const pkg = JSON.parse(fs.readFileSync(path.join(cwd, '/package.json'), 'utf-8'));
    const workspaces = await mapWorkspaces({ pkg, cwd });

    Object.values(workspaces).forEach((workspace) => {
        const file = path.join(workspace, '/package.json');
        const pkg = JSON.parse(fs.readFileSync(file, 'utf-8'));
        // originName        ->  underlineName
        // my-pkg            ->  my-pkg
        // @my-scope/my-pkg  ->  my-scope__my-pkg
        const underlineName = pkg.name.replace(/@(.*)\/(.*)/, '$1__$2');

        pkg.name = '@' + owner + '/' + underlineName;
        fs.writeFileSync(file, JSON.stringify(pkg), 'utf-8');
    });

    return '';
}
