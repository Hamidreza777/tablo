"use client";

export default function MonitoringTable({ users, toggleActive, deleteUser }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-200">
        <h2 className="text-xl font-bold text-blue-700">
          نظارت بر داشبوردهای زیرمجموعه
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-4 text-right text-sm font-semibold text-gray-700 uppercase tracking-wider"
              >
                شماره موبایل / نام کاربری
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-right text-sm font-semibold text-gray-700 uppercase tracking-wider"
              >
                نقش
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-right text-sm font-semibold text-gray-700 uppercase tracking-wider"
              >
                وضعیت
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-right text-sm font-semibold text-gray-700 uppercase tracking-wider"
              >
                عملیات
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {users.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-10 text-center text-gray-500">
                  هیچ کاربری ثبت نشده است
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-blue-50/30 transition-colors duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {user.phone || user.username || "—"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {user.role === "manager" ? "مدیر" : "کاربر معمولی"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.active
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user.active ? "فعال" : "غیرفعال"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleActive(user.id)}
                        className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          user.active
                            ? "bg-amber-100 text-amber-800 hover:bg-amber-200"
                            : "bg-green-100 text-green-800 hover:bg-green-200"
                        }`}
                      >
                        {user.active ? "غیرفعال کردن" : "فعال کردن"}
                      </button>

                      <button
                        onClick={() => deleteUser(user.id)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-red-50 text-red-700 hover:bg-red-100 transition-all"
                      >
                        حذف
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}