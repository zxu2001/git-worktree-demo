---
name: Git Worktree Design
description: This Skill is triggered automatically when the user's request is to add multiple features, when the request looks suitable for splitting into multiple feature branches developed in parallel, or when the user mentions "worktree", "git worktree", "multi-branch development", or "parallel branches". It first analyzes the requirements and proposes a worktree split, then creates the worktrees once the user confirms.
---

# Git Worktree Design — Smart Splitting for Parallel Development

Analyzes the user's requirements, decides whether they are suited to being split into multiple feature branches developed in parallel with `git worktree`, proposes a plan, and carries it out.

---

## Workflow

### 1. Analyze the Current State

Run the following commands to understand the state of the repo:

```bash
# Confirm the current branch
git branch --show-current

# List existing worktrees
git worktree list

# Get remote information
git remote -v

# Check the working directory status
git status --short
```

If there are uncommitted changes, remind the user to deal with them first (commit or stash) before continuing.

---

### 2. Overall Design (Split Plan + Feature Specs)

Before creating any worktree, design all the features from a whole-project perspective. This step produces both the **split plan** and a **draft Spec** for each feature, so the user can review the overall plan in one pass.

#### 2a. Split the Requirements

Based on the user's requirements, analyze and split the work into multiple independent feature branches.

**Splitting principles:**

| Principle | Description |
|------|------|
| **Functional independence** | Each worktree owns one independent feature, reducing cross-branch conflicts |
| **Minimal dependencies** | Avoid dependencies between branches as much as possible, so each can be developed and tested independently |
| **Reasonable granularity** | Not too fine (adds management overhead) and not too coarse (loses the benefit of parallel development) |
| **Meaningful naming** | Branch names clearly describe the feature, in the format `feature/<feature-name>` |

#### 2b. Design Each Feature Spec

For each feature that comes out of the split, **automatically derive** the full Spec content from the user's original requirements and the current state of the project (do not hand over a blank template).

**Each Spec should include:**

| Section | Description |
|------|------|
| **Goal** | What this feature branch should achieve |
| **Implementation Scope** | A concrete task checklist, detailed enough that an AI can start working from it directly |
| **Acceptance Criteria** | Testable descriptions of behavior or UI state |
| **Technical Constraints** | Project conventions, dependencies that must not be introduced, interfaces that must stay compatible, etc. |
| **Cross-Branch Notes** | Dependencies on other features, suggested merge order, etc. |

> **Key point**: consider cross-branch dependencies during the overall design stage, for example whether a shared component produced by feature A affects feature B, and whether the merge order matters.

#### 2c. Present the Full Plan to the User

Present the **full plan** to the user as a table plus a spec summary for each feature:

```
📋 Worktree split plan (N branches total)

| # | Branch name | Worktree directory | Feature |
|---|----------|---------------|----------|
| 1 | feature/hero-redesign | ../project-hero | Hero section redesign |
| 2 | feature/pricing-page | ../project-pricing | Pricing page |
| 3 | feature/testimonials | ../project-testimonials | Customer testimonials section |

---

📝 Feature Spec summary:

### 1. feature/hero-redesign
- Goal: redesign the Hero section with an animated background and CTA
- Acceptance: above-the-fold load < 2s, CTA button is clickable and navigates
- Dependencies: none, can be developed independently

### 2. feature/pricing-page
- Goal: add a pricing page with a monthly/yearly toggle
- Acceptance: prices update correctly when toggling monthly/yearly, mobile layout renders properly
- Dependencies: none, can be developed independently

### 3. feature/testimonials
- Goal: add a customer testimonials carousel section
- Acceptance: carousel autoplays, manual switching has no bugs
- Dependencies: none, can be developed independently

---

Suggested merge order: 1 → 2 → 3 (no hard dependencies, any order works)

Proceed? (Y/n)
```

Use the `notify_user` tool to show the user the full plan (split + Spec summary) and wait for confirmation.

---

### 3. Create the Worktrees

After the user confirms, run in order:

```bash
# Create each worktree (new branch)
git worktree add -b <branch_name> <worktree_path>
```

#### Worktree Directory Naming Rules

- Put the directories at the **same level** as the current repo (`../`)
- Format: `../<project-name>-<feature-short-name>`
- Use the repo directory name as the `<project-name>` prefix to avoid confusion with other projects

---

### 4. Install Dependencies

Detect the package manager the project uses and install dependencies:

```bash
# Detect the lock file to determine the package manager
# pnpm-lock.yaml → pnpm install
# yarn.lock → yarn install
# package-lock.json → npm install
# bun.lockb → bun install
```

Run for each worktree:

```bash
cd <worktree_path> && <package_manager> install
```

> **Note**: each worktree has its own working directory and `node_modules` is not shared, so dependencies must be installed in each one separately.

---

### 5. Write the Feature Spec Files

Use the `write_to_file` tool to write the Spec content designed in step 2 to the root of each worktree at `<worktree_path>/git-worktree-spec.md`.

#### Spec File Format

```markdown
# Feature Spec: <feature name>

> This file was generated automatically by the Git Worktree Design Skill as a development guide for the AI Agent.

## Branch Information

| Item | Value |
|------|-----|
| Branch name | `feature/<name>` |
| Base branch | `<base_branch>` |
| Worktree path | `<absolute_path>` |
| Created at | `<timestamp>` |

## Goal

(Fill in from the design content of step 2)

## Implementation Scope

- [ ] Concrete task 1
- [ ] Concrete task 2
- [ ] Concrete task 3

## Acceptance Criteria

- When condition A holds, behavior X should occur
- When condition B holds, behavior Y should occur

## Technical Constraints

- No new npm dependencies may be introduced (fill in as applicable)
- Must stay compatible with the existing design system / API interfaces
## Cross-Branch Notes

Dependencies on other worktree branches, suggested merge order, etc.
```

---

### 6. Confirm the Result

After all worktrees have been created, run:

```bash
git worktree list
```

Show the result as a table:

```
✅ Worktrees created!

| Worktree directory | Branch | Status | Spec |
|---------------|------|------|------|
| /path/to/project-hero | feature/hero-redesign | ✅ Ready | ✅ Written |
| /path/to/project-pricing | feature/pricing-page | ✅ Ready | ✅ Written |
| /path/to/project-testimonials | feature/testimonials | ✅ Ready | ✅ Written |

💡 Tips:
- Switch your working directory to the corresponding worktree to start developing
- All worktrees share the same .git, so commit history is shared between them
```

---

## Edge Cases

- **Branch already exists**: when an existing branch is detected, use the command without `-b` (`git worktree add <path> <existing-branch>`) and prompt the user to confirm
- **Directory already exists**: report the conflict and suggest an alternative directory name
- **Uncommitted changes**: remind the user to commit or stash first
- **Remote branch sync**: recommend running `git fetch` first to get the latest remote state
- **Worktree cleanup**: remind the user to clean up with `git worktree remove` and `git branch -d` once development is finished

---

## Common Maintenance Commands

```bash
# List all worktrees
git worktree list

# Remove a worktree (keeps the branch)
git worktree remove <path>

# Force removal (when there are uncommitted changes)
git worktree remove --force <path>

# Prune stale worktree references
git worktree prune

# Delete a branch (after merging)
git branch -d <branch_name>
```
