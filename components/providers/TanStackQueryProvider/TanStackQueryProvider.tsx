"use client";

import {
  defaultShouldDehydrateQuery,
  environmentManager,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

interface TanStackQueryProviderProps {
  children: React.ReactNode;
}

let browserQueryClient: QueryClient | undefined;

function CreateQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
      dehydrate: {
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) || query.state.status == "pending",
      },
    },
  });
}

function getQueryClient() {
  if (environmentManager.isServer()) {
    return CreateQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = CreateQueryClient();
    return browserQueryClient;
  }
}

const TanStackQueryProvider = ({ children }: TanStackQueryProviderProps) => {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default TanStackQueryProvider;
