# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a NestJS learning project implementing a simple memo management REST API. The project demonstrates fundamental NestJS concepts including CRUD operations, dependency injection, and API design patterns.

## Development Commands

### Building and Running
```bash
# Development with hot reload
npm run start:dev

# Production build
npm run build

# Start production server
npm run start:prod

# Debug mode with watch
npm run start:debug
```

### Testing
```bash
# Run unit tests
npm test

# Watch mode for unit tests
npm run test:watch

# Test coverage
npm run test:cov

# E2E tests
npm run test:e2e

# Debug tests
npm run test:debug
```

### Code Quality
```bash
# Lint and fix
npm run lint

# Format code
npm run format
```

## Architecture Overview

### Current Structure
- **Standard NestJS starter**: Basic Module/Controller/Service pattern
- **Entry point**: `src/main.ts` - bootstraps the application on port 3000
- **Root module**: `src/app.module.ts` - imports controllers and services
- **Basic controller**: `src/app.controller.ts` - single GET endpoint returning "Hello World!"

### Planned Architecture (per docs/api-requirements.md)
The project is planned to implement a memo management API with:

- **Memo Module**: Will contain MemoController, MemoService, and MemoEntity
- **Database**: SQLite with TypeORM (not yet implemented)
- **DTOs**: Request/response validation with class-validator
- **CRUD endpoints**: POST/GET/PUT/DELETE for memo operations

### Key NestJS Patterns to Follow
1. **Module organization**: Each feature should have its own module
2. **Dependency injection**: Use constructor injection for services
3. **DTOs for validation**: Separate DTOs for create/update operations
4. **Entity definitions**: TypeORM entities with proper decorators
5. **Exception filters**: Proper error handling with HTTP status codes

## API Specification

Detailed API requirements are documented in `docs/api-requirements.md`, including:
- Full CRUD endpoints for memo management
- Request/response schemas
- Validation rules (title: 1-255 chars, content: 1-10000 chars)
- Error response formats

## Testing Strategy

- Unit tests use Jest with the standard NestJS testing utilities
- E2E tests are configured in `test/` directory
- Test files follow `*.spec.ts` naming convention
- Coverage reports generated in `coverage/` directory