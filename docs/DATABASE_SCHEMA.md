# 🗄️ EduLink UG - Database Schema

## Overview

This document describes the MongoDB database schema for the EduLink UG peer learning platform.

## Collections

### 1. Users Collection

```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  role: String (enum: ['student', 'teacher', 'admin'], default: 'student'),
  school: String (required),
  district: String (required),
  subjects: [String],
  educationLevel: String (enum: ['O-Level', 'A-Level']),
  bio: String,
  profilePicture: String,
  strikes: Number (default: 0),
  isBanned: Boolean (default: false),
  reputation: Number (default: 0),
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**

- `email`: unique
- `role`: non-unique
- `subjects`: non-unique
- `district`: non-unique

**Relationships:**

- One-to-Many with Questions (author)
- One-to-Many with Answers (author)
- One-to-Many with Reports (reporter/reported)
- Many-to-Many with Sessions (participants)

---

### 2. Questions Collection

```javascript
{
  _id: ObjectId,
  title: String (required),
  body: String (required),
  subject: String (required),
  educationLevel: String (enum: ['O-Level', 'A-Level'], required),
  topic: String,
  author: ObjectId (ref: 'User', required),
  isAnonymous: Boolean (default: false),
  attachments: [String],
  upvotes: [ObjectId] (ref: 'User'),
  downvotes: [ObjectId] (ref: 'User'),
  tags: [String],
  status: String (enum: ['open', 'answered', 'closed'], default: 'open'),
  views: Number (default: 0),
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**

- `author`: non-unique
- `subject`: non-unique
- `educationLevel`: non-unique
- `status`: non-unique
- `createdAt`: descending

**Relationships:**

- Many-to-One with Users (author)
- One-to-Many with Answers

---

### 3. Answers Collection

```javascript
{
  _id: ObjectId,
  question: ObjectId (ref: 'Question', required),
  author: ObjectId (ref: 'User', required),
  body: String (required),
  attachments: [String],
  isVerified: Boolean (default: false),
  verifiedBy: ObjectId (ref: 'User'),
  upvotes: [ObjectId] (ref: 'User'),
  downvotes: [ObjectId] (ref: 'User'),
  isAccepted: Boolean (default: false),
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**

- `question`: non-unique
- `author`: non-unique
- `isVerified`: non-unique
- `createdAt`: descending

**Relationships:**

- Many-to-One with Questions
- Many-to-One with Users (author)
- Many-to-One with Users (verifier)

---

### 4. Sessions Collection

```javascript
{
  _id: ObjectId,
  title: String (required),
  description: String,
  subject: String (required),
  educationLevel: String (enum: ['O-Level', 'A-Level'], required),
  host: ObjectId (ref: 'User', required),
  participants: [ObjectId] (ref: 'User'),
  scheduledAt: Date (required),
  duration: Number (minutes, default: 60),
  status: String (enum: ['scheduled', 'live', 'completed', 'cancelled'], default: 'scheduled'),
  maxParticipants: Number (default: 50),
  meetingLink: String,
  recordingUrl: String,
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**

- `host`: non-unique
- `subject`: non-unique
- `status`: non-unique
- `scheduledAt`: ascending

**Relationships:**

- Many-to-One with Users (host)
- Many-to-Many with Users (participants)

---

### 5. Reports Collection

```javascript
{
  _id: ObjectId,
  reporter: ObjectId (ref: 'User', required),
  reportedUser: ObjectId (ref: 'User'),
  reportedContent: {
    contentType: String (enum: ['question', 'answer', 'user'], required),
    contentId: ObjectId (required)
  },
  reason: String (required),
  description: String,
  status: String (enum: ['pending', 'reviewed', 'resolved', 'dismissed'], default: 'pending'),
  reviewedBy: ObjectId (ref: 'User'),
  action: String,
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**

- `reporter`: non-unique
- `reportedUser`: non-unique
- `status`: non-unique
- `createdAt`: descending

**Relationships:**

- Many-to-One with Users (reporter)
- Many-to-One with Users (reported user)
- Many-to-One with Users (reviewer)

---

### 6. Chats Collection

```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: 'User', required),
  message: String (required),
  response: String (required),
  subject: String,
  sessionId: String,
  createdAt: Date
}
```

**Indexes:**

- `user`: non-unique
- `sessionId`: non-unique
- `createdAt`: descending

**Relationships:**

- Many-to-One with Users

---

## Entity Relationship Diagram

```
┌─────────────┐         ┌──────────────┐         ┌─────────────┐
│    Users    │────────>│  Questions   │<────────│   Answers   │
│             │ author  │              │ question│             │
│  - _id      │         │  - _id       │         │  - _id      │
│  - name     │         │  - title     │         │  - body     │
│  - email    │         │  - body      │         │  - author   │
│  - role     │         │  - author    │         │  - verified │
│  - school   │         │  - subject   │         │             │
│  - strikes  │         │  - upvotes   │         │             │
└─────────────┘         └──────────────┘         └─────────────┘
      │                                                   │
      │                                                   │
      │ host/participants                         verifiedBy
      │                                                   │
      ▼                                                   ▼
┌─────────────┐         ┌──────────────┐         ┌─────────────┐
│  Sessions   │         │   Reports    │         │    Chats    │
│             │         │              │         │             │
│  - _id      │         │  - _id       │         │  - _id      │
│  - title    │         │  - reporter  │         │  - user     │
│  - host     │         │  - reported  │         │  - message  │
│  - subject  │         │  - reason    │         │  - response │
└─────────────┘         └──────────────┘         └─────────────┘
```

## Data Integrity Rules

### User Management

- Users can be banned after 3 strikes
- Teachers can verify answers
- Admins can moderate all content

### Question & Answer Flow

1. Student posts a question
2. Other students/teachers can answer
3. Teachers can verify answers
4. Question author can accept an answer
5. Community can upvote/downvote

### Reporting System

1. Any user can report inappropriate content
2. Reports are reviewed by teachers/admins
3. Actions may result in strikes
4. 3 strikes = temporary ban

### Session Management

- Only verified teachers can host sessions
- Sessions have participant limits
- Sessions can be recorded (with permission)

## Performance Considerations

### Indexes Strategy

- Compound indexes on frequently queried fields
- Text indexes for search functionality
- TTL indexes for temporary data

### Caching

- Cache popular questions
- Cache user profiles
- Cache session schedules

### Sharding Strategy

- Shard by district for geographical distribution
- Shard by subject for load balancing

## Security Measures

1. **Password Security**: bcrypt with 10 salt rounds
2. **Authentication**: JWT tokens with 7-day expiration
3. **Authorization**: Role-based access control
4. **Data Sanitization**: Mongoose validation & sanitization
5. **Rate Limiting**: Prevent abuse of endpoints

## Backup Strategy

- Daily automated backups to MongoDB Atlas
- Point-in-time recovery enabled
- Backup retention: 30 days
- Disaster recovery plan documented
