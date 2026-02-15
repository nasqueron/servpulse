# Git + Arc Workflow

## Normal flow

```bash
git checkout -b my-branch
# make changes
git add -A
arc diff --nolint                  # creates/updates a Phabricator revision
# after review is accepted:
arc land --onto main
```

## Common commands

| Action | Command |
|--------|---------|
| Create/update revision | `arc diff --nolint` |
| Land after acceptance | `arc land --onto main` |
| Update existing revision | make changes → `git add -A` → `arc diff --nolint` |
| Amend commit message | `arc diff --edit --nolint` |

## Mistakes & fixes

**Accidentally ran `git commit` + `git push` instead of `arc diff`:**
```bash
arc diff main --nolint             # create revision from existing commit
```

**`arc land` says "unknown revision":**
```bash
arc diff main --nolint             # link commit to a revision first
arc land --onto main
```

**`arc diff` says "no changes found":**
```bash
arc diff main --nolint             # specify base branch explicitly
```

**Force land a specific revision:**
```bash
arc land --onto main --revision D1234
```
