import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const migrationDirectory = resolve(root, "docs/migration");
const actions = new Set([
  "KEEP",
  "UPDATE",
  "CONSOLIDATE",
  "REDIRECT",
  "REMOVE",
  "NOINDEX",
]);
const topics = new Set([
  "",
  "Purpose",
  "Success & Fulfillment",
  "Leadership",
  "Personal Growth",
  "Relationships",
  "Your Genius",
  "Circle Blueprint",
  "Reflections",
]);
const requiredFields = [
  "currentUrl",
  "title",
  "contentType",
  "canonicalUrl",
  "statusCode",
  "proposedNewContentType",
  "proposedPrimaryTopic",
  "proposedNewUrl",
  "migrationAction",
  "migrationNotes",
];

const inventory = JSON.parse(
  await readFile(
    resolve(migrationDirectory, "migration-inventory.json"),
    "utf8",
  ),
);
const sourceSummary = JSON.parse(
  await readFile(resolve(migrationDirectory, "source-summary.json"), "utf8"),
);
const errors = [];
const seenUrls = new Set();

for (const [index, entry] of inventory.entries()) {
  const label = entry.currentUrl || `row ${index + 1}`;
  for (const field of requiredFields) {
    if (!(field in entry)) errors.push(`${label}: missing field ${field}`);
  }
  if (seenUrls.has(entry.currentUrl))
    errors.push(`${label}: duplicate inventory URL`);
  seenUrls.add(entry.currentUrl);
  if (!actions.has(entry.migrationAction)) {
    errors.push(`${label}: invalid action ${entry.migrationAction}`);
  }
  if (!topics.has(entry.proposedPrimaryTopic)) {
    errors.push(
      `${label}: invalid proposed topic ${entry.proposedPrimaryTopic}`,
    );
  }
  if (!Number.isInteger(entry.statusCode) || entry.statusCode < 0) {
    errors.push(`${label}: invalid status code ${entry.statusCode}`);
  }
  if (
    ["KEEP", "UPDATE", "CONSOLIDATE", "REDIRECT", "NOINDEX"].includes(
      entry.migrationAction,
    ) &&
    !entry.proposedNewUrl
  ) {
    errors.push(`${label}: ${entry.migrationAction} requires a proposed URL`);
  }
  if (
    ["CONSOLIDATE", "REDIRECT"].includes(entry.migrationAction) &&
    entry.proposedNewUrl === "/"
  ) {
    errors.push(`${label}: unrelated redirects to the homepage are prohibited`);
  }
  if (entry.migrationAction === "REMOVE" && entry.proposedNewUrl) {
    errors.push(`${label}: REMOVE must not define a redirect destination`);
  }
}

if (inventory.length !== sourceSummary.summary.totalUrls) {
  errors.push(
    `Inventory has ${inventory.length} rows but summary reports ${sourceSummary.summary.totalUrls}`,
  );
}

const calculatedActionCounts = Object.fromEntries(
  [...actions].map((action) => [
    action,
    inventory.filter((entry) => entry.migrationAction === action).length,
  ]),
);
for (const action of actions) {
  if (
    calculatedActionCounts[action] !==
    sourceSummary.summary.actionCounts[action]
  ) {
    errors.push(
      `${action}: inventory count ${calculatedActionCounts[action]} does not match summary ${sourceSummary.summary.actionCounts[action]}`,
    );
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log(
    JSON.stringify(
      {
        valid: true,
        totalUrls: inventory.length,
        uniqueUrls: seenUrls.size,
        actionCounts: calculatedActionCounts,
      },
      null,
      2,
    ),
  );
}
