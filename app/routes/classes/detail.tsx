import { useParams, Link } from "react-router";
import { Layout } from "~/components/Layout";
import { PageHeader } from "~/components/PageHeader";
import { PrintIcon, ChevronRightIcon } from "~/components/Icons";
import { getClassById, getTeacherById, getStudentsByClass, getClubById } from "~/data/mockData";

export function meta() {
  return [{ title: "クラス詳細 - スクールライフ" }];
}

export default function ClassDetail() {
  const { id } = useParams();
  const cls = getClassById(id!);
  const teacher = cls ? getTeacherById(cls.teacherId) : undefined;
  const students = cls ? getStudentsByClass(cls.id) : [];

  if (!cls) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900">
            クラスが見つかりません
          </h1>
          <Link to="/classes" className="text-primary-600 hover:text-primary-800 mt-4 inline-block">
            クラス一覧に戻る
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
        title={cls.name}
        subtitle={`${cls.grade}年`}
        backLink="/classes"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 基本情報 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary-400"></span>
            基本情報
          </h2>
          <dl className="space-y-4">
            <div className="flex justify-between items-center">
              <dt className="text-gray-500 text-sm">名称</dt>
              <dd className="text-gray-900 font-semibold">{cls.name}</dd>
            </div>
            <div className="flex justify-between items-center">
              <dt className="text-gray-500 text-sm">学年</dt>
              <dd>
                <span className="bg-[#E6D72A]/20 text-yellow-700 px-3 py-1 rounded-full text-xs font-medium">
                  {cls.grade}年
                </span>
              </dd>
            </div>
            <div className="flex justify-between items-center">
              <dt className="text-gray-500 text-sm">生徒数</dt>
              <dd>
                <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-xs font-medium">
                  {students.length}名
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

        {/* 担任情報 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#98DBC6]"></span>
            担任教員
          </h2>
          {teacher ? (
            <Link
              to={`/teachers/${teacher.id}`}
              className="block p-4 bg-gradient-to-r from-gray-50 to-primary-50/30 rounded-xl hover:from-primary-50 hover:to-primary-100/50 transition-all group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#98DBC6] to-primary-400 rounded-full flex items-center justify-center shadow-md">
                    <span className="text-lg font-bold text-white">
                      {teacher.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 group-hover:text-primary-700">{teacher.name}</p>
                    <span className="inline-block bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs font-medium mt-1">
                      {teacher.subject}
                    </span>
                    <p className="text-xs text-gray-400 mt-1">{teacher.phone}</p>
                  </div>
                </div>
                <ChevronRightIcon className="w-4 h-4 text-gray-400 group-hover:text-primary-500 group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          ) : (
            <p className="text-gray-500 text-center py-8">担任未設定</p>
          )}
        </div>

        {/* 生徒一覧 */}
        <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#F18D9E]"></span>
            生徒一覧
            <span className="ml-auto bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-xs font-medium">
              {students.length}名
            </span>
          </h2>
          {students.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {students.map((student) => {
                const clubNames = student.clubIds
                  .map((id) => getClubById(id)?.name)
                  .filter(Boolean)
                  .join(", ");
                return (
                  <Link
                    key={student.id}
                    to={`/students/${student.id}`}
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-primary-50/30 rounded-xl hover:from-primary-50 hover:to-primary-100/50 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-500 rounded-full flex items-center justify-center shadow-md">
                        <span className="text-sm font-bold text-white">
                          {student.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 group-hover:text-primary-700">{student.name}</p>
                        {clubNames && (
                          <p className="text-xs text-gray-500 truncate max-w-[150px]">{clubNames}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs px-3 py-1 rounded-full font-medium ${
                          student.grade === "A"
                            ? "bg-primary-100 text-primary-700"
                            : student.grade === "B"
                            ? "bg-[#E6D72A]/20 text-yellow-700"
                            : "bg-[#F18D9E]/20 text-[#F18D9E]"
                        }`}
                      >
                        {student.grade}
                      </span>
                      <ChevronRightIcon className="w-4 h-4 text-gray-400 group-hover:text-primary-500 group-hover:translate-x-1 transition-all" />
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">生徒がいません</p>
          )}
        </div>
      </div>
    </Layout>
  );
}
