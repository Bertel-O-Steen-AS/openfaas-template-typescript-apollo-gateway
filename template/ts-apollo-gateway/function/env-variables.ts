/** @format */

export interface IApolloStudioGatewayVariables {
  APOLLO_KEY?: string;
  APOLLO_SCHEMA_CONFIG_DELIVERY_ENDPOINT?: string;
  APOLLO_GRAPH_VARIANT?: string;
}

export interface IApolloGatewayVariables extends IApolloStudioGatewayVariables {
  APOLLO_DEBUG?: boolean;
  APOLLO_INTROSPECTION?: boolean;
  PORT?: number;
}

export const getEnvironmentVariables = async (): Promise<IApolloGatewayVariables> => {
  return {
    APOLLO_DEBUG: false,
    APOLLO_INTROSPECTION: true,
    PORT: 3000,
  };
};
