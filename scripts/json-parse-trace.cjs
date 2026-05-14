const originalParse = JSON.parse;
const fs = require("fs");

const originalReadFile = fs.promises.readFile.bind(fs.promises);
let lastRead = null;

fs.promises.readFile = async function tracedReadFile(file, options) {
  const result = await originalReadFile(file, options);
  if (typeof result === "string") {
    lastRead = {
      file: String(file),
      length: result.length,
      sample: result.slice(0, 240),
    };
  }
  return result;
};

JSON.parse = function tracedJsonParse(value, reviver) {
  try {
    return originalParse.call(this, value, reviver);
  } catch (error) {
    const input =
      typeof value === "string"
        ? value.slice(0, 240)
        : Object.prototype.toString.call(value);

    console.error("[json-parse-trace] JSON.parse failed");
    if (lastRead) {
      console.error(`[json-parse-trace] last read: ${lastRead.file}`);
      console.error(`[json-parse-trace] last read length: ${lastRead.length}`);
      console.error(lastRead.sample);
    }
    console.error(input);
    console.error(error && error.stack ? error.stack : error);
    throw error;
  }
};
