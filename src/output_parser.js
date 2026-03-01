function toText(value) {
  return value == null ? "" : String(value);
}

function parseErrorCodes(text) {
  const regex = /\*ERROR\s+([0-9A-Z]+)/gi;
  const ordered = [];
  const seen = new Set();
  let match = regex.exec(text);
  while (match) {
    const code = String(match[1] || "").toUpperCase();
    if (code && !seen.has(code)) {
      seen.add(code);
      ordered.push(code);
    }
    match = regex.exec(text);
  }
  return ordered;
}

function parseMystranOutput(raw = {}) {
  const stdout = toText(raw.stdout);
  const stderr = toText(raw.stderr);
  const text = stdout && stderr ? `${stdout}\n${stderr}` : `${stdout}${stderr}`;
  const lines = text.replace(/\r\n/g, "\n").split("\n");

  const errorCodes = parseErrorCodes(text);
  const warningCount = (text.match(/\*WARNING/gi) || []).length;

  const hasNormalTermination = /MYSTRAN terminated normally/i.test(text);
  const hasRuntimeAbort =
    /fatal Fortran runtime error/i.test(text) ||
    /RuntimeError:\s*(Aborted|unreachable|memory access out of bounds|table index is out of bounds)/i.test(text) ||
    /Aborted\(/i.test(text);
  const hasSolverError =
    errorCodes.length > 0 ||
    /PROCESSING STOPPED/i.test(text) ||
    /CHECK F06 OUTPUT FILE/i.test(text);

  return {
    text,
    lines,
    stdout,
    stderr,
    exitCode: Number.isInteger(raw.exitCode) ? raw.exitCode : null,
    timedOut: Boolean(raw.timedOut),
    signal: raw.signal || null,
    hasNormalTermination,
    hasRuntimeAbort,
    hasSolverError,
    warningCount,
    errorCodes,
    firstErrorCode: errorCodes.length > 0 ? errorCodes[0] : null
  };
}

export { parseMystranOutput };
