import type { Block } from 'payload';

export const Playlist: Block = {
    slug: 'playlist',
    interfaceName: 'Playlist',
    imageURL: '/images/block-thumbnails/playlist.png',
    labels: {
        singular: 'Playlist',
        plural: 'Playlists',
    },
    fields: [
        {
            type: 'text',
            name: 'title',
            label: 'Title',
            defaultValue: 'Bands of Tomorrow - Nye udgivelser',
        },
        {
            name: 'playlistScript',
            type: 'code',
            label: 'Playlist Embed Script',
            admin: {
                language: 'html',
                description: 'Indsæt embed iframe fra Spotify.',
            },
        },
    ],
};
