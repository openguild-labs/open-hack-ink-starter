"use client";
import React, { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import ContractProvider from "./ContractProvider";
import { Toaster } from "sonner";

import dynamic from "next/dynamic";
const ContractProvider = dynamic(
  () =>
    import("@/components/ContractProvider").then(
      (module) => module.default
    ) as any,
  { ssr: false }
) as any;

type Props = {} & PropsWithChildren;
const queryClient = new QueryClient();
const AppProvider: React.FC<Props> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ContractProvider autoConnect>{children}</ContractProvider>
      <Toaster />
    </QueryClientProvider>
  );
};

export default AppProvider;
