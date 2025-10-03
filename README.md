# Tool Rental App

A comprehensive tool rental management system.

## Project Structure

```
tool_rental/
├── .claude/           # Claude Code specifications and development artifacts
│   └── specs/         # Feature specifications following EARS format
├── docs/              # Technical documentation
├── specs/             # Published specifications (Quarto rendered)
├── _quarto.yml        # Quarto configuration
├── index.qmd          # Main documentation entry point
└── README.md          # This file
```

## Development Setup

This project uses Quarto for documentation generation and follows a spec-driven development approach.

### Documentation

To render the documentation:

```bash
quarto render
```

To serve the documentation locally:

```bash
quarto preview
```

## Specifications

Feature specifications are managed in the `.claude/specs/` directory following the EARS (Easy Approach to Requirements Syntax) format.

## Getting Started

Ready for PRD input and feature specification development.