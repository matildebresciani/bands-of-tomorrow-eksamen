import type { getGlobalOptions } from '../data/get-selected-global-options';

export type GlobalOptions = Awaited<ReturnType<typeof getGlobalOptions>>;
