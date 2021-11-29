/** @format */

// Copyright (c) Alex Ellis 2017. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { ApolloServer } from 'apollo-server';
import { ApolloGateway } from '@apollo/gateway';
import { serviceList } from './function/service-list';
import { getEnvironmentVariables } from './function/env-variables';
import { config } from './function/config';

const apolloStudioKey = process.env?.APOLLO_KEY;
const apolloStudioSchemaConfigDeliveryEndpoint = process.env?.APOLLO_SCHEMA_CONFIG_DELIVERY_ENDPOINT;
const apolloStudioVariant = process.env?.APOLLO_GRAPH_VARIANT;

const startServer = async () => {
  const vars = await getEnvironmentVariables();
  const port = vars?.PORT || 3000;

  const debug = vars?.APOLLO_DEBUG === true || false;
  const introspection = vars?.APOLLO_INTROSPECTION === true || true;
  const playground = vars?.APOLLO_PLAYGROUND === true || false;

  const serviceListWrapper = {
    ...(Array.isArray(serviceList) && serviceList.length > 0 ? { serviceList } : {}),
  };
  if (!serviceList && (!apolloStudioKey || !apolloStudioSchemaConfigDeliveryEndpoint || !apolloStudioVariant)) {
    const errorMsg =
      'You must either set the APOLLO_KEY and APOLLO_SCHEMA_CONFIG_DELIVERY_ENDPOINT environment variables, if you wish to use Apollo Studio. Otherwise, please provide a service list.';
    console.error(errorMsg);
    throw new Error(errorMsg);
  }

  const gateway = new ApolloGateway(config);

  const server = new ApolloServer({
    gateway,
    introspection,
    playground,
    debug,
    // Subscriptions are unsupported but planned for a future Gateway version.
    subscriptions: false,
    ...serviceListWrapper,
  });

  server
    .listen(port)
    .then(({ url }) => {
      console.log(`🚀 Gateway ready at ${url}`);
    })
    .catch(error => console.error(error));
};

startServer();
