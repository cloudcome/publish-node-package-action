import { Context } from '@actions/github/lib/context';

export default function rewritePkgJSON(cwd: string, context: Context): Promise<string>;
