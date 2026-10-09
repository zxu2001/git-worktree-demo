# PR Description Template

This is the standard template for a PR Description. Fill it in following this structure when generating content.

---

## 🎯 Why This Change

<!-- Briefly describe the background and motivation -->


## ⚠️ What Changed

<!-- 
Group by feature or requirement. For each group list: the direction of the change and the specific details
Rules:
- No Markdown link syntax of any kind: [text](...)
- No URIs / schemes of any kind, e.g. file://, cci:
- No file paths of any kind (including relative paths); always use a plain functional description instead
-->

### [Feature Name / Requirement]
- **Direction**: briefly state the purpose of the change (e.g. improve performance, fix a logic error, adjust styling)
- **Details**:
  - Specific change 1 (plain functional description)
  - Specific change 2 (plain functional description)

### [Another Feature Name]
- **Direction**: ...
- **Details**:
  - ...


## 🧪 Test Steps

<!-- 
  Rules:
  - At least one corresponding test case must be produced for every module / component under "What Changed"
  - Make sure every change is covered; nothing may be left out
  
  Each test case must include:
  1. A clear test scenario name (noting the corresponding module / component)
  2. Steps to perform (step by step)
  3. Expected result
  
  For front-end projects, include screenshots as illustration
-->

### Test Case 1: [Test scenario for module A]

1. Step one
2. Step two
3. **Expected result**: describe the expected behavior or screen

### Test Case 2: [Test scenario for module B]

1. Step one
2. Step two
3. **Expected result**: describe the expected behavior or screen

### Test Case N: [And so on, until every changed module has a corresponding test]

