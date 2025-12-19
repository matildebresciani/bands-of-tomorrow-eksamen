import { initPayload } from '../config';
import type { GlobalOptions } from '../types/global';

const getGlobalOptions = async () => {
    const payload = await initPayload();

    const options = await payload.findGlobal({
        slug: 'options',
    });

    return options;
};

/**
 * Gets a selected option from the global options
 * @param name Key of the options object
 * @returns The value of the selected option
 */
const getSelectedOption = async <K extends keyof GlobalOptions>(name: K): Promise<GlobalOptions[K]> => {
    const options = await getGlobalOptions();
    return options[name];
};

export { getGlobalOptions, getSelectedOption };
