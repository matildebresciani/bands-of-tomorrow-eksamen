import Disc from '@/components/atoms/frontend/icons/Disc';
import { getCachedEntryById } from '@/lib/data/payload/get-cached-entry-by-id';
import type { BC } from '@/lib/types/block-props';
import { cn } from '@/lib/utilities/ui';
import type { Form as FormProps } from '@/payload-types';
import BaseBlock from '../base-block/BaseBlock';
import FormClient from './Form.client';

const FormBlock: BC<FormProps> = async ({ block, locale }) => {
    const { layout, heading, description, form } = block;

    const dynamicForm = await getCachedEntryById({
        collection: 'dynamic-forms',
        id: typeof form === 'string' ? form : form?.id,
        locale,
    });

    return (
        <BaseBlock>
            <div className={cn('oakgrid', layout === 'one-column' && 'relative')}>
                {/* Disc kun i one-column: centreret horisontalt, stor fixed størrelse, ligger bagved */}
                {layout === 'one-column' && (
                    <Disc className="hidden md:block absolute left-1/2 top-0 z-0 pointer-events-none -translate-x-1/2 col-start-2 col-span-10 h-full opacity-40" />
                )}
                <div
                    className={cn(
                        'space-y-l',
                        layout === 'one-column' && 'col-span-12 md:col-start-4 md:col-span-6 justify-center mb-l',
                        layout === 'two-columns' && 'col-span-12 md:col-span-5',
                    )}
                >
                    {heading && (
                        <h2
                            className={cn(
                                'uppercase',
                                layout === 'one-column' && 'text-center',
                                layout === 'two-columns' && 'text-left',
                            )}
                        >
                            {heading}
                        </h2>
                    )}
                    {description && <p className={cn('', layout === 'two-columns' && 'pb-m')}>{description}</p>}
                </div>
                {dynamicForm && <FormClient form={dynamicForm} layout={layout} />}
            </div>
        </BaseBlock>
    );
};

export default FormBlock;
