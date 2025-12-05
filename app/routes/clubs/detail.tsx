import { useParams, Link } from "react-router";
import { Layout } from "~/components/Layout";
import { PageHeader } from "~/components/PageHeader";
import { PrintIcon, ChevronRightIcon } from "~/components/Icons";
import { getClubById, getStudentsByClub, getClassById } from "~/data/mockData";

export function meta() {
  return [{ title: "部活動詳細 - スクールライフ" }];
}

export default function ClubDetail() {
  const { id } = useParams();
  const club = getClubById(id!);
  const members = club ? getStudentsByClub(club.id) : [];

  if (!club) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900">
            部活動が見つかりません
          </h1>
          <Link to="/clubs" className="text-primary-600 hover:text-primary-800 mt-4 inline-block">
            部活動一覧に戻る
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
      <PageHeader title={club.name} subtitle={club.category} backLink="/clubs" />

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
              <dd className="text-gray-900 font-semibold">{club.name}</dd>
            </div>
            <div className="flex justify-between items-center">
              <dt className="text-gray-500 text-sm">カテゴリー</dt>
              <dd>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  club.category === '運動部'
                    ? 'bg-primary-100 text-primary-700'
                    : 'bg-[#F18D9E]/20 text-[#F18D9E]'
                }`}>
                  {club.category}
                </span>
              </dd>
            </div>
            <div className="flex justify-between items-center">
              <dt className="text-gray-500 text-sm">部員数</dt>
              <dd>
                <span className="bg-[#E6D72A]/20 text-yellow-700 px-3 py-1 rounded-full text-xs font-medium">
                  {club.studentCount}名
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

        {/* 部員一覧 */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#98DBC6]"></span>
            部員一覧
            <span className="ml-auto bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-xs font-medium">
              {members.length}名
            </span>
          </h2>
          {members.length > 0 ? (
            <div className="space-y-2">
              {members.map((student) => {
                const studentClass = getClassById(student.classId);
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
                        <p className="text-xs text-gray-500">{studentClass?.name}</p>
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
                        成績 {student.grade}
                      </span>
                      <ChevronRightIcon className="w-4 h-4 text-gray-400 group-hover:text-primary-500 group-hover:translate-x-1 transition-all" />
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">部員がいません</p>
          )}
        </div>
      </div>
    </Layout>
  );
}
