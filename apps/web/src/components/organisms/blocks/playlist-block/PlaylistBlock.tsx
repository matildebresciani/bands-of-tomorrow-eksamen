import type { BC } from '@/lib/types/block-props';
import type { Playlist as PlaylistProps } from '@/payload-types';
import BaseBlock from '../base-block/BaseBlock';

const PlaylistBlock: BC<PlaylistProps> = ({ block }) => {
    const { playlistScript, title } = block;

    return (
        <BaseBlock>
            <div className="oakgrid">
                <div className="col-span-12 lg:col-start-2 lg:col-span-10">
                    <h4 className="mb-l uppercase">{title}</h4>
                    {playlistScript && <div dangerouslySetInnerHTML={{ __html: playlistScript }} />}
                </div>
            </div>
        </BaseBlock>
    );
};

export default PlaylistBlock;
