import { HatApplication } from '@dataswift/hat-js/lib/interfaces/hat-application.interface';

enum HatApplicationStatus {
  GOTO = 'goto',
  RUNNING = 'running',
  FETCHING = 'fetching',
  FAILING = 'failing',
  UNTOUCHED = 'untouched',
  UPDATE = 'update',
}

enum HatApplicationKind {
  DATAPLUG = 'DataPlug',
  APP = 'App',
}

type HatAppStatusIcons = 'check_circle' | 'sync' | 'sync_problem' | 'add_circle_outline' | 'refresh' | 'exit_to_app';

export const getAppStatus = (app: HatApplication): HatApplicationStatus => {
  const { setup, enabled, active, needsUpdating, mostRecentData } = app;
  const kind = app.application.kind.kind;

  if (setup && needsUpdating) return HatApplicationStatus.UPDATE;
  else if (enabled && !active) return HatApplicationStatus.FAILING;
  else if (enabled && active)
    return !mostRecentData && kind === HatApplicationKind.DATAPLUG
      ? HatApplicationStatus.FETCHING
      : kind === HatApplicationKind.APP
        ? HatApplicationStatus.GOTO
        : HatApplicationStatus.RUNNING;
  else return HatApplicationStatus.UNTOUCHED;
};

export const getStatusIcon = (app: HatApplication): HatAppStatusIcons => {
  switch (getAppStatus(app)) {
    case HatApplicationStatus.RUNNING:
      return 'check_circle';
    case HatApplicationStatus.GOTO:
      return 'exit_to_app';
    case HatApplicationStatus.FETCHING:
      return 'sync';
    case HatApplicationStatus.FAILING:
      return 'sync_problem';
    case HatApplicationStatus.UPDATE:
      return 'refresh';
    default:
      return 'add_circle_outline';
  }
};
