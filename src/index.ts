import { publishPackages } from './publish-packages';
import type { PublishOptions } from './types';
import core from '@actions/core';

async function main() {
    // 1. 读取配置
    const token = core.getInput('token');
    core.setSecret(token);
    const options: PublishOptions = {
        token,
        tag: core.getInput('tag'),
        dryRun: core.getInput('dry-run') === 'true',
        target: core.getInput('target') as PublishOptions['target'],
        includePrivate: core.getInput('include-private') === 'true',
    };

    // 2. 重写 package.json + 发布
    await publishPackages(options);
}

main()
    .then(() => {
        core.info('Publish packages successfully');
    })
    .catch((err) => {
        core.setFailed(err.message);
    });
