namespace NodeJS {
    interface ProcessEnv {
        /**
         * package name
         * defined in vite.config.mts
         */
        PKG_NAME: string;

        /**
         * package version
         * defined in vite.config.mts
         */
        PKG_VERSION: string;
    }
}
