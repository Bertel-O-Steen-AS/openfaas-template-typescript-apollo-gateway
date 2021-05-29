/** @format */

export interface IApolloGatewayVariables {
  APOLLO_STUDIO_KEY?: string;
  APOLLO_STUDIO_SCHEMA_CONFIG_DELIVERY_ENDPOINT?: string;
  APOLLO_DEBUG?: boolean;
  APOLLO_INTROSPECTION?: boolean;
  APOLLO_PLAYGROUND?: boolean;
  PORT?: number;
}

export const getEnvironmentVariables = async (): Promise<IApolloGatewayVariables> => {
  return {
    APOLLO_STUDIO_KEY: null,
    APOLLO_STUDIO_SCHEMA_CONFIG_DELIVERY_ENDPOINT: null,
    APOLLO_DEBUG: false,
    APOLLO_INTROSPECTION: true,
    APOLLO_PLAYGROUND: true,
    PORT: 3000,
  };
};
