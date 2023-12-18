export interface JsonSchema {
    type: 'object';
    properties: Record<string, unknown>;
    required: string[];
}