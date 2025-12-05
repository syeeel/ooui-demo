import { useState } from "react";
import { Link } from "react-router";
import { Layout } from "~/components/Layout";
import { PageHeader } from "~/components/PageHeader";
import { Modal } from "~/components/Modal";
import { PlusIcon } from "~/components/Icons";
import { students, classes, getClassById, getClubById } from "~/data/mockData";
import type { Student } from "~/types";

// 生徒のアバター色をランダムに決定するための配列
const avatarColors = [
  "from-primary-400 to-primary-500",
  "from-[#98DBC6] to-primary-400",
  "from-[#F18D9E] to-pink-400",
  "from-[#E6D72A] to-yellow-400",
  "from-blue-400 to-blue-500",
  "from-purple-400 to-purple-500",
  "from-orange-400 to-orange-500",
];

// 生徒IDからアバター色を取得
const getAvatarColor = (id: string) => {
  const index = parseInt(id.replace(/\D/g, '')) % avatarColors.length;
  return avatarColors[index];
};

export function meta() {
  return [{ title: "生徒一覧 - スクールライフ" }];
}

export default function StudentsIndex() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [studentList, setStudentList] = useState(students);
  const [formData, setFormData] = useState({
    name: "",
    grade: "B",
    classId: classes[0]?.id || "",
  });
  const [filterClass, setFilterClass] = useState<string>("all");

  const handleCreate = () => {
    const newStudent: Student = {
      id: `s${Date.now()}`,
      name: formData.name,
      grade: formData.grade,
      classId: formData.classId,
      clubIds: [],
    };
    setStudentList([...studentList, newStudent]);
    setFormData({ name: "", grade: "B", classId: classes[0]?.id || "" });
    setIsModalOpen(false);
  };

  // フィルタリングされた生徒リスト
  const filteredStudents = filterClass === "all"
    ? studentList
    : studentList.filter(s => s.classId === filterClass);

  return (
    <Layout>
      <PageHeader
        title="生徒"
        subtitle={`${studentList.length}名の生徒`}
      />

      {/* アクションバー */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary-400 to-primary-500 text-white rounded-full hover:from-primary-500 hover:to-primary-600 transition-all shadow-md hover:shadow-lg text-sm font-medium"
        >
          <PlusIcon className="w-4 h-4" />
          新規作成
        </button>

        {/* クラスフィルター */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">クラス:</span>
          <select
            value={filterClass}
            onChange={(e) => setFilterClass(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
          >
            <option value="all">すべて</option>
            {classes.map((cls) => (
              <option key={cls.id} value={cls.id}>
                {cls.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 生徒カードグリッド */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredStudents.map((student) => {
          const studentClass = getClassById(student.classId);
          const clubNames = student.clubIds
            .map((id) => getClubById(id)?.name)
            .filter(Boolean)
            .join(", ");

          return (
            <Link
              key={student.id}
              to={`/students/${student.id}`}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-lg hover:scale-105 transition-all group"
            >
              {/* アバター */}
              <div className="flex justify-center mb-4">
                <div className={`w-20 h-20 bg-gradient-to-br ${getAvatarColor(student.id)} rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow`}>
                  <span className="text-2xl font-bold text-white">
                    {student.name.charAt(0)}
                  </span>
                </div>
              </div>

              {/* 名前 */}
              <h3 className="text-center font-bold text-gray-800 group-hover:text-primary-600 transition-colors">
                {student.name}
              </h3>

              {/* クラス */}
              <p className="text-center text-sm text-gray-500 mt-1">
                {studentClass?.name}
              </p>

              {/* 成績バッジ */}
              <div className="flex justify-center mt-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    student.grade === "A"
                      ? "bg-primary-100 text-primary-700"
                      : student.grade === "B"
                      ? "bg-[#E6D72A]/20 text-yellow-700"
                      : "bg-[#F18D9E]/20 text-[#F18D9E]"
                  }`}
                >
                  成績 {student.grade}
                </span>
              </div>

              {/* 部活動 */}
              {clubNames && (
                <p className="text-center text-xs text-gray-400 mt-2 truncate">
                  {clubNames}
                </p>
              )}
            </Link>
          );
        })}
      </div>

      {/* 結果がない場合 */}
      {filteredStudents.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          該当する生徒がいません
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="生徒を新規作成"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCreate();
          }}
          className="space-y-5"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              氏名
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all"
              placeholder="例: 山田太郎"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              成績
            </label>
            <select
              value={formData.grade}
              onChange={(e) =>
                setFormData({ ...formData, grade: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all"
            >
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              クラス
            </label>
            <select
              value={formData.classId}
              onChange={(e) =>
                setFormData({ ...formData, classId: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all"
            >
              {classes.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-5 py-2.5 text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors font-medium"
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-gradient-to-r from-primary-400 to-primary-500 text-white rounded-full hover:from-primary-500 hover:to-primary-600 transition-all font-medium"
            >
              作成
            </button>
          </div>
        </form>
      </Modal>
    </Layout>
  );
}
