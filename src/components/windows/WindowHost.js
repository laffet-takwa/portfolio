import { jsx as _jsx } from "react/jsx-runtime";
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
import { TerminalApp } from '../terminal/TerminalApp';
import { SettingsApp } from '../settings/SettingsApp';
function WindowBody({ win }) {
    switch (win.id) {
        case 'about':
            return _jsx(AboutApp, {});
        case 'projects':
            return _jsx(ProjectsApp, {});
        case 'project-detail':
            return _jsx(ProjectDetailApp, { projectId: win.projectId });
        case 'skills':
            return _jsx(SkillsApp, {});
        case 'experience':
            return _jsx(ExperienceApp, {});
        case 'education':
            return _jsx(EducationApp, {});
        case 'certifications':
            return _jsx(CertificationsApp, {});
        case 'resume':
            return _jsx(ResumeApp, {});
        case 'contact':
            return _jsx(ContactApp, {});
        case 'terminal':
            return _jsx(TerminalApp, {});
        case 'settings':
            return _jsx(SettingsApp, {});
        default:
            return null;
    }
}
/** Wrapper that resolves the translated window title for a given window. */
function HostedWindow({ win }) {
    const title = useAppLabel(win.id, win.projectId);
    return (_jsx(WindowFrame, { win: win, title: title, icon: appIcon(win.id), children: _jsx(WindowBody, { win: win }) }));
}
export function WindowHost() {
    const { windows, isMobile } = useWindowManager();
    const visible = windows.filter((win) => !win.minimized);
    if (visible.length === 0)
        return null;
    return (_jsx("div", { className: "pointer-events-none", style: isMobile
            ? undefined
            : { position: 'fixed', inset: `0 0 ${TASKBAR_HEIGHT}px 0`, zIndex: 100 }, children: visible.map((win) => (_jsx("div", { className: "pointer-events-auto contents", children: _jsx(HostedWindow, { win: win }) }, win.id))) }));
}
