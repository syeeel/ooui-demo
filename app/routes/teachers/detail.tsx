import { useParams, Link } from "react-router";
import { Layout } from "~/components/Layout";
import { PageHeader } from "~/components/PageHeader";
import { PrintIcon, ChevronRightIcon, PhoneIcon } from "~/components/Icons";
import { getTeacherById, classes, getStudentsByClass } from "~/data/mockData";

export function meta() {
  return [{ title: "教員詳細 - スクールライフ" }];
}

export default function TeacherDetail() {
  const { id } = useParams();
  const teacher = getTeacherById(id!);
  const assignedClasses = teacher
    ? classes.filter((c) => c.teacherId === teacher.id)
    : [];

  if (!teacher) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900">
            教員が見つかりません
          </h1>
          <Link to="/teachers" className="text-primary-600 hover:text-primary-800 mt-4 inline-block">
            教員一覧に戻る
          </Link>
        </div>
      </Layout>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <Layout>
      <PageHeader
        title={teacher.name}
        subtitle={teacher.subject}
        backLink="/teachers"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 基本情報 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary-400"></span>
            基本情報
          </h2>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-primary-400 to-primary-500 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-3xl font-bold text-white">
                {teacher.name.charAt(0)}
              </span>
            </div>
            <div>
              <p className="text-xl font-bold text-gray-800">{teacher.name}</p>
              <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium mt-1">
                {teacher.subject}
              </span>
            </div>
          </div>
          <dl className="space-y-4 pt-4 border-t border-gray-100">
            <div className="flex justify-between items-center">
              <dt className="text-gray-500 text-sm">氏名</dt>
              <dd className="text-gray-900 font-semibold">{teacher.name}</dd>
            </div>
            <div className="flex justify-between items-center">
              <dt className="text-gray-500 text-sm">電話番号</dt>
              <dd className="flex items-center gap-2">
                <PhoneIcon className="w-4 h-4 text-gray-400" />
                <span className="text-gray-900 font-medium">{teacher.phone}</span>
              </dd>
            </div>
            <div className="flex justify-between items-center">
              <dt className="text-gray-500 text-sm">担当教科</dt>
              <dd>
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                  {teacher.subject}
                </span>
              </dd>
            </div>
          </dl>
          <div className="mt-6 pt-4 border-t border-gray-100">
            <button
              onClick={handlePrint}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#E6D72A] to-yellow-400 text-yellow-900 rounded-xl hover:from-yellow-400 hover:to-yellow-500 transition-all font-medium text-sm"
            >
              <PrintIcon className="w-4 h-4" />
              印刷
            </button>
          </div>
        </div>

        {/* 担任クラス */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#98DBC6]"></span>
            担任クラス
            <span className="ml-auto bg-[#98DBC6]/30 text-primary-700 px-3 py-1 rounded-full text-xs font-medium">
              {assignedClasses.length}件
            </span>
          </h2>
          {assignedClasses.length > 0 ? (
            <div className="space-y-4">
              {assignedClasses.map((cls) => {
                const students = getStudentsByClass(cls.id);
                return (
                  <Link
                    key={cls.id}
                    to={`/classes/${cls.id}`}
                    className="block p-4 bg-gradient-to-r from-gray-50 to-primary-50/30 rounded-xl hover:from-primary-50 hover:to-primary-100/50 transition-all group"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#98DBC6] to-primary-400 rounded-full flex items-center justify-center shadow-md">
                          <span className="text-sm font-bold text-white">
                            {cls.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800 group-hover:text-primary-700">{cls.name}</p>
                          <p className="text-xs text-gray-500">{cls.grade}年</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-xs font-medium">
                          {students.length}名
                        </span>
                        <ChevronRightIcon className="w-4 h-4 text-gray-400 group-hover:text-primary-500 group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {students.slice(0, 6).map((student) => (
                        <span
                          key={student.id}
                          className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                        >
                          {student.name}
                        </span>
                      ))}
                      {students.length > 6 && (
                        <span className="text-xs text-gray-400 px-2 py-1">
                          +{students.length - 6}名
                        </span>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">担任クラスがありません</p>
          )}
        </div>
      </div>
    </Layout>
  );
}
