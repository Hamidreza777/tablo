"use client";

export default function MonitoringTable({ users, toggleActive, deleteUser }) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-semibold mb-4 text-blue-600">نظارت بر داشبوردهای زیرمجموعه</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-blue-50">
            <th className="p-2 border">نام کاربری</th>
            <th className="p-2 border">نقش</th>
            <th className="p-2 border">وضعیت</th>
            <th className="p-2 border">عملیات</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="p-2 border">{user.username}</td>
              <td className="p-2 border">{user.role}</td>
              <td className={`p-2 border ${user.active ? 'text-green-600':'text-red-600'}`}>
                {user.active ? 'فعال' : 'غیرفعال'}
              </td>
              <td className="p-2 border flex gap-2">
                <button
                  onClick={() => toggleActive(user.id)}
                  className={`px-2 py-1 rounded text-white ${user.active ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-600 hover:bg-green-700'}`}
                >
                  {user.active ? 'غیرفعال کردن' : 'فعال کردن'}
                </button>
                <button
                  onClick={() => deleteUser(user.id)}
                  className="px-2 py-1 rounded bg-red-600 text-white hover:bg-red-700"
                >
                  حذف
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
