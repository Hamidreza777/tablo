"use client";

import { useState } from "react";

// کامپوننت‌ها
import Sidebar from "../components/Sidebar";
import Overview from "../components/Overview";
import UserCreator from "../components/UserCreator";
import MonitoringTable from "../components/MonitoringTable";
import ApprovedBoards from "../components/ApprovedBoards";
import PendingBoards from "../components/PendingBoards";

export default function BossDashboard() {
  // داده کاربران
  const [users, setUsers] = useState([
    { id: 1, username: "manager1", role: "manager", active: true },
    { id: 2, username: "user1", role: "user", active: true },
  ]);

  // داده تابلوها
  const [boards, setBoards] = useState([
    { id: 1, name: "تابلو 1", status: "تایید شده" },
    { id: 2, name: "تابلو 2", status: "تایید نشده" },
    { id: 3, name: "تابلو 3", status: "تایید شده" },
  ]);

  // داده فرم ساخت کاربر جدید
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    role: "manager",
  });

  // تب فعال
  const [activeTab, setActiveTab] = useState("overview");

  // ایجاد کاربر جدید
  const addUser = () => {
    if (!newUser.username || !newUser.password) return;

    setUsers([
      ...users,
      {
        id: Date.now(),
        username: newUser.username,
        role: newUser.role,
        active: true,
      },
    ]);
    setNewUser({ username: "", password: "", role: "manager" });
  };

  // تغییر وضعیت فعال/غیرفعال کاربر
  const toggleActive = (id) => {
    setUsers(
      users.map((u) => (u.id === id ? { ...u, active: !u.active } : u))
    );
  };

  // حذف کاربر
  const deleteUser = (id) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-row-reverse">
      {/* سایدبار سمت راست */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* محتوای اصلی */}
      <div className="flex-1 p-6 md:p-8 lg:p-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
         
        </h1>

        {activeTab === "overview" && <Overview users={users} />}

        {activeTab === "createUser" && (
          <UserCreator
            newUser={newUser}
            setNewUser={setNewUser}
            addUser={addUser}
          />
        )}

        {activeTab === "monitoring" && (
          <MonitoringTable
            users={users}
            toggleActive={toggleActive}
            deleteUser={deleteUser}
          />
        )}

        {activeTab === "approvedBoards" && <ApprovedBoards boards={boards} />}

        {activeTab === "pendingBoards" && <PendingBoards boards={boards} />}
      </div>
    </div>
  );
}