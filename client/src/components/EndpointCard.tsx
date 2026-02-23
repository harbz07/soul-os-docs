import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { ApiEndpoint } from "@/data/api-endpoints";
import { useState } from "react";

interface EndpointCardProps {
  endpoint: ApiEndpoint;
}

export function EndpointCard({ endpoint }: EndpointCardProps) {
  const [copiedRequest, setCopiedRequest] = useState(false);
  const [copiedResponse, setCopiedResponse] = useState(false);

  const copyToClipboard = (text: string, type: 'request' | 'response') => {
    navigator.clipboard.writeText(text);
    if (type === 'request') {
      setCopiedRequest(true);
      setTimeout(() => setCopiedRequest(false), 2000);
    } else {
      setCopiedResponse(true);
      setTimeout(() => setCopiedResponse(false), 2000);
    }
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      case 'POST': return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      case 'PUT': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'DELETE': return 'bg-red-500/20 text-red-300 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  return (
    <Card className="bg-card/40 backdrop-blur-sm border-border/50 p-6 space-y-6">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-3 flex-wrap">
              <Badge className={`font-mono text-xs px-3 py-1 ${getMethodColor(endpoint.method)}`}>
                {endpoint.method}
              </Badge>
              <code className="text-sm text-amber-200 font-mono bg-black/30 px-3 py-1 rounded">
                {endpoint.path}
              </code>
            </div>
            <h3 className="text-xl font-serif text-amber-100">{endpoint.title}</h3>
          </div>
          {endpoint.authentication === 'required' && (
            <Badge variant="outline" className="border-amber-500/30 text-amber-300 whitespace-nowrap">
              🔒 Auth Required
            </Badge>
          )}
        </div>
        <p className="text-muted-foreground">{endpoint.description}</p>
      </div>

      {/* Parameters */}
      {endpoint.parameters && endpoint.parameters.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-amber-200 uppercase tracking-wider">Parameters</h4>
          <div className="space-y-2">
            {endpoint.parameters.map((param, idx) => (
              <div key={idx} className="flex items-start gap-3 text-sm">
                <Badge variant="outline" className="text-xs shrink-0">
                  {param.in}
                </Badge>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <code className="text-amber-200 font-mono">{param.name}</code>
                    <span className="text-muted-foreground text-xs">({param.type})</span>
                    {param.required && (
                      <Badge variant="destructive" className="text-xs">required</Badge>
                    )}
                  </div>
                  <p className="text-muted-foreground text-xs">{param.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Request Body */}
      {endpoint.requestBody && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-amber-200 uppercase tracking-wider">Request Body</h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyToClipboard(endpoint.requestBody!.example, 'request')}
              className="h-8 gap-2"
            >
              {copiedRequest ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              {copiedRequest ? 'Copied!' : 'Copy'}
            </Button>
          </div>
          <pre className="bg-black/40 border border-border/30 rounded-lg p-4 overflow-x-auto text-xs">
            <code className="text-emerald-300">{endpoint.requestBody.example}</code>
          </pre>
        </div>
      )}

      {/* Response Body */}
      {endpoint.responseBody && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-amber-200 uppercase tracking-wider">Response</h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyToClipboard(endpoint.responseBody!.example, 'response')}
              className="h-8 gap-2"
            >
              {copiedResponse ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              {copiedResponse ? 'Copied!' : 'Copy'}
            </Button>
          </div>
          <pre className="bg-black/40 border border-border/30 rounded-lg p-4 overflow-x-auto text-xs">
            <code className="text-blue-300">{endpoint.responseBody.example}</code>
          </pre>
        </div>
      )}

      {/* Notes */}
      {endpoint.notes && endpoint.notes.length > 0 && (
        <div className="space-y-2 pt-2 border-t border-border/30">
          <h4 className="text-sm font-semibold text-amber-200 uppercase tracking-wider">Notes</h4>
          <ul className="space-y-1 text-sm text-muted-foreground">
            {endpoint.notes.map((note, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-amber-400 mt-1">•</span>
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  );
}
