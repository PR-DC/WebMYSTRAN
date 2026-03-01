function isFiniteInteger(value) {
  return Number.isFinite(value) && Number.isInteger(value);
}

function toSafeIncludePath(pathValue) {
  const raw = String(pathValue);
  return raw.replace(/'/g, "''");
}

class MystranInput {
  constructor(lines = []) {
    this._lines = [];
    this.addLines(lines);
  }

  add(line) {
    if (Array.isArray(line)) {
      return this.addLines(line);
    }
    if (line == null) {
      return this;
    }
    this._lines.push(String(line));
    return this;
  }

  addLines(lines) {
    if (!lines) {
      return this;
    }
    for (const line of lines) {
      this.add(line);
    }
    return this;
  }

  blank(count = 1) {
    const n = isFiniteInteger(count) ? Math.max(0, count) : 1;
    for (let i = 0; i < n; i += 1) {
      this._lines.push("");
    }
    return this;
  }

  comment(text = "") {
    if (text == null || String(text).trim() === "") {
      this._lines.push("$");
      return this;
    }
    this._lines.push(`$ ${String(text)}`);
    return this;
  }

  sol(value) {
    return this.add(`SOL ${value}`);
  }

  cend() {
    return this.add("CEND");
  }

  subcase(id) {
    return this.add(`SUBCASE ${id}`);
  }

  set(key, value) {
    if (key == null || String(key).trim() === "") {
      throw new TypeError("set(key, value) expects a non-empty key.");
    }
    return this.add(`${String(key).trim()} = ${value}`);
  }

  setTitle(value) {
    return this.set("TITLE", value);
  }

  setSubtitle(value) {
    return this.set("SUBTITLE", value);
  }

  setLabel(value) {
    return this.set("LABEL", value);
  }

  beginBulk() {
    return this.add("BEGIN BULK");
  }

  endData() {
    return this.add("ENDDATA");
  }

  include(pathValue) {
    if (pathValue == null || String(pathValue).trim() === "") {
      throw new TypeError("include(path) expects a non-empty file path.");
    }
    const safePath = toSafeIncludePath(pathValue);
    return this.add(`INCLUDE '${safePath}'`);
  }

  param(name, value) {
    if (name == null || String(name).trim() === "") {
      throw new TypeError("param(name, value) expects a non-empty PARAM name.");
    }
    return this.add(`PARAM,${String(name).trim()},${value}`);
  }

  toArray() {
    return this._lines.slice();
  }

  toString() {
    return `${this._lines.join("\n")}\n`;
  }
}

export { MystranInput };
