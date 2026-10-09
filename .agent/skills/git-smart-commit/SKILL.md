---
name: Git Smart Commit
description: Automatically splits messy git changes into multiple meaningful conventional commits based on functional logic
---

# Git Smart Commit — Smart Commit Splitting

Groups all current staged / unstaged changes by functional logic, then runs `git add` + `git commit` batch by batch.

---

## Workflow

### 1. Check the Change Status

Run the following command to get the full list of changes:

```bash
git status --short
```

If there are no changes, tell the user "There are currently no changes to commit" and stop.

Then get the diff of all changes (used to decide the grouping logic):

```bash
git diff
git diff --cached
```

---

### 2. Analyze and Group

Split the file changes into multiple **commit groups** along the dimensions below, each group representing one independent logical unit:

#### Grouping Criteria (in priority order)

| Priority | Dimension | Examples |
|--------|------|------|
| 1 | **Project scaffolding / config files** | `package.json`, `vite.config.*`, `.gitignore`, `README.md`, `tsconfig.json` |
| 2 | **Data layer / config data** | `src/data/*.js`, `src/constants/*`, `src/config/*` |
| 3 | **Components (grouped by component name)** | `src/components/Hero.jsx` + its tests + its styles |
| 4 | **Pages / routes** | `src/pages/*`, `src/routes/*`, `src/App.jsx` |
| 5 | **Global styles** | `src/index.css`, `src/styles/*`, `src/theme/*` |
| 6 | **Utilities / hooks / types** | `src/utils/*`, `src/hooks/*`, `src/types/*` |
| 7 | **Tests** | `__tests__/*`, `*.test.*`, `*.spec.*` |
| 8 | **Docs / other** | `docs/*`, `*.md` (other than README), other miscellaneous files |

#### Grouping Rules

- **A component's JSX/TSX + CSS Module + tests → go in the same group**
- **Related data files that serve a specific component → may be merged or kept separate**, depending on the size of the change
- **If a group has only 1 file and the change is tiny (< 5 lines) → merge it into the most closely related neighboring group**
- **Use `feat` for new files, `fix` / `refactor` / `style` for modifications, and `chore` for deletions**

---

### 3. Produce the Commit Plan

Before running any git operation, list the plan so the user can confirm it:

```
📋 Commit plan (N commits total)

1. chore(project): initialize project config and dependencies
   → package.json, vite.config.js, .gitignore

2. feat(data): add config data for each homepage section
   → src/data/navigation.js, src/data/hero.js, ...

3. feat(navbar): add Navbar component (with responsive hamburger menu)
   → src/components/Navbar.jsx

...

Proceed? (Y/n)
```

Use the `notify_user` tool to show the plan to the user and wait for confirmation.

---

### 4. Commit Batch by Batch

After the user confirms, run the following for each group in order:

```bash
git add <file1> <file2> ...
git commit -m "<type>(<scope>): <subject>"
```

#### Commit Message Format

```
<type>(<scope>): <short description, in English>
```

**type reference:**

| type | When to use |
|------|---------|
| `feat` | New feature, component, or page |
| `fix` | Bug fix |
| `style` | Pure styling changes (no effect on logic) |
| `refactor` | Refactoring (no change in behavior) |
| `chore` | Chores (config files, scaffolding, CI) |
| `docs` | Documentation updates |
| `test` | Test-related |

**scope rules:**
- Components: use the lowercase component name, e.g. `hero`, `navbar`, `pricing`
- Data layer: `data`
- Global styles: `style`
- Project config: `project`
- Multiple scopes: use the most significant one; do not join them with slashes

**subject rules:**
- Write in English
- No more than 50 characters
- Do not end with a period
- Start with a verb: add, adjust, fix, remove, refactor

---

### 5. Confirm the Result

After all commits are done, run:

```bash
git log --oneline -20
```

Show the result to the user and confirm that every commit was created correctly.

---

## Edge Cases

- **Conflicts or a merge in progress**: remind the user to resolve the conflicts first, and do not perform any operation
- **`.env` or sensitive files present**: remind the user to confirm whether they should be gitignored, and do not commit them automatically
- **Very large change set (> 50 files)**: produce a grouping summary first, and proceed only after the user confirms
- **The user already has some staged changes**: respect the staged state, and treat it as its own group or merge it into the most closely related group
