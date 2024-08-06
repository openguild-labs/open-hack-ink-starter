"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Loader2, PlusCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "./ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Textarea } from "./ui/textarea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useContractProvider } from "./ContractProvider";
import { InjectedAccount } from "@polkadot/extension-inject/types";
type Props = {};

const formSchema = z.object({
  content: z.string().min(3).max(50),
});

type formSchemaType = z.infer<typeof formSchema>;

const AddTodoButton: React.FC<Props> = ({}) => {
  const { contract, signer, getActiveAccount } = useContractProvider();
  const [account, setAccount] = React.useState<InjectedAccount | undefined>(
    undefined
  );
  const queryClient = useQueryClient();

  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["add-todo"],
    mutationFn: async (data: formSchemaType) => {
      if (!account || !contract) return;
      const { raw } = await contract.query.addTodo(data.content, {
        caller: account.address,
      });

      return new Promise((resolve) =>
        contract.tx
          .addTodo(data.content, {
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
                resolve(data);
              }
            }
          )
      );
    },
  });

  function onSubmit(values: formSchemaType) {
    toast.promise(mutateAsync(values), {
      loading: "Creating todo...",
      success: async () => {
        await queryClient.invalidateQueries({
          queryKey: ["get-todo-list"],
        });

        setIsOpen(false);
        form.reset();
        return "Todo created successfully";
      },
      error: "Failed to create todo",
    });
  }

  React.useEffect(() => {
    getActiveAccount?.().then((acc) => {
      setAccount(acc);
    });
  }, [getActiveAccount]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="w-5 h-5 mr-2" />
          Add Todo
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new todo</DialogTitle>
          <DialogDescription>
            Input the content of your new todo.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea placeholder="todo" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-2 items-center">
              <Button variant={"ghost"} onClick={() => setIsOpen(false)}>
                Close
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending && <Loader2 className="animate-spin mr-2 w-5 h-5" />}
                Add
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTodoButton;
