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
import { TableCell, TableRow } from "./ui/table";

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
    enabled: !!account && !!contract,
  });

  const { mutateAsync } = useMutation({
    mutationKey: ["toggle-todo", id.toString()],
    mutationFn: async () => {
      if (!account || !contract) return;
      const { raw } = await contract.query.toggleTodo(id, {
        caller: account.address,
      });

      return new Promise((resolve) =>
        contract.tx
          .toggleTodo(id, {
            gasLimit: raw.gasRequired,
          })
          .signAndSend(
            account.address,
            {
              signer: signer,
            },
            async ({ status, events }) => {
              if (
                status.type === "BestChainBlockIncluded" ||
                status.type === "Finalized"
              ) {
                resolve(id.toString());
              }
            }
          )
      );
    },
  });

  const handleToggle = async () => {
    toast.promise(mutateAsync, {
      loading: "Updating todo status",
      success: async () => {
        await queryClient.invalidateQueries({
          queryKey: ["get-todo", id.toString()],
        });
        return `Successfully update todo ${id.toString()}`;
      },
      error: "Failed to update todo",
    });
  };

  return (
    <TableRow>
      <TableCell className="font-medium">{todo?.id.toString()}</TableCell>
      <TableCell>{todo?.content}</TableCell>
      <TableCell className="text-right">
        <Switch checked={todo?.completed} onCheckedChange={handleToggle} />
      </TableCell>
    </TableRow>
  );
};

export default TodoItem;
