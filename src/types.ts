export type PublishTarget = 'npm' | 'github';

export type PublishOptions = {
    target?: PublishTarget;
    token: string;
    tag?: string;
    provenance?: boolean;
    dryRun?: boolean;
    includePrivate?: boolean;
};
