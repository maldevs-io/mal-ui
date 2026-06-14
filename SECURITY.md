# Security Policy

Security reports are taken seriously. Please do not open public issues for
vulnerabilities until the maintainers have reviewed the report.

## Supported Versions

| Version | Support status |
| --- | --- |
| `main` | Security fixes land here first |
| Latest npm release | Supported |
| Older releases | Best effort only |

## Reporting a Vulnerability

Use GitHub private vulnerability reporting:

<https://github.com/maldevs-io/mal-ui/security/advisories/new>

If that is not available, open a minimal public issue asking for a private
maintainer contact path. Do not include exploit details, secrets, tokens, or
private user data in the public issue.

Please include:

- A clear description of the issue.
- Affected package version or commit SHA.
- Steps to reproduce, proof of concept, or affected API.
- Potential impact.
- Any suggested fix, if you have one.

## Response Expectations

Maintainers aim to:

- Acknowledge valid reports within 5 business days.
- Confirm impact and affected versions as soon as practical.
- Prepare and release a fix before public disclosure when possible.
- Credit reporters if they want credit.

## Scope

In scope:

- Vulnerabilities in source code, build scripts, package exports, or published
  artifacts.
- Supply-chain issues that affect this package.
- Unsafe defaults that can reasonably affect consuming applications.

Out of scope:

- Vulnerabilities only in an unsupported dependency version.
- Reports without a practical security impact.
- Social engineering, spam, or denial-of-service against maintainers or project
  infrastructure.
