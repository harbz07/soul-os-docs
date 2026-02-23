export interface ApiEndpoint {
  id: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  title: string;
  description: string;
  category: 'chat' | 'memory' | 'agents' | 'system';
  authentication: 'required' | 'optional' | 'none';
  requestBody?: {
    contentType: string;
    schema: Record<string, any>;
    example: string;
  };
  responseBody?: {
    contentType: string;
    schema: Record<string, any>;
    example: string;
  };
  parameters?: Array<{
    name: string;
    in: 'path' | 'query' | 'header';
    required: boolean;
    type: string;
    description: string;
  }>;
  notes?: string[];
}

export const apiEndpoints: ApiEndpoint[] = [
  {
    id: 'health',
    method: 'GET',
    path: '/health',
    title: 'Health Check',
    description: 'Check system health and configuration status',
    category: 'system',
    authentication: 'none',
    responseBody: {
      contentType: 'application/json',
      schema: {
        status: 'string',
        db: 'boolean',
        model_configured: 'boolean',
        backend: 'string'
      },
      example: JSON.stringify({
        status: 'ok',
        db: true,
        model_configured: true,
        backend: 'openai-compatible'
      }, null, 2)
    }
  },
  {
    id: 'chat',
    method: 'POST',
    path: '/api/chat',
    title: 'Create Chat Completion',
    description: 'Send a message and receive an AI response with memory, skill activation, and token tracking',
    category: 'chat',
    authentication: 'required',
    parameters: [
      {
        name: 'Authorization',
        in: 'header',
        required: true,
        type: 'string',
        description: 'Bearer token (dev-master-key or crs_* format)'
      }
    ],
    requestBody: {
      contentType: 'application/json',
      schema: {
        message: 'string (required)',
        session_id: 'string (optional)',
        loadout_id: 'string (optional)',
        agent_id: 'string (optional - future)',
        context: 'object (optional)'
      },
      example: JSON.stringify({
        message: 'What is the current architecture of Soul-OS?',
        session_id: 'session_abc123',
        loadout_id: 'default'
      }, null, 2)
    },
    responseBody: {
      contentType: 'application/json',
      schema: {
        response: 'string',
        session_id: 'string',
        tokens_used: 'number',
        skills_activated: 'array',
        memory_retrieved: 'array',
        agent_id: 'string (future)'
      },
      example: JSON.stringify({
        response: 'Soul-OS is a multi-agent cognitive ecosystem...',
        session_id: 'session_abc123',
        tokens_used: 1247,
        skills_activated: ['memory_search', 'context_synthesis'],
        memory_retrieved: [
          { id: 'mem_001', content: 'MindBridge architecture...', relevance: 0.92 }
        ]
      }, null, 2)
    },
    notes: [
      'Session IDs are auto-generated if not provided',
      'Loadout IDs: fast (Haiku), default (Sonnet), deep (Opus), code (Sonnet)',
      'Future: agent_id will route to specific agents (Architect, Builder, etc.)'
    ]
  },
  {
    id: 'memory-store',
    method: 'POST',
    path: '/api/memory',
    title: 'Store Memory',
    description: 'Store a memory item with optional scope and agent attribution',
    category: 'memory',
    authentication: 'required',
    parameters: [
      {
        name: 'Authorization',
        in: 'header',
        required: true,
        type: 'string',
        description: 'Bearer token'
      }
    ],
    requestBody: {
      contentType: 'application/json',
      schema: {
        content: 'string (required)',
        scope: 'string (optional: global|agent|project)',
        agent_id: 'string (optional)',
        metadata: 'object (optional)'
      },
      example: JSON.stringify({
        content: 'User prefers detailed technical explanations with code examples',
        scope: 'global',
        metadata: {
          category: 'user_preference',
          confidence: 0.95
        }
      }, null, 2)
    },
    responseBody: {
      contentType: 'application/json',
      schema: {
        id: 'string',
        created_at: 'string (ISO 8601)',
        scope: 'string'
      },
      example: JSON.stringify({
        id: 'mem_xyz789',
        created_at: '2026-02-23T03:15:00Z',
        scope: 'global'
      }, null, 2)
    },
    notes: [
      'Scope defaults to "global" if not specified',
      'Agent-scoped memories are only visible to that agent',
      'Global memories are shared across all agents'
    ]
  },
  {
    id: 'memory-search',
    method: 'GET',
    path: '/api/memory/search',
    title: 'Search Memory',
    description: 'Search memory items by query with optional scope filtering',
    category: 'memory',
    authentication: 'required',
    parameters: [
      {
        name: 'Authorization',
        in: 'header',
        required: true,
        type: 'string',
        description: 'Bearer token'
      },
      {
        name: 'q',
        in: 'query',
        required: true,
        type: 'string',
        description: 'Search query'
      },
      {
        name: 'scope',
        in: 'query',
        required: false,
        type: 'string',
        description: 'Memory scope filter (global|agent|project)'
      },
      {
        name: 'limit',
        in: 'query',
        required: false,
        type: 'number',
        description: 'Maximum results (default: 10)'
      }
    ],
    responseBody: {
      contentType: 'application/json',
      schema: {
        results: 'array',
        total: 'number'
      },
      example: JSON.stringify({
        results: [
          {
            id: 'mem_001',
            content: 'MindBridge router uses FastAPI...',
            scope: 'global',
            relevance: 0.94,
            created_at: '2026-02-22T10:00:00Z'
          }
        ],
        total: 1
      }, null, 2)
    }
  },
  {
    id: 'init-db',
    method: 'GET',
    path: '/api/init',
    title: 'Initialize Database',
    description: 'Initialize database schema (run once on first deployment)',
    category: 'system',
    authentication: 'none',
    responseBody: {
      contentType: 'application/json',
      schema: {
        message: 'string',
        tables_created: 'array'
      },
      example: JSON.stringify({
        message: 'Database initialized successfully',
        tables_created: ['sessions', 'messages', 'memory_items', 'traces']
      }, null, 2)
    },
    notes: [
      'Only needs to be called once after deployment',
      'Idempotent - safe to call multiple times'
    ]
  },
  {
    id: 'models-list',
    method: 'GET',
    path: '/v1/models',
    title: 'List Available Models',
    description: 'Get all available models from MindBridge router',
    category: 'system',
    authentication: 'none',
    responseBody: {
      contentType: 'application/json',
      schema: {
        object: 'string',
        data: 'array'
      },
      example: JSON.stringify({
        object: 'list',
        data: [
          { id: 'mindbridge:openai/gpt-4o', object: 'model', owned_by: 'openai' },
          { id: 'mindbridge:anthropic/claude-sonnet-4-6', object: 'model', owned_by: 'anthropic' }
        ]
      }, null, 2)
    }
  },
  {
    id: 'chat-completions',
    method: 'POST',
    path: '/v1/chat/completions',
    title: 'OpenAI-Compatible Chat',
    description: 'Direct access to MindBridge router (OpenAI API format)',
    category: 'chat',
    authentication: 'none',
    requestBody: {
      contentType: 'application/json',
      schema: {
        model: 'string (required)',
        messages: 'array (required)',
        temperature: 'number (optional)',
        max_tokens: 'number (optional)'
      },
      example: JSON.stringify({
        model: 'mindbridge:anthropic/claude-sonnet-4-6',
        messages: [
          { role: 'user', content: 'Hello!' }
        ]
      }, null, 2)
    },
    responseBody: {
      contentType: 'application/json',
      schema: {
        id: 'string',
        object: 'string',
        choices: 'array',
        usage: 'object'
      },
      example: JSON.stringify({
        id: 'chatcmpl-xyz',
        object: 'chat.completion',
        choices: [{
          index: 0,
          message: { role: 'assistant', content: 'Hello! How can I help?' },
          finish_reason: 'stop'
        }],
        usage: { prompt_tokens: 10, completion_tokens: 8, total_tokens: 18 }
      }, null, 2)
    },
    notes: [
      'Bypasses Soul-OS cognitive stack',
      'No memory, skills, or session tracking',
      'Use for direct model access'
    ]
  }
];

export function getEndpointsByCategory(category: string): ApiEndpoint[] {
  return apiEndpoints.filter(e => e.category === category);
}

export function getEndpointById(id: string): ApiEndpoint | undefined {
  return apiEndpoints.find(e => e.id === id);
}
