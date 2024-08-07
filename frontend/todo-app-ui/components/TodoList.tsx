"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { useContractProvider } from "./ContractProvider";
import { useQuery } from "@tanstack/react-query";
import { InjectedAccount } from "@polkadot/extension-inject/types";
import TodoItem from "./TodoItem";
import AddTodoButton from "./AddTodoButton";

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
    enabled: !!account && !!contract,
  });

  React.useEffect(() => {
    getActiveAccount?.().then((acc) => {
      setAccount(acc);
    });
  }, [getActiveAccount]);

  if (!isConnected) return null;
  return (
    <div>
      <div className="w-full flex justify-end items-center">
        <AddTodoButton />
      </div>
      <Table>
        <TableCaption>A list of your todos.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Content</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {counter &&
            Array.from({ length: Number(counter) }).map((_, i) => (
              <TodoItem key={i} id={BigInt(i)} />
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TodoList;
