# Reviewing a Revision Locally

## Quick reference

```bash
# 1. Pull the revision onto a local branch
arc patch D<number>

# 2. Uncommit to see the diff in your editor (optional)
git reset HEAD~1

# 3. Test, review, run dev server, etc.

# 4. Clean up when done
git checkout -- .
git clean -fd                    # remove any new untracked files
git checkout main
git branch -D arcpatch-D<number>
```
