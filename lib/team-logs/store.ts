export type TeamLogLevel = "info" | "warn" | "error";

export type TeamLogMeta = Record<
  string,
  string | number | boolean | null | undefined
>;

export type TeamLogEntry = {
  id: string;
  timestamp: string;
  level: TeamLogLevel;
  message: string;
  path?: string;
  meta?: TeamLogMeta;
};

const logs: TeamLogEntry[] = [];

const MAX_LOGS = 200;
const MAX_TEXT_LENGTH = 1000;

const SECRET_KEY_PATTERN =
  /(authorization|cookie|set-cookie|password|passwd|secret|token|api[_-]?key|service[_-]?role|access[_-]?token|refresh[_-]?token|private[_-]?key)/i;

function sanitizeString(value: string) {
  return value
    .replace(
      /bearer\s+[^\s]+/gi,
      "[redacted]"
    )
    .replace(
      /sb_[a-zA-Z0-9._-]+/g,
      "[redacted]"
    )
    .replace(
      /sk-[a-zA-Z0-9._-]+/g,
      "[redacted]"
    )
    .replace(
      /supabase/gi,
      "[redacted]"
    )
    .replace(
      /service[_-]?role/gi,
      "[redacted]"
    )
    .replace(
      /authorization/gi,
      "[redacted]"
    )
    .slice(0, MAX_TEXT_LENGTH);
}

function sanitizeMeta(meta?: TeamLogMeta): TeamLogMeta | undefined {
  if (!meta) {
    return undefined;
  }

  const safe: TeamLogMeta = {};

  for (const [key, value] of Object.entries(meta)) {
    if (SECRET_KEY_PATTERN.test(key)) {
      safe[key] = "[redacted]";
      continue;
    }

    if (typeof value === "string") {
      safe[key] = sanitizeString(value);
    } else {
      safe[key] = value;
    }
  }

  return safe;
}

export function addTeamLog(
  level: TeamLogLevel,
  message: string,
  path?: string,
  meta?: TeamLogMeta,
) {
  logs.unshift({
    id: `${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 8)}`,

    timestamp: new Date().toISOString(),

    level,

    message: sanitizeString(message),

    path: path
      ? sanitizeString(path)
      : undefined,

    meta: sanitizeMeta(meta),
  });

  if (logs.length > MAX_LOGS) {
    logs.length = MAX_LOGS;
  }
}

export function logInfo(
  message: string,
  path?: string,
  meta?: TeamLogMeta,
) {
  addTeamLog(
    "info",
    message,
    path,
    meta,
  );
}

export function logWarn(
  message: string,
  path?: string,
  meta?: TeamLogMeta,
) {
  addTeamLog(
    "warn",
    message,
    path,
    meta,
  );
}

export function logError(
  message: string,
  path?: string,
  meta?: TeamLogMeta,
) {
  addTeamLog(
    "error",
    message,
    path,
    meta,
  );
}

export function getTeamLogs(limit = 100) {
  return logs.slice(
    0,
    Math.min(
      Math.max(limit, 1),
      MAX_LOGS,
    ),
  );
}
