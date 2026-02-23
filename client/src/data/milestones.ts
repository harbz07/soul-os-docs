export type MilestoneStatus = 'pending' | 'in-progress' | 'complete';

export interface Milestone {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  status: MilestoneStatus;
  features: string[];
  deliverables: string[];
  technicalNotes?: string[];
  estimatedWeeks: string;
}

export const milestones: Milestone[] = [
  {
    id: 1,
    title: "Foundation",
    subtitle: "Model Switching & Identity",
    description: "Give each model a persistent identity and let users switch between them seamlessly within conversations.",
    status: 'pending',
    features: [
      "Add `model` parameter to chat endpoint",
      "Create agent profiles with personality and expertise",
      "Store which agent responded to each message",
      "Simple UI for agent selection"
    ],
    deliverables: [
      "Agent profiles database table",
      "Updated chat endpoint with model selection",
      "3-5 default agents (Architect, Builder, Researcher, etc.)",
      "Agent attribution in message history"
    ],
    technicalNotes: [
      "Extend existing D1 schema with `agents` table",
      "Add `agent_id` field to messages table",
      "Update model adapter to accept agent profiles",
      "Create agent selection component"
    ],
    estimatedWeeks: "Week 1"
  },
  {
    id: 2,
    title: "Shared Memory Banks",
    subtitle: "Multi-Scope Memory",
    description: "Agents share memory but can also have private knowledge. Memory scopes enable both collaboration and specialization.",
    status: 'pending',
    features: [
      "Memory scopes: global, agent-specific, project",
      "Agents can read global memory (shared knowledge)",
      "Agents can write to their own memory bank",
      "Memory attribution tracking"
    ],
    deliverables: [
      "Memory scope field in database",
      "Agent-specific memory filtering",
      "Global memory consolidation",
      "Memory attribution UI"
    ],
    technicalNotes: [
      "Add `scope` and `owner_agent_id` to memory_items table",
      "Update RAG search to filter by scope",
      "Create memory visibility rules",
      "Implement cross-agent memory access patterns"
    ],
    estimatedWeeks: "Week 2-3"
  },
  {
    id: 3,
    title: "Agent Awareness",
    subtitle: "@Mentions & Handoffs",
    description: "Agents can reference and invoke each other through natural @mention syntax, enabling collaborative problem-solving.",
    status: 'pending',
    features: [
      "@mention syntax for agent invocation",
      "Agents can see conversation history from other agents",
      "Simple agent-to-agent communication",
      "Handoff pattern: one agent defers to another"
    ],
    deliverables: [
      "Mention parser in message processing",
      "Agent-to-agent message routing",
      "Conversation context sharing",
      "Handoff workflow implementation"
    ],
    technicalNotes: [
      "Parse @mentions in user messages",
      "Route messages to mentioned agents",
      "Include other agents' messages in context",
      "Create handoff protocol"
    ],
    estimatedWeeks: "Week 4"
  },
  {
    id: 4,
    title: "Automatic Routing",
    subtitle: "Intelligent Orchestration",
    description: "System intelligently routes to the right agent(s) based on task type, enabling seamless multi-agent collaboration.",
    status: 'pending',
    features: [
      "Wernicke router enhancement for agent selection",
      "Auto-invoke relevant agents based on task",
      "Multi-agent responses (optional)",
      "Consensus mode for important decisions"
    ],
    deliverables: [
      "Task classification system",
      "Agent routing logic",
      "Multi-agent response aggregation",
      "Consensus algorithm"
    ],
    technicalNotes: [
      "Extend Wernicke router with agent selection",
      "Create task-to-agent mapping",
      "Implement parallel agent invocation",
      "Design consensus mechanism"
    ],
    estimatedWeeks: "Week 5-6"
  },
  {
    id: 5,
    title: "Relational Dynamics",
    subtitle: "Personality & Rapport",
    description: "Agents have distinct personalities and build relationships with users, creating a more natural collaborative experience.",
    status: 'pending',
    features: [
      "Personality traits in system prompts",
      "Agents remember user preferences",
      "Agents develop rapport (stored in memory)",
      "Agents can disagree, debate, or defer",
      "User-configurable agent personalities"
    ],
    deliverables: [
      "Personality system prompt templates",
      "User preference tracking",
      "Rapport scoring system",
      "Agent interaction patterns",
      "Personality configuration UI"
    ],
    technicalNotes: [
      "Create personality trait system",
      "Track user-agent interactions",
      "Implement rapport scoring",
      "Design agent debate protocols"
    ],
    estimatedWeeks: "Week 7-8"
  },
  {
    id: 6,
    title: "Advanced Memory",
    subtitle: "Learning & Evolution",
    description: "Agents learn from interactions and evolve over time, developing expertise and adapting to user preferences.",
    status: 'pending',
    features: [
      "Agent-specific skill development tracking",
      "Cross-session learning",
      "Memory consolidation per agent",
      "Agent expertise growth metrics"
    ],
    deliverables: [
      "Skill tracking system",
      "Learning metrics dashboard",
      "Agent evolution visualization",
      "Expertise growth algorithms"
    ],
    technicalNotes: [
      "Create skill development schema",
      "Implement learning algorithms",
      "Build expertise tracking",
      "Design evolution metrics"
    ],
    estimatedWeeks: "Week 9-10"
  }
];

export function getMilestoneById(id: number): Milestone | undefined {
  return milestones.find(m => m.id === id);
}

export function getCompletedMilestones(): Milestone[] {
  return milestones.filter(m => m.status === 'complete');
}

export function getCurrentMilestone(): Milestone | undefined {
  return milestones.find(m => m.status === 'in-progress') || 
         milestones.find(m => m.status === 'pending');
}

export function getProgress(): number {
  const completed = milestones.filter(m => m.status === 'complete').length;
  return (completed / milestones.length) * 100;
}
