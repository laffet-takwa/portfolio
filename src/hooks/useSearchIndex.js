import { useMemo } from 'react';
import { appIcon, appLabelKey, APP_IDS } from '../data/profile';
import { publishedProjects } from '../data/projects';
import { skillGroups } from '../data/skills';
import { useI18n } from '../i18n/useI18n';
import { resolveText } from '../types';
/** Unified index over applications, projects and skills. */
export function useSearchIndex() {
    const { t, locale } = useI18n();
    return useMemo(() => {
        const appItems = APP_IDS.filter((id) => id !== 'project-detail').map((id) => {
            const label = t.apps[appLabelKey[id]];
            return {
                type: 'app',
                id,
                title: label,
                subtitle: t.start.allApps,
                icon: appIcon(id),
                keywords: `${label} ${id}`,
            };
        });
        const projectItems = publishedProjects.map((project) => ({
            type: 'project',
            id: project.id,
            title: project.title,
            subtitle: project.category.join(' · '),
            icon: project.icon ?? 'folder',
            keywords: `${project.title} ${project.id} ${project.category.join(' ')} ${project.technologies.join(' ')} ${resolveText(project.description, locale)}`,
        }));
        const skillItems = skillGroups.flatMap((group) => group.items.map((item) => ({
            type: 'skill',
            id: item,
            title: item,
            subtitle: resolveText(group.label, locale),
            icon: group.icon,
            keywords: `${item} ${resolveText(group.label, locale)}`,
        })));
        return [...appItems, ...projectItems, ...skillItems];
    }, [t, locale]);
}
