import { useState } from "react";
import { apiEndpoints, getEndpointsByCategory } from "@/data/api-endpoints";
import { EndpointCard } from "@/components/EndpointCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Code2, Database, MessageSquare, Settings } from "lucide-react";

export default function ApiDocs() {
  const [activeCategory, setActiveCategory] = useState<string>('chat');

  const categories = [
    { id: 'chat', label: 'Chat', icon: MessageSquare, color: 'text-amber-400' },
    { id: 'memory', label: 'Memory', icon: Database, color: 'text-blue-400' },
    { id: 'agents', label: 'Agents', icon: Code2, color: 'text-purple-400' },
    { id: 'system', label: 'System', icon: Settings, color: 'text-emerald-400' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0e27] via-[#1a1f3a] to-[#0a0e27]">
      {/* Cosmic Background */}
      <div className="fixed inset-0 opacity-30 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 40% 20%, rgba(251, 191, 36, 0.05) 0%, transparent 50%)`
        }} />
      </div>

      <div className="relative container max-w-7xl mx-auto px-6 py-16 space-y-12">
        {/* Header */}
        <div className="text-center space-y-6">
          <div className="inline-block">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Code2 className="w-8 h-8 text-amber-400" />
              <h1 className="text-5xl font-serif text-amber-100">API Reference</h1>
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Complete documentation for the Soul-OS API. Integrate multi-agent cognitive capabilities into your applications.
          </p>
        </div>

        {/* Base URL Card */}
        <Card className="bg-card/40 backdrop-blur-sm border-border/50 p-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-amber-200">Base URL</h3>
            <div className="flex items-center gap-3">
              <code className="flex-1 bg-black/40 border border-border/30 rounded px-4 py-3 text-emerald-300 font-mono">
                https://soul-os-frontend.harveytagalicud7.workers.dev
              </code>
            </div>
            <p className="text-sm text-muted-foreground">
              All API requests should be made to this base URL. For MindBridge direct access, use{" "}
              <code className="text-amber-300">https://api.soul-os.cc</code>
            </p>
          </div>
        </Card>

        {/* Authentication Card */}
        <Card className="bg-card/40 backdrop-blur-sm border-border/50 p-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-amber-200">Authentication</h3>
            <p className="text-muted-foreground">
              Most endpoints require authentication via Bearer token in the Authorization header:
            </p>
            <pre className="bg-black/40 border border-border/30 rounded-lg p-4 overflow-x-auto text-sm">
              <code className="text-blue-300">Authorization: Bearer dev-master-key</code>
            </pre>
            <div className="space-y-2 text-sm">
              <p className="text-muted-foreground">
                <strong className="text-amber-300">dev-master-key:</strong> Full access, 1000 RPM (development)
              </p>
              <p className="text-muted-foreground">
                <strong className="text-amber-300">crs_*:</strong> Demo mode, 60 RPM (e.g., crs_test_key)
              </p>
            </div>
          </div>
        </Card>

        {/* Category Tabs */}
        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="space-y-8">
          <TabsList className="grid grid-cols-4 w-full max-w-2xl mx-auto bg-card/40 backdrop-blur-sm border border-border/50 p-1">
            {categories.map(cat => {
              const Icon = cat.icon;
              const endpoints = getEndpointsByCategory(cat.id);
              return (
                <TabsTrigger
                  key={cat.id}
                  value={cat.id}
                  className="data-[state=active]:bg-amber-500/20 data-[state=active]:text-amber-200"
                >
                  <Icon className={`w-4 h-4 mr-2 ${cat.color}`} />
                  {cat.label}
                  <span className="ml-2 text-xs opacity-60">({endpoints.length})</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {categories.map(cat => (
            <TabsContent key={cat.id} value={cat.id} className="space-y-6">
              {getEndpointsByCategory(cat.id).map(endpoint => (
                <EndpointCard key={endpoint.id} endpoint={endpoint} />
              ))}
              {getEndpointsByCategory(cat.id).length === 0 && (
                <Card className="bg-card/40 backdrop-blur-sm border-border/50 p-12 text-center">
                  <p className="text-muted-foreground">
                    No endpoints in this category yet. Coming soon in future milestones.
                  </p>
                </Card>
              )}
            </TabsContent>
          ))}
        </Tabs>

        {/* Integration Examples */}
        <div className="space-y-6 pt-8 border-t border-border/30">
          <h2 className="text-3xl font-serif text-amber-100 text-center">Integration Examples</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* JavaScript Example */}
            <Card className="bg-card/40 backdrop-blur-sm border-border/50 p-6 space-y-4">
              <h3 className="text-lg font-semibold text-amber-200">JavaScript / TypeScript</h3>
              <pre className="bg-black/40 border border-border/30 rounded-lg p-4 overflow-x-auto text-xs">
                <code className="text-emerald-300">{`const response = await fetch(
  'https://soul-os-frontend.../api/chat',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer dev-master-key'
    },
    body: JSON.stringify({
      message: 'Hello, Soul-OS!',
      loadout_id: 'default'
    })
  }
);

const data = await response.json();
console.log(data.response);`}</code>
              </pre>
            </Card>

            {/* Python Example */}
            <Card className="bg-card/40 backdrop-blur-sm border-border/50 p-6 space-y-4">
              <h3 className="text-lg font-semibold text-amber-200">Python</h3>
              <pre className="bg-black/40 border border-border/30 rounded-lg p-4 overflow-x-auto text-xs">
                <code className="text-blue-300">{`import requests

response = requests.post(
    'https://soul-os-frontend.../api/chat',
    headers={
        'Authorization': 'Bearer dev-master-key'
    },
    json={
        'message': 'Hello, Soul-OS!',
        'loadout_id': 'default'
    }
)

data = response.json()
print(data['response'])`}</code>
              </pre>
            </Card>

            {/* cURL Example */}
            <Card className="bg-card/40 backdrop-blur-sm border-border/50 p-6 space-y-4">
              <h3 className="text-lg font-semibold text-amber-200">cURL</h3>
              <pre className="bg-black/40 border border-border/30 rounded-lg p-4 overflow-x-auto text-xs">
                <code className="text-amber-300">{`curl -X POST \\
  https://soul-os-frontend.../api/chat \\
  -H 'Authorization: Bearer dev-master-key' \\
  -H 'Content-Type: application/json' \\
  -d '{
    "message": "Hello, Soul-OS!",
    "loadout_id": "default"
  }'`}</code>
              </pre>
            </Card>

            {/* OpenAI SDK Example */}
            <Card className="bg-card/40 backdrop-blur-sm border-border/50 p-6 space-y-4">
              <h3 className="text-lg font-semibold text-amber-200">OpenAI SDK (MindBridge)</h3>
              <pre className="bg-black/40 border border-border/30 rounded-lg p-4 overflow-x-auto text-xs">
                <code className="text-purple-300">{`from openai import OpenAI

client = OpenAI(
    base_url="https://api.soul-os.cc/v1",
    api_key="not-required"
)

response = client.chat.completions.create(
    model="mindbridge:anthropic/claude-sonnet-4-6",
    messages=[
        {"role": "user", "content": "Hello!"}
    ]
)

print(response.choices[0].message.content)`}</code>
              </pre>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
