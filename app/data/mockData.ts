import type { Club, Student, Class, Teacher, Event } from '~/types';

// 教員データ
export const teachers: Teacher[] = [
  { id: 't1', name: '山田太郎', phone: '090-1234-5678', subject: '数学' },
  { id: 't2', name: '鈴木花子', phone: '090-2345-6789', subject: '国語' },
  { id: 't3', name: '佐藤一郎', phone: '090-3456-7890', subject: '英語' },
  { id: 't4', name: '田中美咲', phone: '090-4567-8901', subject: '理科' },
  { id: 't5', name: '高橋健一', phone: '090-5678-9012', subject: '社会' },
  { id: 't6', name: '伊藤由美', phone: '090-6789-0123', subject: '音楽' },
  { id: 't7', name: '渡辺誠', phone: '090-7890-1234', subject: '体育' },
  { id: 't8', name: '小林直子', phone: '090-8901-2345', subject: '美術' },
];

// 組データ
export const classes: Class[] = [
  { id: 'c1', name: '1年A組', grade: 1, teacherId: 't1' },
  { id: 'c2', name: '1年B組', grade: 1, teacherId: 't2' },
  { id: 'c3', name: '2年A組', grade: 2, teacherId: 't3' },
  { id: 'c4', name: '2年B組', grade: 2, teacherId: 't4' },
  { id: 'c5', name: '3年A組', grade: 3, teacherId: 't5' },
  { id: 'c6', name: '3年B組', grade: 3, teacherId: 't6' },
];

// 部データ
export const clubs: Club[] = [
  { id: 'cl1', name: 'サッカー部', category: '運動部', studentCount: 25 },
  { id: 'cl2', name: 'バスケットボール部', category: '運動部', studentCount: 18 },
  { id: 'cl3', name: '野球部', category: '運動部', studentCount: 22 },
  { id: 'cl4', name: 'テニス部', category: '運動部', studentCount: 16 },
  { id: 'cl5', name: '吹奏楽部', category: '文化部', studentCount: 30 },
  { id: 'cl6', name: '美術部', category: '文化部', studentCount: 12 },
  { id: 'cl7', name: '科学部', category: '文化部', studentCount: 8 },
  { id: 'cl8', name: '演劇部', category: '文化部', studentCount: 15 },
  { id: 'cl9', name: '書道部', category: '文化部', studentCount: 10 },
  { id: 'cl10', name: '陸上部', category: '運動部', studentCount: 20 },
];

// 生徒データ
export const students: Student[] = [
  { id: 's1', name: '青木翔太', grade: 'A', classId: 'c1', clubIds: ['cl1'] },
  { id: 's2', name: '石井優花', grade: 'B', classId: 'c1', clubIds: ['cl5'] },
  { id: 's3', name: '上田健太', grade: 'A', classId: 'c1', clubIds: ['cl2'] },
  { id: 's4', name: '遠藤美月', grade: 'C', classId: 'c1', clubIds: ['cl6'] },
  { id: 's5', name: '岡本大輝', grade: 'B', classId: 'c2', clubIds: ['cl3'] },
  { id: 's6', name: '加藤さくら', grade: 'A', classId: 'c2', clubIds: ['cl5', 'cl8'] },
  { id: 's7', name: '木村陽斗', grade: 'B', classId: 'c2', clubIds: ['cl1'] },
  { id: 's8', name: '黒田愛', grade: 'A', classId: 'c2', clubIds: ['cl7'] },
  { id: 's9', name: '斎藤蓮', grade: 'C', classId: 'c3', clubIds: ['cl4'] },
  { id: 's10', name: '島田凛', grade: 'B', classId: 'c3', clubIds: ['cl5'] },
  { id: 's11', name: '杉山悠真', grade: 'A', classId: 'c3', clubIds: ['cl2', 'cl7'] },
  { id: 's12', name: '高木結菜', grade: 'B', classId: 'c3', clubIds: ['cl8'] },
  { id: 's13', name: '谷口海斗', grade: 'A', classId: 'c4', clubIds: ['cl3'] },
  { id: 's14', name: '中山心春', grade: 'C', classId: 'c4', clubIds: ['cl6'] },
  { id: 's15', name: '西村颯太', grade: 'B', classId: 'c4', clubIds: ['cl10'] },
  { id: 's16', name: '野口芽依', grade: 'A', classId: 'c4', clubIds: ['cl5'] },
  { id: 's17', name: '橋本陸', grade: 'B', classId: 'c5', clubIds: ['cl1', 'cl10'] },
  { id: 's18', name: '原田葵', grade: 'A', classId: 'c5', clubIds: ['cl9'] },
  { id: 's19', name: '平野大和', grade: 'C', classId: 'c5', clubIds: ['cl4'] },
  { id: 's20', name: '福田彩花', grade: 'B', classId: 'c5', clubIds: ['cl5'] },
  { id: 's21', name: '松本奏', grade: 'A', classId: 'c6', clubIds: ['cl2'] },
  { id: 's22', name: '三浦詩', grade: 'B', classId: 'c6', clubIds: ['cl8'] },
  { id: 's23', name: '村上湊', grade: 'A', classId: 'c6', clubIds: ['cl3'] },
  { id: 's24', name: '森永莉子', grade: 'C', classId: 'c6', clubIds: ['cl6', 'cl9'] },
];

// イベントデータ（2025年度）
export const events: Event[] = [
  { id: 'e1', name: '期末テスト', date: '2025-11-28', description: '2学期期末試験開始' },
  { id: 'e2', name: '期末テスト最終日', date: '2025-12-02', description: '2学期期末試験終了' },
  { id: 'e3', name: '三者面談', date: '2025-12-05', description: '保護者・生徒・担任による面談週間' },
  { id: 'e4', name: '冬休み開始', date: '2025-12-23', description: '冬季休業開始日' },
  { id: 'e5', name: 'クリスマス会', date: '2025-12-25', description: '生徒会主催のクリスマスイベント' },
  { id: 'e6', name: '冬休み終了', date: '2026-01-07', description: '3学期始業式' },
  { id: 'e7', name: '書き初め大会', date: '2026-01-10', description: '全校生徒参加の書き初め' },
  { id: 'e8', name: '学年末テスト', date: '2026-02-20', description: '3学期学年末試験' },
  { id: 'e9', name: '卒業式', date: '2026-03-15', description: '3年生の卒業を祝う式典' },
  { id: 'e10', name: '修了式', date: '2026-03-24', description: '1・2年生の修了式' },
  { id: 'e11', name: '部活動合同練習', date: '2025-11-30', description: '運動部合同トレーニング' },
  { id: 'e12', name: '保護者会', date: '2025-12-10', description: '2学期末保護者会' },
  { id: 'e13', name: '文化部発表会', date: '2025-12-15', description: '吹奏楽部・演劇部の発表会' },
  { id: 'e14', name: '大掃除', date: '2025-12-22', description: '年末大掃除' },
  { id: 'e15', name: '入学式', date: '2026-04-08', description: '新入生の入学を祝う式典' },
];

// ヘルパー関数
export function getTeacherById(id: string): Teacher | undefined {
  return teachers.find(t => t.id === id);
}

export function getClassById(id: string): Class | undefined {
  return classes.find(c => c.id === id);
}

export function getClubById(id: string): Club | undefined {
  return clubs.find(c => c.id === id);
}

export function getStudentById(id: string): Student | undefined {
  return students.find(s => s.id === id);
}

export function getEventById(id: string): Event | undefined {
  return events.find(e => e.id === id);
}

export function getStudentsByClass(classId: string): Student[] {
  return students.filter(s => s.classId === classId);
}

export function getStudentsByClub(clubId: string): Student[] {
  return students.filter(s => s.clubIds.includes(clubId));
}

export function getTeacherByClass(classId: string): Teacher | undefined {
  const cls = getClassById(classId);
  return cls ? getTeacherById(cls.teacherId) : undefined;
}
