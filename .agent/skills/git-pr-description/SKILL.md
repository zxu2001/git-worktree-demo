---
name: Git PR Description
description: Automatically generates a Pull Request Title and Description from the differences between the current branch and the target branch. This Skill is triggered when the user mentions "PR", "Pull Request", "write a PR", "PR description", or "create a PR".
---

# Git PR Description — Auto-Generate a PR Title and Description

Produces a structured PR Title and Description from all commits and the diff of the current branch relative to the target branch (default `master`).

---

## Workflow

### 1. Confirm Branch Information

Get the current branch name and the target branch:

```bash
git branch --show-current
```

The default target branch is `master`. If the user specifies a different base branch, use the one the user specifies.

Confirm that the current branch has commits that differ from the target branch:

```bash
git log --oneline master..HEAD
```

If there is no difference, tell the user "The current branch has no differences from the target branch" and stop.

---

### 2. Gather Change Information

Get the full commit list and diff:

```bash
# commit summary
git log --oneline master..HEAD

# detailed commit messages
git log --format="%h %s%n%b" master..HEAD

# changed-file statistics
git diff --stat master..HEAD

# full diff (used to analyze the specific changes)
git diff master..HEAD
```

---

### 3. Analyze the Changes

Based on the information gathered, analyze:

- **Purpose of the change**: what problem this branch solves or what feature it adds
- **Scope of the change**: which components, modules, and config files are involved
- **Impact**: whether there are breaking changes, and whether existing functionality is affected

---

### 4. Generate the PR Title

#### Title Format

```
<type>: <short description>
```

**type reference:**

| type | When to use |
|------|----------|
| `feat` | New feature |
| `fix` | Bug fix |
| `refactor` | Refactoring |
| `style` | Styling changes |
| `chore` | Chores, configuration |
| `docs` | Documentation updates |
| `test` | Test-related |

**Title rules:**

- Write the description in English
- No more than 72 characters
- Start with a verb: Add, Adjust, Fix, Remove, Refactor
- Describe the core purpose of this PR precisely

---

### 5. Generate the PR Description

Generate the Description using the template in `references/pr-template.md`.

#### Description Structure

```markdown
## 🎯 Why This Change

Briefly describe the background and motivation for this PR

## ⚠️ What Changed

Group by feature and requirement:
- **Feature name / requirement**: explain the business goal of this group of changes
- **Direction**: brief summary (performance, fix, styling, etc.)
- **Details**: list the specific changes. File paths of any kind (including relative paths) are **forbidden**; always use a functional description instead, e.g. "Add accordion expand animation" rather than "Modify `src/components/FAQ.jsx`"

### [Feature Name / Requirement]
- **Direction**: ...
- **Details**:
  - Specific change 1 (plain functional description)
  - Specific change 2 (plain functional description)

### [Another Feature Name]
- **Direction**: ...
- **Details**:
  - ...

## 🧪 Test Steps

> **Rule: at least one corresponding test case must be produced for every module / component listed under "What Changed", so that every change is covered.**

### Test Case 1: [Test scenario for module A]

1. Step one
2. Step two
3. **Expected result**: describe the expected behavior

### Test Case 2: [Test scenario for module B]

1. Step one
2. Step two
3. **Expected result**: describe the expected behavior

### Test Case N: [And so on, until every changed module has a corresponding test]
```

---

### 6. Output the Result

Output the complete PR Title + Description as a **markdown code block** so the user can copy and paste it straight into a GitHub PR.

Output format (the whole thing wrapped in a markdown code block):

````
```markdown
<title>

<full markdown content of the description, including ##, ###, lists, and other formatting>
```
````

**Notes:**
- Do not add extra prefixes such as `📝 PR Title:` outside the code block; output copy-ready markdown directly
- The first line inside the code block is the PR Title, followed by a blank line and then the Description
- The user may ask for any part to be adjusted before copying it
- **Important**: file paths of any kind (including relative paths) are **forbidden** in the Description; always use a plain functional description instead.

---

## 🛑 Strict Formatting Rules

- **No Markdown link syntax of any kind**: `[text](...)`
- **No URIs / schemes of any kind**: e.g. `file://`, `cci:`
- **No file paths of any kind**: whether relative or absolute, they must never appear in the Description; replace them with a plain functional description

## Edge Cases

- **Uncommitted changes exist**: remind the user to commit or stash first so nothing is missed

## Additional Resources

### Reference Files

- **`references/pr-template.md`** — the full PR Description template, which can be customized to the team's needs
