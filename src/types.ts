export type PublishTarget = 'npm' | 'github';

export type PublishOptions = {
    target?: PublishTarget;
    token: string;
    tag?: string;
    dryRun?: boolean;
    includePrivate?: boolean;
    disableProvenance?: boolean;
};

export type InternalPublishOptions = Required<PublishOptions>;
