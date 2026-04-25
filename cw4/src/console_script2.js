import fs from "node:fs";
import { argv, stdin, stdout } from "node:process";
import { execSync } from "node:child_process";

const COUNTER_FILE = "counter.json";

function getCount(data) {
  try {
    return JSON.parse(data).count || 0;
  } catch {
    return 0;
  }
}

function runSync() {
  let count = 0;
  try {
    const data = fs.readFileSync(COUNTER_FILE, "utf8");
    count = getCount(data);
  } catch {}
  count++;
  fs.writeFileSync(COUNTER_FILE, JSON.stringify({ count }));
  console.log(`  Liczba uruchomień: ${count}`);
}

function runAsync() {
  fs.readFile(COUNTER_FILE, "utf8", (err, data) => {
    let count = 0;
    if (!err) {
      count = getCount(data);
    }
    count++;
    fs.writeFile(COUNTER_FILE, JSON.stringify({ count }), (err) => {
      if (err) throw err;
      console.log(`  Liczba uruchomień: ${count}`);
    });
  });
}

function runInteractive() {
  console.log(
    "  Wprowadź komendy — naciśnięcie Ctrl+D kończy wprowadzanie danych",
  );
  stdin.setEncoding("utf8");
  stdin.on("data", (line) => {
    const cmd = line.trim();
    if (cmd) {
      try {
        const result = execSync(cmd).toString().trim();
        console.log(`  ${result}`);
      } catch (e) {
        console.error(`  Błąd: ${e.message}`);
      }
    }
  });
}

const arg = argv[2];

if (arg === "--sync") {
  runSync();
} else if (arg === "--async") {
  runAsync();
} else {
  runInteractive();
}
