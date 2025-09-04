# Document Update Guide

Learn how to effectively update and maintain existing documents in the SC system. This guide covers best practices for keeping documentation current, accurate, and useful.

## 🎯 Overview

Documentation is a living resource that requires regular updates to remain valuable. This guide helps you understand when and how to update documents, ensuring they stay relevant and accurate.

## 📋 Prerequisites

Before updating documents, ensure you have:

- **Understanding of the document** - Read the existing content thoroughly
- **Clear update purpose** - Know what needs to be changed and why
- **Proper permissions** - Access to edit the document
- **Version control knowledge** - Basic Git understanding

## 🔍 When to Update Documents

### Regular Maintenance Updates

- **Outdated information** - Facts, dates, or procedures that are no longer accurate
- **Broken links** - Internal or external links that no longer work
- **Version changes** - Software versions, API versions, or tool versions
- **Process changes** - Workflows or procedures that have evolved

### Content Improvement Updates

- **Clarity issues** - Unclear explanations or confusing instructions
- **Missing information** - Gaps in coverage or incomplete sections
- **User feedback** - Issues reported by document users
- **New features** - Documentation for new functionality

### Structural Updates

- **Organization improvements** - Better logical flow or structure
- **Formatting consistency** - Standardizing markdown formatting
- **Navigation updates** - Improving internal linking
- **Template alignment** - Following updated document templates

## 🚀 Update Process

### Step 1: Assess the Document

Before making changes, evaluate the current state:

```bash
# Check document history
git log --oneline docs/document-name.md

# See recent changes
git diff HEAD~5 docs/document-name.md

# Check for broken links
markdown-link-check docs/document-name.md
```

**Questions to ask:**
- What is the current purpose of this document?
- Who is the target audience?
- What information is outdated or incorrect?
- What improvements would make it more useful?

### Step 2: Plan Your Updates

Create a clear plan for your changes:

```markdown
## Update Plan for [Document Name]

### Changes Needed:
- [ ] Update outdated version numbers
- [ ] Fix broken links
- [ ] Add missing examples
- [ ] Improve clarity in section X
- [ ] Update screenshots

### Priority:
- High: Critical information updates
- Medium: Improvements and clarifications
- Low: Formatting and style updates

### Impact Assessment:
- Will this affect other documents?
- Do I need to update related links?
- Should I notify specific team members?
```

### Step 3: Make the Updates

#### Using Version Control (Recommended)

```bash
# Create a new branch for your updates
git checkout -b docs/update-document-name

# Make your changes to the document
# ... edit the file ...

# Review your changes
git diff

# Stage and commit your changes
git add docs/document-name.md
git commit -m "docs: update [document name] - [brief description of changes]"

# Push your branch
git push origin docs/update-document-name
```

#### Using Web Interface

1. Navigate to the document in the web interface
2. Click **"Edit"** or **"Update"**
3. Make your changes in the editor
4. Preview your changes
5. Submit for review or publish directly

### Step 4: Review and Test

#### Self-Review Checklist

- [ ] **Content accuracy** - All information is current and correct
- [ ] **Grammar and spelling** - No typos or grammatical errors
- [ ] **Formatting consistency** - Proper markdown formatting
- [ ] **Link functionality** - All links work correctly
- [ ] **Logical flow** - Content flows logically
- [ ] **Completeness** - No incomplete sections or thoughts

#### Testing Your Updates

```bash
# Validate markdown syntax
markdownlint docs/document-name.md

# Check for broken links
markdown-link-check docs/document-name.md

# Preview the document
mkdocs serve

# Test navigation
# Ensure the document appears correctly in the site navigation
```

### Step 5: Get Feedback

#### Peer Review Process

1. **Request review** - Ask colleagues to review your changes
2. **Provide context** - Explain what you changed and why
3. **Address feedback** - Make requested improvements
4. **Final approval** - Get sign-off from reviewers

#### Review Request Template

```markdown
## Document Update Review Request

**Document**: [Document Name]
**Branch**: [Branch Name]
**Changes**: [Brief description of changes]

### What Changed:
- [List of specific changes]

### Why These Changes:
- [Explanation of why updates were needed]

### Impact:
- [How these changes affect users/readers]

### Testing Done:
- [ ] Content review
- [ ] Link validation
- [ ] Formatting check
- [ ] Navigation test

Please review and provide feedback by [date].
```

## 📝 Types of Updates

### Minor Updates

**Examples:**
- Fixing typos
- Updating version numbers
- Correcting broken links
- Minor formatting improvements

**Process:**
```bash
# Quick fix workflow
git checkout -b docs/minor-fix-document-name
# Make changes
git add docs/document-name.md
git commit -m "docs: fix typo in [document name]"
git push origin docs/minor-fix-document-name
# Create pull request
```

### Major Updates

**Examples:**
- Restructuring entire document
- Adding new sections
- Significant content rewrites
- Template changes

**Process:**
```bash
# Major update workflow
git checkout -b docs/major-update-document-name
# Make comprehensive changes
git add docs/document-name.md
git commit -m "docs: major update to [document name] - [description]"
git push origin docs/major-update-document-name
# Create detailed pull request with explanation
```

### Collaborative Updates

**Examples:**
- Multiple authors contributing
- Team-wide documentation changes
- Cross-document updates

**Process:**
1. **Coordinate with team** - Discuss changes with affected team members
2. **Create shared branch** - Use a shared branch for collaboration
3. **Regular sync** - Keep everyone updated on progress
4. **Group review** - Get feedback from all stakeholders

## 🔄 Update Strategies

### Incremental Updates

**Best for:** Documents that need frequent small updates

**Approach:**
- Make small, focused changes
- Update regularly (weekly/monthly)
- Keep changes atomic and reviewable
- Use automated tools for routine checks

### Batch Updates

**Best for:** Documents that need comprehensive overhauls

**Approach:**
- Plan all changes upfront
- Make comprehensive updates at once
- Thorough review process
- Coordinate with related documents

### Continuous Updates

**Best for:** Living documents that evolve with the project

**Approach:**
- Update as you work
- Integrate documentation into development workflow
- Use automated triggers for updates
- Regular review cycles

## 🛠️ Tools and Automation

### Automated Checks

```bash
# Set up pre-commit hooks
cat > .pre-commit-config.yaml << EOF
repos:
  - repo: https://github.com/igorshubovych/markdownlint-cli
    rev: v0.33.0
    hooks:
      - id: markdownlint
  - repo: https://github.com/tcort/markdown-link-check
    rev: v3.10.3
    hooks:
      - id: markdown-link-check
EOF

# Install pre-commit
pip install pre-commit
pre-commit install
```

### Validation Scripts

```bash
#!/bin/bash
# validate-docs.sh

echo "Validating documentation..."

# Check markdown syntax
markdownlint docs/*.md

# Check for broken links
markdown-link-check docs/*.md

# Check for TODO comments
grep -r "TODO" docs/

# Check for outdated version references
grep -r "version.*[0-9]\.[0-9]" docs/

echo "Validation complete!"
```

### Monitoring Tools

```bash
# Check document age
find docs/ -name "*.md" -exec stat -f "%m %N" {} \; | sort -n

# Find documents not updated recently
find docs/ -name "*.md" -mtime +30 -exec echo "{} needs review" \;

# Check for orphaned documents
# Documents not linked from main navigation
```

## 📊 Quality Assurance

### Content Quality Checklist

- [ ] **Accuracy** - All information is factually correct
- [ ] **Completeness** - All necessary information is included
- [ ] **Clarity** - Content is easy to understand
- [ ] **Consistency** - Terminology and formatting are consistent
- [ ] **Currency** - Information is up-to-date
- [ ] **Relevance** - Content is useful to the target audience

### Technical Quality Checklist

- [ ] **Markdown syntax** - Proper markdown formatting
- [ ] **Link functionality** - All links work correctly
- [ ] **Image accessibility** - Alt text for all images
- [ ] **Code formatting** - Proper syntax highlighting
- [ ] **Navigation** - Document appears in correct location
- [ ] **Search optimization** - Proper titles and keywords

### Process Quality Checklist

- [ ] **Version control** - Changes are properly tracked
- [ ] **Review process** - Changes have been reviewed
- [ ] **Testing** - Updates have been tested
- [ ] **Communication** - Stakeholders are informed
- [ ] **Documentation** - Update process is documented

## 🚨 Common Update Mistakes

### Content Mistakes

- **❌ Updating without understanding** - Make sure you understand the content before changing it
- **❌ Breaking existing links** - Ensure internal links still work after restructuring
- **❌ Inconsistent terminology** - Use consistent language throughout
- **❌ Removing useful information** - Don't remove content that others might need

### Process Mistakes

- **❌ Skipping review** - Always get feedback on significant changes
- **❌ Not testing changes** - Test your updates before publishing
- **❌ Poor commit messages** - Write clear, descriptive commit messages
- **❌ Ignoring feedback** - Address reviewer comments appropriately

### Technical Mistakes

- **❌ Breaking markdown syntax** - Validate your markdown changes
- **❌ Creating broken links** - Test all links after updates
- **❌ Inconsistent formatting** - Follow established formatting standards
- **❌ Not updating related documents** - Update cross-references and related content

## 📈 Measuring Update Success

### Metrics to Track

- **Update frequency** - How often documents are updated
- **Review time** - How long updates take to review
- **User feedback** - Feedback from document users
- **Search relevance** - How well documents appear in search results
- **Link health** - Percentage of working links

### Feedback Collection

```markdown
## Document Feedback Form

**Document**: [Document Name]
**Date**: [Date]

### Was this document helpful?
- [ ] Very helpful
- [ ] Somewhat helpful
- [ ] Not helpful

### What could be improved?
[Open text field]

### Is there missing information?
[Open text field]

### How often do you use this document?
- [ ] Daily
- [ ] Weekly
- [ ] Monthly
- [ ] Rarely
```

## 🔄 Maintenance Schedule

### Daily Tasks

- [ ] Check for broken links in recently updated documents
- [ ] Review any automated alerts or notifications
- [ ] Address urgent documentation issues

### Weekly Tasks

- [ ] Review documents updated in the past week
- [ ] Check for outdated version references
- [ ] Update any time-sensitive information

### Monthly Tasks

- [ ] Comprehensive link health check
- [ ] Review documents not updated recently
- [ ] Update process documentation if needed
- [ ] Gather user feedback

### Quarterly Tasks

- [ ] Major documentation audit
- [ ] Template and style guide updates
- [ ] Archive outdated documents
- [ ] Plan major documentation improvements

## 📚 Next Steps

Now that you know how to update documents:

1. **[Document Creation Guide](document-creation.md)** - Learn how to create new documents
2. **[Advanced Formatting](advanced-formatting.md)** - Master advanced markdown features
3. **[Collaboration Workflows](collaboration.md)** - Work effectively with your team
4. **[Documentation Standards](standards.md)** - Follow team documentation standards

## 🆘 Need Help?

- **Documentation**: Search this site for answers
- **Team Chat**: Ask questions in team channels
- **Code Reviews**: Get feedback on your updates
- **Templates**: Use established templates for consistency

---

*This guide covers the essentials of document updates. For advanced topics, see the [Advanced Documentation Guide](advanced-documentation.md).* 