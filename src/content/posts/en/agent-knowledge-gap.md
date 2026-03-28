---
title: 'The Agent Knowledge Internalization Gap: The Distance from Skills to Team Know-How'
date: 2026-03-06 10:49:00
category: '🤖 人工智慧'
tags:
  - 'AI'
  - 'agent'
  - '知識管理'
  - 'Scrum'
cover: '/images/agent-knowledge-gap.webp'
description: "Humans absorb team knowledge through Scrum naturally, but AI agents can't — exploring the knowledge internalization gap."
---

Our company has been experimenting with various AI tools, and after using them for a while, I noticed a problem that's hard to get around: humans can follow a Scrum process through an entire sprint, but agents can't.

## Starting from a Scrum Scenario

Our company has been experimenting with various AI tools, and after using them for a while, I noticed a problem that's hard to get around: **humans can follow a Scrum process through an entire sprint, but agents can't.**

It's not that agents can't help you write code — that's long been a non-issue. The thing is, every stage of Scrum generates knowledge: planning meetings produce decisions like "we're designing this feature this way because..."; standups surface reminders like "watch out for timezones here"; PR review comments establish conventions like "we use DTOs instead of returning entities directly"; retros capture lessons like "we got burned doing it that way last time." Humans naturally absorb all of this just by participating in the process. Agents? They can only see what's been explicitly written down.

This got me thinking: what problems do existing agent knowledge management mechanisms actually solve, and what are they missing?

## We've Invented Many Ways to Manage Agents

As the AI coding agent ecosystem has matured, a whole set of "how to make agents smarter" management mechanisms has emerged:

- **AGENTS.md / CLAUDE.md** — Global behavior rules, like an employee handbook for agents
- **Agent Skills** — Reusable task packages that load domain knowledge on demand (agentskills.io open standard)
- **Long-term Memory** — Letting agents remember preferences, decisions, and lessons across sessions
- **MCP Server** — Standardized tool interfaces that let agents access external services

Each mechanism has its role, and together they look quite comprehensive. But after actually using them, something always feels missing.

## The Gap: How Does Team Know-How Get into Agents?

Team know-how broadly falls into two categories:

1. **Domain Business Logic** — Return policies, billing rules, compliance requirements, product decision context
2. **Coding Conventions** — DTO formats, date/timezone handling, monetary precision, error codes, API contracts

The typical lifecycle of this knowledge looks like: planning discussions → Confluence/Notion docs → Slack/Teams conversations → PR review comments → eventually settling in the minds of a few people.

The problem is: all existing agent knowledge management mechanisms (skills, memory, agents.md) require humans to actively write them, actively place them in the right location, and actively maintain updates. This faces the exact same challenge as human documentation management — fragmented Confluence pages, outdated wikis, READMEs nobody updates.

> The core contradiction: we can barely manage our own documentation, and now we have to manage an additional set of agent documentation. Without automated bridging, this approach won't scale.

Our team tried Jira's Rovo — it has agents that can help write acceptance criteria and integrate with Confluence docs, which sounds close to ideal. In practice, it still fell short. When it came time to implement, you had to specifically connect Jira via MCP to bring item context into the coding agent, and it wasn't fast either. After trying it for a while, we gradually stopped using it.

This isn't because the tool is poorly made — it's that **the friction across the entire workflow is still too high**. Every step requires active human intervention to move knowledge from one place to another.

## Positioning and Limitations of Current Solutions

### 1. Agent Skills (agentskills.io)

An open standard already supported by Cursor, Claude Code, Codex, Roo Code, and others. The core concept is "progressive disclosure" — agents only load relevant skills when needed, avoiding context pollution. Great for packaging reusable operational workflows, but the content still requires manual authoring and maintenance.

### 2. AGENTS.md

GitHub Blog analyzed 2,500+ repos with agents.md files and concluded: short, actionable, verifiable rules work best. The best practice is to treat agents.md as a router — pointing to skills and docs while only containing hard rules itself. But fundamentally it's still a static file that doesn't automatically learn from team behavior.

### 3. Long-term Memory

Good for recording personal preferences, historical decisions, and lessons learned. But current memory mechanisms are mostly "each agent remembers its own stuff," lacking a team-shared layer. A lesson one agent learns, another agent doesn't know about.

### 4. Agent Memory Infrastructure (mem0, Zep)

mem0 (open source) and Zep (commercial) are leading agent memory infrastructure solutions in recent years. mem0 automatically extracts structured facts from conversations and stores them in a vector database; Zep adds knowledge graph and temporal decay mechanisms for relational reasoning over memories. Both solve the problem of "persisting memory across sessions," but memory granularity stays at the user/agent level, lacking a team-shared layer.

## Is Anyone Working on This Problem?

Yes, but everything is still early-stage. The general direction involves building knowledge graphs from Slack, Jira, Confluence, and GitHub data so coding agents can query them directly while working (e.g., Unblocked); or having agents continuously learn team development patterns from the codebase, tickets, and PR feedback (AWS's Kiro).

This space is evolving rapidly, and tools might undergo major turnover every few months. But one thing is certain: **this problem is being taken seriously**, which means it's genuinely painful enough to warrant attention.

## The Ideal Future: Automatically Distilling Conventions from Behavior

The spectrum: fully manual → semi-automated (Confluence sync) → knowledge graph retrieval (Unblocked) → automatic distillation (not yet mature)

Core challenges:

- **Signal extraction**: Distinguishing "this is a consensus" from "this was a one-off discussion" amid massive volumes of conversation
- **Conflict detection**: Handling cases where new conventions contradict existing ones
- **Version evolution**: Team consensus changes over time; agents need to know "this rule is outdated"
- **Trust boundaries**: Automatically distilled conventions need human review before taking effect

## Conclusion

The most fundamental bottleneck — how to automatically channel the consensus that naturally emerges during planning and implementation into the agent's knowledge base — still has no mature solution.

The most pragmatic approach for now is: humans write the first version → tools sync it to an agent-readable format → CI enforces adoption → agents help with maintenance.

There's still a long road ahead. But approaching the question of "what knowledge should flow into agents" from the Scrum process perspective gives us better direction than "just stuff everything into AGENTS.md."

---

**References:**

- [Vercel — Agent Skills Explained](https://vercel.com/blog/agent-skills-explained-an-faq)
- [Builder.io — Agent Skills vs Rules vs Commands](https://www.builder.io/blog/agent-skills-rules-commands)
- [GitHub Blog — How to write a great agents.md](https://github.blog/ai-and-ml/github-copilot/how-to-write-a-great-agents-md-lessons-from-over-2500-repositories/)
- [Unblocked — What your coding agent can't see](https://blog.getunblocked.com/blog/what-your-coding-agent-cant-see)
- [Kiro — Introducing Kiro Autonomous Agent](https://aws.amazon.com/blogs/news/introducing-kiro-autonomous-agent/)
- [agentskills.io — Agent Skills Open Standard](https://agentskills.io)
