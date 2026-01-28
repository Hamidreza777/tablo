"use client";

export default function UserCreator({ newUser, setNewUser, addUser }) {
  return (
    <div className="bg-white rounded-xl shadow p-6 mb-10">
      <h2 className="text-xl font-semibold mb-4 text-blue-600">
        ساخت اکانت برای کاربران و مدیران
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <input
          className="border rounded-lg p-2"
          placeholder="نام کاربری"
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
        />
        <input
          className="border rounded-lg p-2"
          placeholder="رمز عبور"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
        />
        <select
          className="border rounded-lg p-2"
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
        >
          <option value="manager">مدیر</option>
          <option value="user">کاربر</option>
        </select>
        <button
          onClick={addUser}
          className="bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          ایجاد اکانت
        </button>
      </div>
    </div>
  );
}
