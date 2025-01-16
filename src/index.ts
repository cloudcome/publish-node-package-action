import { publishPackages } from './publish-packages';
import type { InternalPublishOptions, PublishOptions } from './types';
import core from '@actions/core';

async function main() {
    // 1. 读取配置
    const token = core.getInput('token');
    core.setSecret(token);
    const inputs: PublishOptions = {
        token,
        tag: core.getInput('tag'),
        dryRun: core.getInput('dryRun') === 'true',
        target: core.getInput('target') as PublishOptions['target'],
        includePrivate: core.getInput('includePrivate') === 'true',
        disableProvenance: core.getInput('disableProvenance') === 'true',
    };
    const defaults: InternalPublishOptions = {
        dryRun: false,
        target: 'npm',
        includePrivate: false,
        tag: 'latest',
        token: '',
        disableProvenance: false,
    };
    const options = {} as InternalPublishOptions;

    for (const [key, defaultVal] of Object.entries(defaults)) {
        const input = inputs[key as keyof PublishOptions];

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        options[key as keyof PublishOptions] = input === undefined ? defaultVal : input;
    }

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
