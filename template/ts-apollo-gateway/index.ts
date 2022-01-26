// Copyright (c) Alex Ellis 2017. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { ApolloServer } from 'apollo-server';
import { ApolloGateway } from '@apollo/gateway';
import { serviceList } from './function/service-list';
import { getEnvironmentVariables } from './function/env-variables';
import { config } from './function/config';
import { context } from './function/context';
import { formatError } from './function/log';

const apolloStudioKey = process.env?.APOLLO_KEY;
const apolloStudioGraphRef = process.env?.APOLLO_GRAPH_REF;

const startServer = async () => {
  const vars = await getEnvironmentVariables();
  const port = vars?.PORT || 3000;

  const debug = vars?.APOLLO_DEBUG === true || false;
  const introspection = vars?.APOLLO_INTROSPECTION === true || true;

  const serviceListWrapper = {
    ...(Array.isArray(serviceList) && serviceList.length > 0 ? { serviceList } : {}),
  };
  if (!serviceList && (!apolloStudioKey || !apolloStudioGraphRef)) {
    const errorMsg =
      'You must set the APOLLO_KEY and APOLLO_GRAPH_REF environment variables, if you wish to use Apollo Studio. Otherwise, please provide a service list.';
    console.error(errorMsg);
    throw new Error(errorMsg);
  }

  const gateway = new ApolloGateway(config);

  const server = new ApolloServer({
    gateway,
    introspection,
    debug,
    context,
    formatError,
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
