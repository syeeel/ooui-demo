import { useState } from "react";
import { Link } from "react-router";
import { Layout } from "~/components/Layout";
import { PageHeader } from "~/components/PageHeader";
import { Modal } from "~/components/Modal";
import { PlusIcon, PhoneIcon } from "~/components/Icons";
import { teachers, classes } from "~/data/mockData";
import type { Teacher } from "~/types";

// 教員のアバター色をランダムに決定するための配列
const avatarColors = [
  "from-primary-400 to-primary-500",
  "from-[#98DBC6] to-primary-400",
  "from-[#F18D9E] to-pink-400",
  "from-[#E6D72A] to-yellow-400",
  "from-blue-400 to-blue-500",
  "from-purple-400 to-purple-500",
  "from-orange-400 to-orange-500",
  "from-teal-400 to-teal-500",
];

// 教員IDからアバター色を取得
const getAvatarColor = (id: string) => {
  const index = parseInt(id.replace(/\D/g, '')) % avatarColors.length;
  return avatarColors[index];
};

export function meta() {
  return [{ title: "教員一覧 - スクールライフ" }];
}

export default function TeachersIndex() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [teacherList, setTeacherList] = useState(teachers);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    subject: "",
  });

  const handleCreate = () => {
    const newTeacher: Teacher = {
      id: `t${Date.now()}`,
      name: formData.name,
      phone: formData.phone,
      subject: formData.subject,
    };
    setTeacherList([...teacherList, newTeacher]);
    setFormData({ name: "", phone: "", subject: "" });
    setIsModalOpen(false);
  };

  return (
    <Layout>
      <PageHeader
        title="教員"
        subtitle={`${teacherList.length}名の教員`}
      />

      {/* アクションバー */}
      <div className="mb-6">
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-turquoise rounded-full hover:bg-turquoise/5 transition-all shadow-soft hover:shadow-soft-lg text-sm font-medium"
        >
          <PlusIcon className="w-4 h-4 text-turquoise" />
          <span className="text-turquoise">新規作成</span>
        </button>
      </div>

      {/* 教員カードグリッド */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {teacherList.map((teacher) => {
          const assignedClass = classes.find((c) => c.teacherId === teacher.id);

          return (
            <Link
              key={teacher.id}
              to={`/teachers/${teacher.id}`}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-lg hover:scale-105 transition-all group"
            >
              {/* アバター */}
              <div className="flex justify-center mb-4">
                <div className={`w-20 h-20 bg-gradient-to-br ${getAvatarColor(teacher.id)} rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow`}>
                  <span className="text-2xl font-bold text-white">
                    {teacher.name.charAt(0)}
                  </span>
                </div>
              </div>

              {/* 名前 */}
              <h3 className="text-center font-bold text-gray-800 group-hover:text-primary-600 transition-colors">
                {teacher.name}
              </h3>

              {/* 担当教科 */}
              <div className="flex justify-center mt-2">
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                  {teacher.subject}
                </span>
              </div>

              {/* 担任クラス */}
              {assignedClass && (
                <div className="flex justify-center mt-2">
                  <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-xs font-medium">
                    {assignedClass.name} 担任
                  </span>
                </div>
              )}

              {/* 電話番号 */}
              <div className="flex items-center justify-center gap-1 mt-3 text-gray-400 text-xs">
                <PhoneIcon className="w-3 h-3" />
                <span>{teacher.phone}</span>
              </div>
            </Link>
          );
        })}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="教員を新規作成"
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
              電話番号
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all"
              placeholder="090-0000-0000"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              担当教科
            </label>
            <input
              type="text"
              value={formData.subject}
              onChange={(e) =>
                setFormData({ ...formData, subject: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all"
              placeholder="例: 数学"
              required
            />
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
