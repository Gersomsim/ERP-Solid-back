export interface Payload {
  userId: string;
  tenantId: string;
  type: 'access' | 'refresh';
}
