import { useState } from "react";
import { Link } from "react-router";
import { Layout } from "~/components/Layout";
import { PageHeader } from "~/components/PageHeader";
import { Modal } from "~/components/Modal";
import { PlusIcon, StudentIcon } from "~/components/Icons";
import { classes, teachers, getTeacherById, getStudentsByClass } from "~/data/mockData";
import type { Class } from "~/types";

// 学年ごとのグラデーション背景
const gradeGradients: Record<number, string> = {
  1: "from-primary-400 via-primary-500 to-[#98DBC6]",
  2: "from-[#F18D9E] via-pink-400 to-[#FFB6C1]",
  3: "from-[#E6D72A] via-yellow-400 to-orange-400",
};

// 学年ごとのラベル色
const gradeLabelColors: Record<number, string> = {
  1: "bg-white/30 text-white",
  2: "bg-white/30 text-white",
  3: "bg-white/30 text-white",
};

export function meta() {
  return [{ title: "クラス一覧 - スクールライフ" }];
}

export default function ClassesIndex() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [classList, setClassList] = useState(classes);
  const [formData, setFormData] = useState({
    name: "",
    grade: 1,
    teacherId: teachers[0]?.id || "",
  });

  const handleCreate = () => {
    const newClass: Class = {
      id: `c${Date.now()}`,
      name: formData.name,
      grade: formData.grade,
      teacherId: formData.teacherId,
    };
    setClassList([...classList, newClass]);
    setFormData({ name: "", grade: 1, teacherId: teachers[0]?.id || "" });
    setIsModalOpen(false);
  };

  // 学年でグループ化
  const grade1Classes = classList.filter(c => c.grade === 1);
  const grade2Classes = classList.filter(c => c.grade === 2);
  const grade3Classes = classList.filter(c => c.grade === 3);

  const renderClassCards = (classesToRender: Class[]) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {classesToRender.map((cls) => {
        const teacher = getTeacherById(cls.teacherId);
        const students = getStudentsByClass(cls.id);
        const gradient = gradeGradients[cls.grade] || gradeGradients[1];

        return (
          <Link
            key={cls.id}
            to={`/classes/${cls.id}`}
            className="relative h-48 rounded-2xl overflow-hidden group shadow-md hover:shadow-xl transition-all"
          >
            {/* グラデーション背景 */}
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient} transition-transform duration-500 group-hover:scale-110`} />

            {/* パターンオーバーレイ */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }} />
            </div>

            {/* コンテンツ */}
            <div className="relative h-full p-5 flex flex-col justify-between">
              {/* 上部：学年バッジ */}
              <div className="flex justify-between items-start">
                <span className={`${gradeLabelColors[cls.grade]} px-3 py-1 rounded-full text-sm font-bold backdrop-blur-sm`}>
                  {cls.grade}年生
                </span>
                <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded-full backdrop-blur-sm">
                  <StudentIcon className="w-4 h-4 text-white" />
                  <span className="text-white text-sm font-medium">{students.length}名</span>
                </div>
              </div>

              {/* 下部：クラス情報 */}
              <div>
                <h3 className="text-2xl font-bold text-white drop-shadow-lg mb-2">
                  {cls.name}
                </h3>
                {teacher && (
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <span className="text-sm font-bold text-white">
                        {teacher.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="text-white/90 text-sm font-medium">{teacher.name}</p>
                      <p className="text-white/70 text-xs">{teacher.subject}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );

  return (
    <Layout>
      <PageHeader
        title="クラス"
        subtitle={`${classList.length}件のクラス`}
      />

      <button
        onClick={() => setIsModalOpen(true)}
        className="mb-8 inline-flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-turquoise rounded-full hover:bg-turquoise/5 transition-all shadow-soft hover:shadow-soft-lg text-sm font-medium"
      >
        <PlusIcon className="w-4 h-4 text-turquoise" />
        <span className="text-turquoise">新規作成</span>
      </button>

      {/* 1年生 */}
      {grade1Classes.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-primary-400"></span>
            1年生
            <span className="ml-2 text-sm font-normal text-gray-500">{grade1Classes.length}クラス</span>
          </h2>
          {renderClassCards(grade1Classes)}
        </div>
      )}

      {/* 2年生 */}
      {grade2Classes.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#F18D9E]"></span>
            2年生
            <span className="ml-2 text-sm font-normal text-gray-500">{grade2Classes.length}クラス</span>
          </h2>
          {renderClassCards(grade2Classes)}
        </div>
      )}

      {/* 3年生 */}
      {grade3Classes.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#E6D72A]"></span>
            3年生
            <span className="ml-2 text-sm font-normal text-gray-500">{grade3Classes.length}クラス</span>
          </h2>
          {renderClassCards(grade3Classes)}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="クラスを新規作成"
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
              名称
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all"
              placeholder="例: 1年C組"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              学年
            </label>
            <select
              value={formData.grade}
              onChange={(e) =>
                setFormData({ ...formData, grade: Number(e.target.value) })
              }
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all"
            >
              <option value={1}>1年</option>
              <option value={2}>2年</option>
              <option value={3}>3年</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              担任
            </label>
            <select
              value={formData.teacherId}
              onChange={(e) =>
                setFormData({ ...formData, teacherId: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all"
            >
              {teachers.map((teacher) => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.name} ({teacher.subject})
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
