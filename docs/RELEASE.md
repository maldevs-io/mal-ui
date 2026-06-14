# Release Guide

This guide is for maintainers.

## Release Requirements

- Write access to the repository.
- npm publish access for the `mal-ui` package.
- `NPM_TOKEN` configured in GitHub Actions secrets.
- A clean default branch with passing CI.

## Pre-release Checklist

Run locally from the repository root:

```bash
bun install --frozen-lockfile
bun run lint
bun run typecheck
bun run test
bun run build
npm pack --dry-run
```

Update `CHANGELOG.md` with the release summary before tagging.

## Publishing

Create and push a semver tag from the default branch:

```bash
git checkout main
git pull --ff-only
git tag vX.Y.Z
git push origin vX.Y.Z
```

The release workflow will:

1. Read the version from the tag.
2. Update `package.json`.
3. Run lint, typecheck, tests, build, and package verification.
4. Commit the version bump back to the default branch.
5. Publish the package to npm.

## After Publishing

- Confirm the package version appears on npm.
- Create GitHub release notes from the changelog entry.
- Close or update milestone issues.
- Announce important migration notes in the release description.

## Failed Releases

If publishing fails after the tag is pushed:

1. Fix the problem on the default branch.
2. Delete the failed local and remote tag only if the package was not published.
3. Recreate the tag from the fixed commit.

Never overwrite a tag for a version that has already been published to npm.
