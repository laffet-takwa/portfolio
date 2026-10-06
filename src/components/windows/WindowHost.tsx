import { useWindowManager, TASKBAR_HEIGHT } from '../../context/WindowManagerProvider';
import { useAppLabel } from '../../hooks/useAppLabel';
import { appIcon } from '../../data/profile';
import { WindowFrame } from './WindowFrame';
import { AboutApp } from '../about/AboutApp';
import { ProjectsApp } from '../projects/ProjectsApp';
import { ProjectDetailApp } from '../projects/ProjectDetailApp';
import { SkillsApp } from '../skills/SkillsApp';
import { ExperienceApp } from '../experience/ExperienceApp';
import { EducationApp } from '../education/EducationApp';
import { CertificationsApp } from '../certifications/CertificationsApp';
import { ResumeApp } from '../resume/ResumeApp';
import { ContactApp } from '../contact/ContactApp';
import { BookingApp } from '../booking/BookingApp';
import { TerminalApp } from '../terminal/TerminalApp';
import { SettingsApp } from '../settings/SettingsApp';
import type { ManagedWindow } from '../../types';

function WindowBody({ win }: { win: ManagedWindow }) {
  switch (win.id) {
    case 'about':
      return <AboutApp />;
    case 'projects':
      return <ProjectsApp />;
    case 'project-detail':
      return <ProjectDetailApp projectId={win.projectId} />;
    case 'skills':
      return <SkillsApp />;
    case 'experience':
      return <ExperienceApp />;
    case 'education':
      return <EducationApp />;
    case 'certifications':
      return <CertificationsApp />;
    case 'resume':
      return <ResumeApp />;
    case 'contact':
      return <ContactApp />;
    case 'booking':
      return <BookingApp />;
    case 'terminal':
      return <TerminalApp />;
    case 'settings':
      return <SettingsApp />;
    default:
      return null;
  }
}

/** Wrapper that resolves the translated window title for a given window. */
function HostedWindow({ win }: { win: ManagedWindow }) {
  const title = useAppLabel(win.id, win.projectId);
  return (
    <WindowFrame win={win} title={title} icon={appIcon(win.id)}>
      <WindowBody win={win} />
    </WindowFrame>
  );
}

export function WindowHost() {
  const { windows, isMobile } = useWindowManager();
  const visible = windows.filter((win) => !win.minimized);

  if (visible.length === 0) return null;

  return (
    <div
      className="pointer-events-none"
      style={
        isMobile
          ? undefined
          : { position: 'fixed', inset: `0 0 ${TASKBAR_HEIGHT}px 0`, zIndex: 100 }
      }
    >
      {visible.map((win) => (
        <div key={win.id} className="pointer-events-auto contents">
          <HostedWindow win={win} />
        </div>
      ))}
    </div>
  );
}