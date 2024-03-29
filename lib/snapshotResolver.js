let snapshotResolver = {
  // resolves from test to snapshot path
  resolveSnapshotPath: (testPath, snapshotExtension) =>
    testPath.replace("components/", "./__tests__/__snapshots__/") +
    snapshotExtension,

  // resolves from snapshot to test path
  resolveTestPath: (snapshotFilePath, snapshotExtension) =>
    snapshotFilePath
      .replace("__tests__/__snapshots__/", "components/")
      .slice(0, -snapshotExtension.length),

  // Example test path, used for preflight consistency check of the implementation above
  testPathForConsistencyCheck: "some/__tests__/example.test.js",
};

export default snapshotResolver;
