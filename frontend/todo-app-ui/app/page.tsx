import ConnectButton from "@/components/ConnectButton";
import TodoList from "@/components/TodoList";

export default function Home() {
  return (
    <div className="space-y-5">
      <ConnectButton />
      <TodoList />
    </div>
  );
}
