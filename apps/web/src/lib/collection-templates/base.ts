import type { CollectionConfig, GlobalConfig } from 'payload';

type CombinedConfig = GlobalConfig & CollectionConfig;

const createBaseCollection = (config: CombinedConfig): CombinedConfig => {
    return {
        ...config,
    };
};
