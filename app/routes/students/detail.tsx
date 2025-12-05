import { useParams, Link } from "react-router";
import { Layout } from "~/components/Layout";
import { PageHeader } from "~/components/PageHeader";
import { PrintIcon, ChevronRightIcon } from "~/components/Icons";
import { getStudentById, getClassById, getClubById, getTeacherByClass } from "~/data/mockData";

export function meta() {
  return [{ title: "生徒詳細 - スクールライフ" }];
}

export default function StudentDetail() {
  const { id } = useParams();
  const student = getStudentById(id!);
  const studentClass = student ? getClassById(student.classId) : undefined;
  const classTeacher = studentClass ? getTeacherByClass(studentClass.id) : undefined;
  const studentClubs = student
    ? student.clubIds.map((clubId) => getClubById(clubId)).filter(Boolean)
    : [];

  if (!student) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900">
            生徒が見つかりません
          </h1>
          <Link to="/students" className="text-primary-600 hover:text-primary-800 mt-4 inline-block">
            生徒一覧に戻る
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
        title={student.name}
        subtitle={studentClass?.name}
        backLink="/students"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 基本情報 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary-400"></span>
            基本情報
          </h2>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-500 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-2xl font-bold text-white">
                {student.name.charAt(0)}
              </span>
            </div>
            <div>
              <p className="text-xl font-bold text-gray-800">{student.name}</p>
              <span
                className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-medium ${
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
          </div>
          <dl className="space-y-4">
            <div className="flex justify-between items-center">
              <dt className="text-gray-500 text-sm">氏名</dt>
              <dd className="text-gray-900 font-semibold">{student.name}</dd>
            </div>
            <div className="flex justify-between items-center">
              <dt className="text-gray-500 text-sm">成績</dt>
              <dd>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    student.grade === "A"
                      ? "bg-primary-100 text-primary-700"
                      : student.grade === "B"
                      ? "bg-[#E6D72A]/20 text-yellow-700"
                      : "bg-[#F18D9E]/20 text-[#F18D9E]"
                  }`}
                >
                  {student.grade}
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

        {/* クラス情報 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#98DBC6]"></span>
            所属クラス
          </h2>
          {studentClass ? (
            <Link
              to={`/classes/${studentClass.id}`}
              className="block p-4 bg-gradient-to-r from-gray-50 to-primary-50/30 rounded-xl hover:from-primary-50 hover:to-primary-100/50 transition-all group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#98DBC6] to-primary-400 rounded-full flex items-center justify-center shadow-md">
                    <span className="text-sm font-bold text-white">
                      {studentClass.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 group-hover:text-primary-700">{studentClass.name}</p>
                    <p className="text-xs text-gray-500">{studentClass.grade}年</p>
                    {classTeacher && (
                      <p className="text-xs text-gray-400">
                        担任: {classTeacher.name}
                      </p>
                    )}
                  </div>
                </div>
                <ChevronRightIcon className="w-4 h-4 text-gray-400 group-hover:text-primary-500 group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          ) : (
            <p className="text-gray-500 text-center py-8">クラス未所属</p>
          )}
        </div>

        {/* 部活動 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#F18D9E]"></span>
            所属部活動
            <span className="ml-auto bg-[#F18D9E]/20 text-[#F18D9E] px-3 py-1 rounded-full text-xs font-medium">
              {studentClubs.length}件
            </span>
          </h2>
          {studentClubs.length > 0 ? (
            <div className="space-y-2">
              {studentClubs.map((club) => (
                <Link
                  key={club!.id}
                  to={`/clubs/${club!.id}`}
                  className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-[#F18D9E]/10 rounded-xl hover:from-[#F18D9E]/10 hover:to-[#F18D9E]/20 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-[#F18D9E] to-pink-400 rounded-full flex items-center justify-center shadow-sm">
                      <span className="text-xs font-bold text-white">
                        {club!.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 group-hover:text-[#F18D9E]">{club!.name}</p>
                      <p className="text-xs text-gray-500">{club!.category}</p>
                    </div>
                  </div>
                  <ChevronRightIcon className="w-4 h-4 text-gray-400 group-hover:text-[#F18D9E] group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">部活動未所属</p>
          )}
        </div>
      </div>
    </Layout>
  );
}
