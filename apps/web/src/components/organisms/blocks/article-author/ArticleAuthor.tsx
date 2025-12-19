import AuthorCard from '@/components/molecules/frontend/AuthorCard';
import type { BC } from '@/lib/types/block-props';
import type { ArticleAuthor as ArticleAuthorProps } from '@/payload-types';
import BaseBlock from '../base-block/BaseBlock';

const ArticleAuthorBlock: BC<ArticleAuthorProps> = ({ block }) => {
    const { author } = block;

    return (
        <BaseBlock>
            <div className="oakgrid">
                <div className="col-span-12 flex justify-center">
                    <AuthorCard author={author} />
                </div>
            </div>
        </BaseBlock>
    );
};

export default ArticleAuthorBlock;
