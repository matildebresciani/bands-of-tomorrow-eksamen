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
            defaultValue:
                '<iframe data-testid="embed-iframe" style="border-radius:12px" src="https://open.spotify.com/embed/playlist/7faMocNTEh9JA0FFEMksjE?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>',
            admin: {
                language: 'html',
                description: 'Indsæt embed iframe fra Spotify.',
            },
        },
    ],
};
