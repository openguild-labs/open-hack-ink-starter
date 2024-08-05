"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { useContractProvider } from "./ContractProvider";
import { useQuery } from "@tanstack/react-query";
import { InjectedAccount } from "@polkadot/extension-inject/types";
import { AccountId32Like } from "dedot/codecs";
import { Card } from "./ui/card";
import TodoItem from "./TodoItem";

type Props = {};

const TodoList: React.FC<Props> = ({}) => {
  const { isConnected, contract, getActiveAccount } = useContractProvider();
  const [account, setAccount] = React.useState<InjectedAccount | undefined>(
    undefined
  );

  const { data: counter } = useQuery({
    queryKey: ["get-todo-list"],
    queryFn: async () => {
      if (!account) return;
      const result = await contract?.query.getCounter(account.address, {
        caller: account.address,
      });

      return result?.data || 0;
    },
    enabled: !!account,
  });

  console.log(counter);

  React.useEffect(() => {
    getActiveAccount?.().then((acc) => {
      setAccount(acc);
    });
  }, [getActiveAccount]);

  if (!isConnected) return null;
  return (
    <div className="grid grid-cols-1 md:grid-cols-4">
      {counter &&
        Array.from({ length: Number(counter) }).map((_, i) => (
          <TodoItem key={i} id={BigInt(i)} />
        ))}
    </div>
  );
};

export default TodoList;
