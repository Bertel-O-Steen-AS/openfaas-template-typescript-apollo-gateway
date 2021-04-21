/** @format */

// Copyright (c) Alex Ellis 2017. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { ApolloServer } from 'apollo-server'
import { ApolloGateway } from '@apollo/gateway'

const args = process.argv.slice(2);
const mode = args[0]
const apolloKey = process.env.APOLLO_KEY;
const apolloSchemaConfigDeliveryEndpoint = process.env.APOLLO_SCHEMA_CONFIG_DELIVERY_ENDPOINT;
const debug = !!process.env.APOLLO_DEBUG ? process.env.APOLLO_DEBUG === 'true' : false;
const introspection = !!process.env.APOLLO_INTROSPECTION ? process.env.APOLLO_INTROSPECTION === 'true' : true;
const playground = !!process.env.APOLLO_PLAYGROUND ? process.env.APOLLO_PLAYGROUND === 'true' : false;

const config = {}
if (!apolloKey || !apolloSchemaConfigDeliveryEndpoint) {
  const errorMsg = 'You must set the APOLLO_KEY and/or APOLLO_SCHEMA_CONFIG_DELIVERY_ENDPOINT environment variables!';
  console.error(errorMsg);
  throw new Error(errorMsg);
}

const gateway = new ApolloGateway(config)

const server = new ApolloServer({
  gateway,
  introspection,
  playground,
  debug,
  // Subscriptions are unsupported but planned for a future Gateway version.
  subscriptions: false,
});

const port = process.env.PORT || 3000

server.listen(port)
  .then(({url}) => {
    console.log(`🚀 Gateway ready at ${url}`);
  })
  .catch((error) => console.error(error));
