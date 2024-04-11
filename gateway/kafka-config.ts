export const KAFKA_CONFIG = {
  clientId: 'api-gateway',
  kafkaTopic: 'auth-service-topic',
  broker: 'localhost:9093',
  connectionTimeout: 3000,
  authenticationTimeout: 1000,
  reAuthenticationThreshold: 10000,
  groupId: 'auth-service',
};
