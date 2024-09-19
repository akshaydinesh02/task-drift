import VerticalCard from "../../components/Dashboard/VerticalCard";

const data = [{ name: "task 1" }, { name: "task 2" }, { name: "task 3" }];

const Dashboard = () => {
  return (
    <main className="pt-36 h-screen flex gap-4 max-w-5xl mx-auto">
      <VerticalCard name="to-do" tasks={data} />
      <VerticalCard name="in progress" />
      <VerticalCard name="done" />
    </main>
  );
};

export default Dashboard;
