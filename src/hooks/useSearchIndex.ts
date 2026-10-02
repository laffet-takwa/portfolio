import { useMemo } from 'react';
import { appIcon, appLabelKey, APP_IDS } from '../data/profile';
import { publishedProjects } from '../data/projects';
import { skillGroups } from '../data/skills';
import { useI18n } from '../i18n/useI18n';
import { resolveText } from '../types';
import type { IconName } from '../types';

export interface SearchItem {
  type: 'app' | 'project' | 'skill';
  id: string;
  title: string;
  subtitle: string;
  icon: IconName;
  keywords: string;
}

/** Unified index over applications, projects and skills. */
export function useSearchIndex(): SearchItem[] {
  const { t, locale } = useI18n();

  return useMemo(() => {
    const appItems: SearchItem[] = APP_IDS.filter((id) => id !== 'project-detail').map((id) => {
      const label = t.apps[appLabelKey[id]];
      return {
        type: 'app' as const,
        id,
        title: label,
        subtitle: t.start.allApps,
        icon: appIcon(id),
        keywords: `${label} ${id}`,
      };
    });

    const projectItems: SearchItem[] = publishedProjects.map((project) => ({
      type: 'project' as const,
      id: project.id,
      title: project.title,
      subtitle: project.category.join(' · '),
      icon: project.icon ?? 'folder',
      keywords: `${project.title} ${project.id} ${project.category.join(' ')} ${project.technologies.join(
        ' ',
      )} ${resolveText(project.description, locale)}`,
    }));

    const skillItems: SearchItem[] = skillGroups.flatMap((group) =>
      group.items.map((item) => ({
        type: 'skill' as const,
        id: item,
        title: item,
        subtitle: resolveText(group.label, locale),
        icon: group.icon,
        keywords: `${item} ${resolveText(group.label, locale)}`,
      })),
    );

    return [...appItems, ...projectItems, ...skillItems];
  }, [t, locale]);
}