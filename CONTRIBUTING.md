# Contributing to EduLink UG 🎓

First off, thank you for considering contributing to EduLink UG! It's people like you that make EduLink UG such a great tool for Ugandan students.

## Code of Conduct

By participating in this project, you are expected to uphold our Code of Conduct:

### Our Standards

- **Be Respectful**: Treat everyone with respect and kindness
- **Be Constructive**: Provide helpful feedback and criticism
- **Be Collaborative**: Work together towards common goals
- **Be Patient**: Remember that everyone is learning
- **Be Inclusive**: Welcome newcomers and diverse perspectives

### Unacceptable Behavior

- Harassment, discrimination, or offensive comments
- Personal attacks or trolling
- Publishing others' private information
- Any conduct that could reasonably be considered inappropriate

## How Can I Contribute?

### 🐛 Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates.

**How to Submit a Bug Report**:

1. **Use a clear and descriptive title**
2. **Describe the exact steps to reproduce the problem**
3. **Provide specific examples** (screenshots, code snippets)
4. **Describe the behavior you observed** and what you expected
5. **Include your environment details**:
   - OS (Ubuntu, Windows, macOS)
   - Browser (Chrome, Firefox, Safari)
   - Node.js version
   - MongoDB version

**Bug Report Template**:

```markdown
**Bug Description**
A clear description of what the bug is.

**Steps to Reproduce**

1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

**Expected Behavior**
What you expected to happen.

**Actual Behavior**
What actually happened.

**Screenshots**
If applicable, add screenshots.

**Environment**

- OS: [e.g., Ubuntu 22.04]
- Browser: [e.g., Chrome 120]
- Node.js: [e.g., v22.0.0]
```

### 💡 Suggesting Enhancements

Enhancement suggestions are welcome! Please provide:

1. **Clear use case**: Why is this enhancement needed?
2. **Detailed description**: How should it work?
3. **Mockups or examples**: Visual aids if applicable
4. **Alternatives considered**: Other solutions you thought about

### 🔧 Pull Requests

1. **Fork the repository** and create your branch from `main`
2. **Make your changes** following our coding standards
3. **Test your changes** thoroughly
4. **Update documentation** if needed
5. **Write clear commit messages**
6. **Submit a pull request**

## Development Setup

### Prerequisites

- Node.js v22+
- MongoDB v7+
- Git
- npm

### Setup Instructions

1. **Fork and clone**:

   ```bash
   git clone https://github.com/YOUR_USERNAME/mern-final-project-RockieRaheem.git
   cd mern-final-project-RockieRaheem
   ```

2. **Set up backend**:

   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your configuration
   npm run dev
   ```

3. **Set up frontend** (new terminal):

   ```bash
   cd frontend
   npm install
   cp .env.example .env
   # Edit .env with your configuration
   npm run dev
   ```

4. **Create a branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Coding Standards

### JavaScript/React Style Guide

We follow standard JavaScript and React best practices:

#### General

- Use **ES6+** syntax
- Use **const** and **let**, not **var**
- Use **arrow functions** for callbacks
- Use **async/await** instead of promises chains
- Keep functions **small and focused**
- Add **comments** for complex logic

#### React Components

```javascript
// ✅ Good: Functional component with hooks
import { useState, useEffect } from "react";

const QuestionCard = ({ question }) => {
  const [upvotes, setUpvotes] = useState(question.upvotes.length);

  useEffect(() => {
    // Effect logic
  }, []);

  return (
    <div className="question-card">
      <h3>{question.title}</h3>
      <p>{question.body}</p>
    </div>
  );
};

export default QuestionCard;
```

#### Backend API

```javascript
// ✅ Good: Async controller with error handling
export const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find()
      .populate("author", "name school")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: questions.length,
      data: questions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};
```

### File Naming

- **Components**: PascalCase (e.g., `QuestionCard.jsx`)
- **Utilities**: camelCase (e.g., `formatDate.js`)
- **Routes**: kebab-case (e.g., `auth-routes.js`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_ENDPOINTS.js`)

### Git Commit Messages

Follow the Conventional Commits specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types**:

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Build process or auxiliary tool changes

**Examples**:

```bash
feat(auth): add password reset functionality

- Add forgot password endpoint
- Implement email sending
- Create password reset form

Closes #123
```

```bash
fix(questions): resolve upvote counting issue

The upvote count was not updating correctly when
users removed their upvote.

Fixes #456
```

### Code Comments

```javascript
// ✅ Good: Explains WHY, not WHAT
// Use MongoDB aggregation for better performance with large datasets
const stats = await Question.aggregate([
  { $match: { subject: "Mathematics" } },
  { $group: { _id: "$educationLevel", count: { $sum: 1 } } },
]);

// ❌ Bad: States the obvious
// Get questions
const questions = await Question.find();
```

## Testing

### Running Tests

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test

# Test coverage
npm run test:coverage
```

### Writing Tests

- Write tests for **all new features**
- Maintain **80%+ code coverage**
- Test **edge cases** and **error conditions**
- Use **descriptive test names**

**Example**:

```javascript
describe("Question API", () => {
  it("should create question with valid authenticated user", async () => {
    // Arrange
    const questionData = {
      /* ... */
    };
    const token = "valid_jwt_token";

    // Act
    const response = await request(app)
      .post("/api/questions")
      .set("Authorization", `Bearer ${token}`)
      .send(questionData);

    // Assert
    expect(response.status).toBe(201);
    expect(response.body.data).toHaveProperty("title");
  });
});
```

## Documentation

- Update README.md if you change functionality
- Add JSDoc comments for functions
- Update API documentation for new endpoints
- Add user guide sections for new features

## Project Structure

When adding new files, follow the established structure:

```
backend/
├── controllers/    # Request handlers
├── models/         # Database schemas
├── routes/         # API routes
├── middleware/     # Custom middleware
├── utils/          # Helper functions
└── tests/          # Test files

frontend/
├── src/
│   ├── components/ # React components
│   ├── pages/      # Page components
│   ├── contexts/   # Context providers
│   ├── hooks/      # Custom hooks
│   ├── utils/      # Helper functions
│   └── api/        # API calls
└── tests/          # Test files
```

## Review Process

1. **Automated checks** run on every PR:

   - Linting (ESLint)
   - Tests (Jest, Vitest)
   - Build verification

2. **Code review** by maintainers:

   - Code quality
   - Test coverage
   - Documentation
   - Performance

3. **Approval and merge**:
   - At least one maintainer approval required
   - All CI checks must pass
   - No merge conflicts

## Recognition

Contributors will be:

- Listed in the project README
- Acknowledged in release notes
- Eligible for contributor badges
- Part of the EduLink UG community!

## Questions?

- **Email**: dev@edulink-ug.com
- **GitHub Discussions**: Start a discussion in the repo
- **Discord**: Join our developer community (link coming soon)

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing to quality education in Uganda!** 🇺🇬

_For God and My Country_
