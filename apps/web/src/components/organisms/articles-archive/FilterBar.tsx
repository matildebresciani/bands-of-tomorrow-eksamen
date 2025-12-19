'use client';
import FilterButton from '@/components/atoms/frontend/buttons/FilterButton';
import Checkbox from '@/components/atoms/frontend/inputs/Checkbox';
import type { Article, Genre } from '@/payload-types';
import { useMemo, useState } from 'react';
import ArticlesArchive from './ArticlesArchive';

type Props = {
    articles: Article[];
    genres: Genre[];
};

export default function FilterBar({ articles, genres }: Props) {
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [activeGenre, setActiveGenre] = useState<string | null>(null);

    const toggleType = (type: string) => {
        setSelectedTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]));
    };

    const genresWithArticles = useMemo(() => {
        const used = new Set<string>();
        articles.forEach((a) =>
            a.genres?.forEach((g) => {
                const id = typeof g === 'string' ? g : g.id;
                if (id) used.add(id);
            }),
        );
        return genres.filter((g) => used.has(g.id));
    }, [articles, genres]);

    const filteredArticles = useMemo(() => {
        return articles.filter((a) => {
            if (selectedTypes.length > 0 && !selectedTypes.includes(a.reviewType || '')) {
                return false;
            }
            if (activeGenre) {
                const ids = a.genres?.map((g) => (typeof g === 'string' ? g : g.id));
                if (!ids?.includes(activeGenre)) return false;
            }
            return true;
        });
    }, [articles, selectedTypes, activeGenre]);

    return (
        <div>
            <div className="space-y-m mb-section-xxs">
                {/* Label */}
                <h3 className="heading-lg">Filtrering:</h3>

                {/* TYPE FILTER */}
                <div className="flex flex-col md:flex-row gap-m md:gap-l justify-start md:items-center">
                    <Checkbox
                        label="Koncertanmeldelser"
                        checked={selectedTypes.includes('concert')}
                        onChange={() => toggleType('concert')}
                    />
                    <Checkbox
                        label="Albumanmeldelser"
                        checked={selectedTypes.includes('album')}
                        onChange={() => toggleType('album')}
                    />
                </div>

                {/* GENRE BUTTONS */}
                <div className="flex flex-wrap gap-s md:gap-m">
                    <FilterButton
                        label="Alle genrer"
                        active={activeGenre === null}
                        onClick={() => setActiveGenre(null)}
                    />

                    {genresWithArticles.map((genre) => (
                        <FilterButton
                            key={genre.id}
                            label={genre.name}
                            active={activeGenre === genre.id}
                            onClick={() => setActiveGenre(activeGenre === genre.id ? null : genre.id)}
                        />
                    ))}
                </div>
            </div>
            <ArticlesArchive articles={filteredArticles} />
        </div>
    );
}
