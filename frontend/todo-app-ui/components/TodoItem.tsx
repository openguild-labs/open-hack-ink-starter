"use client";
import React from "react";
import { useContractProvider } from "./ContractProvider";
import { InjectedAccount } from "@polkadot/extension-inject/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Switch } from "./ui/switch";
import { toast } from "sonner";

type Props = {
  id: bigint;
};

const TodoItem: React.FC<Props> = ({ id }) => {
  const { contract, signer, getActiveAccount } = useContractProvider();
  const [account, setAccount] = React.useState<InjectedAccount | undefined>(
    undefined
  );
  const queryClient = useQueryClient();

  React.useEffect(() => {
    getActiveAccount?.().then((acc) => {
      setAccount(acc);
    });
  }, [getActiveAccount]);

  const { data: todo } = useQuery({
    queryKey: ["get-todo", id.toString()],
    queryFn: async () => {
      if (!account) return;
      const result = await contract?.query.getTodo(id, {
        caller: account.address,
      });

      return result?.data;
    },
    enabled: !!account,
  });
  console.log(todo);

  const { mutate } = useMutation({
    mutationKey: ["toggle-todo", id.toString()],
    mutationFn: async () => {
      console.log(account, contract, signer);
      if (!account || !contract) return;
      const { raw } = await contract.query.toggleTodo(id, {
        caller: account.address,
      });

      await contract.tx
        .toggleTodo(id, {
          gasLimit: raw.gasRequired,
        })
        .signAndSend(
          account.address,
          {
            signer: signer,
          },
          async ({ status, events }) => {
            console.log({ status });
            if (
              status.type === "BestChainBlockIncluded" ||
              status.type === "Finalized"
            ) {
              toast.success(`Toogle todo successfully`);
              await queryClient.invalidateQueries({
                queryKey: ["get-todo", id.toString()],
              });
            }
          }
        );
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Task ID: <span className="font-bold">{todo?.id.toString()}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>{todo?.content}</CardContent>
      <CardFooter>
        <Switch checked={todo?.completed} onCheckedChange={() => mutate()} />
      </CardFooter>
    </Card>
  );
};

export default TodoItem;
