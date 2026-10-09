---
description: Check whether git-worktree-spec.md exists in the current worktree, read it, and carry out the development tasks according to the spec
---

# Execute the Worktree Feature Spec

## Prerequisites

1. Check whether `git-worktree-spec.md` exists in the root of the current working directory
   - If it **does not exist**: tell the user this worktree has no spec file, and ask whether they want to describe the requirements manually or abort
   - If it **exists**: continue to the next step

## Read the Spec

2. Read the full contents of `git-worktree-spec.md`

3. Parse the following sections of the spec and confirm you understand the task:
   - **Goal**: what this feature should achieve
   - **Implementation Scope**: the concrete checklist tasks
   - **Acceptance Criteria**: the conditions that must pass once the work is done
   - **Technical Constraints**: limits and conventions to follow during development
   - **Cross-Branch Notes**: anything to watch for regarding dependencies on other branches

## Implement

4. Work through the "Implementation Scope" checklist in the spec **item by item**:
   - Each time a task is finished, update `git-worktree-spec.md` and tick off the completed checklist item `[x]`
   - If a task description is ambiguous, ask the user instead of guessing
   - Follow every restriction listed under "Technical Constraints"

## Acceptance

6. Once implementation is complete, check the "Acceptance Criteria" one by one:
   - Run tests wherever tests can be run
   - Start the dev server and verify wherever that is possible
   - Report the acceptance results back to the user