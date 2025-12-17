# Job Match Platform – Microservices Architecture

A production-inspired **job matching and real-time chat platform** built with **NestJS microservices**, **Redis**, and **WebSockets**.
This project is designed specifically to demonstrate **system design, backend architecture, and scalability concepts** in technical interviews.

---

## 🚀 High-Level Overview

The platform connects **Employers** and **Candidates**:

- Employers post jobs
- Candidates create skill-based profiles
- A matching service scores candidates against jobs
- Matched users can communicate via real-time chat

The system is implemented using **event-driven microservices** with **Redis** as the messaging backbone.

---

## 🧩 Architecture

### Services

| Service                | Responsibility                        |
| ---------------------- | ------------------------------------- |
| API Gateway            | Entry point, routing, auth validation |
| Auth Service           | User authentication, JWT issuance     |
| User Service           | Employer & candidate profiles         |
| Job / Matching Service | Job postings & matching algorithm     |
| Chat Service           | Real-time messaging & presence        |
| Redis                  | Messaging, pub/sub, caching           |

### Architecture Diagram (Conceptual)

Client → API Gateway → Microservices (via Redis)

Chat Service additionally exposes WebSocket endpoints and uses Redis Pub/Sub for horizontal scaling.

---

## 🔐 Authentication Flow

1. Client sends credentials to API Gateway
2. Gateway forwards request to Auth Service via Redis
3. Auth Service validates credentials and issues JWT
4. Gateway validates JWT for protected routes
5. Internal services trust the gateway (zero-trust boundary)

**Why this design?**

- Centralized security
- Services remain stateless
- Easy horizontal scaling

---

## 👤 User Service

### Features

- Candidate profiles (skills, experience)
- Employer profiles (company info)
- Emits profile update events

### Events

- `user.profile.updated`

Profile updates automatically trigger match recalculation in the Job Service.

---

## 💼 Job & Matching Service

### Matching Algorithm

```
skillScore = matchedSkills / requiredSkills
experienceScore = min(candidateExp / jobExp, 1)
finalScore = (skillScore * 0.7) + (experienceScore * 0.3)
```

### Why this works

- Easy to understand
- Easy to extend
- Demonstrates business logic

### Event-Driven Design

- Listens to `user.profile.updated`
- Recalculates matches asynchronously
- No direct coupling to User Service

---

## 💬 Chat Service

### Features

- WebSocket-based real-time chat
- Redis Pub/Sub for message fan-out
- Online/offline presence tracking

### Scaling Strategy

- Multiple Chat Service instances
- Redis ensures messages reach all connected clients

---

## 🔴 Why Redis?

Redis is used for:

- Microservice communication
- Event-driven architecture
- WebSocket scaling (Pub/Sub)
- Presence tracking

### Why not Kafka?

Kafka is better suited for:

- High-throughput analytics
- Event replay
- Long-term event storage

For real-time, low-latency systems, Redis provides better performance with lower operational complexity.

---

## 🐳 Local Development

```bash
docker-compose up -d
npm run start
```

Services can be started independently.

---

## 📌 Key Engineering Principles Demonstrated

- Microservice isolation
- Event-driven architecture
- Real-time communication
- Stateless services
- Horizontal scalability
- Clean separation of concerns

---

## 📈 Possible Extensions

- Persist data using Prisma + MySQL/Postgres
- Add rate limiting in gateway
- Introduce Kafka for analytics
- Implement CI/CD pipeline

---

## 👨‍💻 Author Notes

This project was built to simulate real production concerns while remaining focused on **clarity, correctness**.
