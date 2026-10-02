import { appLabelKey } from '../data/profile';
import { getProjectById } from '../data/projects';
import { useI18n } from '../i18n/useI18n';
import type { WindowId } from '../types';

/**
 * Translated label for an application window.
 * Project details use the project title when one is open.
 */
export function useAppLabel(id: WindowId, projectId?: string): string {
  const { t } = useI18n();
  if (id === 'project-detail') {
    return getProjectById(projectId)?.title ?? t.apps.projectDetail;
  }
  return t.apps[appLabelKey[id]];
}