"use client";

export default function PendingBoards({ boards }) {
  const pending = boards.filter(b => b.status === "تایید نشده");

  if (pending.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500 text-lg font-medium">
        هیچ تابلوی تایید نشده‌ای وجود ندارد
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {pending.map(b => (
        <div key={b.id} className="bg-yellow-50 border-l-4 border-yellow-500 rounded-xl shadow p-4 flex flex-col justify-between">
          <h3 className="text-lg font-semibold text-yellow-700">{b.name}</h3>
          <p className="text-sm text-yellow-600 mt-2">وضعیت: {b.status}</p>
        </div>
      ))}
    </div>
  );
}
