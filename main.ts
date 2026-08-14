import React, { useState } from "react";

export type Task = {
  id: string;
  title: string;
  description: string;
  status: "todo" | "in-progress" | "completed";
  priority: "low" | "medium" | "high";
};

const INITIAL_TASKS: Task[] = [
  { id: "1", title: "Design Landing Page", description: "Create wireframes and high-fidelity mockups in Figma.", status: "completed", priority: "high" },
  { id: "2", title: "Set up PostgreSQL", description: "Configure database schemas, relationships, and connection pools.", status: "in-progress", priority: "high" },
  { id: "3", title: "Implement Auth Flow", description: "Add JWT token verification and secure password hashing.", status: "todo", priority: "medium" },
  { id: "4", title: "Write Unit Tests", description: "Achieve at least 80% test coverage on critical backend routes.", status: "todo", priority: "low" },
];

export const TaskDashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [filter, setFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredTasks = tasks.filter((task) => {
    const matchesFilter = filter === "all" || task.status === filter;
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const toggleTaskStatus = (id: string) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        const nextStatus: Task["status"] = 
          task.status === "todo" ? "in-progress" : 
          task.status === "in-progress" ? "completed" : "todo";
        return { ...task, status: nextStatus };
      }
      return task;
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-[#0d1117] text-[#f0f6fc] min-h-screen font-sans">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 border-b border-[#30363d] pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Project Tasks</h1>
          <p className="text-xs text-[#8b949e] mt-1">Manage, filter, and track development workflows.</p>
        </div>
        <input 
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-[#161b22] border border-[#30363d] px-3 py-1.5 rounded-md text-sm text-[#f0f6fc] focus:outline-none focus:border-emerald-500 transition-colors"
        />
      </header>

      <div className="flex gap-2 mb-6 border-b border-[#30363d] pb-3">
        {["all", "todo", "in-progress", "completed"].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors capitalize cursor-pointer ${
              filter === tab ? "bg-emerald-600 text-white" : "bg-[#161b22] text-[#8b949e] hover:text-white"
            }`}
          >
            {tab.replace("-", " ")}
          </button>
        ))}
      </div>

      <div className="grid gap-4">
        {filteredTasks.length === 0 ? (
          <p className="text-center text-[#8b949e] py-12 text-sm">No tasks found matching your criteria.</p>
        ) : (
          filteredTasks.map((task) => (
            <div key={task.id} className="bg-[#161b22] border border-[#30363d] p-4 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-emerald-500/50 transition-all">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm font-semibold text-[#f0f6fc]">{task.title}</h3>
                  <span className={`text-[10px] px-2 py-0.5 rounded uppercase font-bold tracking-wider ${
                    task.priority === "high" ? "bg-red-500/10 text-red-400 border border-red-500/20" :
                    task.priority === "medium" ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20" :
                    "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                  }`}>
                    {task.priority}
                  </span>
                </div>
                <p className="text-xs text-[#8b949e]">{task.description}</p>
              </div>
              <button 
                onClick={() => toggleTaskStatus(task.id)}
                className={`px-3 py-1.5 text-xs rounded-md font-medium border transition-colors cursor-pointer capitalize ${
                  task.status === "completed" ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" :
                  task.status === "in-progress" ? "bg-blue-500/10 border-blue-500/30 text-blue-400" :
                  "bg-[#21262d] border-[#30363d] text-[#8b949e]"
                }`}
              >
                {task.status.replace("-", " ")}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
