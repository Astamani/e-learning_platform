import { getServerSession } from "next-auth";
import { authOptions } from "@/components/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/students/dashboard`,
    {
      headers: {
        Authorization: `Bearer ${session.user.token}`,
      },
      cache: "no-store",
    }
  );

  const data = await res.json();

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">Welcome {session.user.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.enrolledCourses.map((course: any) => (
          <div
            key={course.id}
            className="border rounded-2xl shadow-md p-6 space-y-4 bg-white dark:bg-zinc-900"
          >
            <h2 className="text-xl font-semibold">{course.title}</h2>
            <p>{course.description}</p>
            <p className="text-sm text-gray-500">
              Progress: {course.completedLessons}/{course.totalLessons}
            </p>

            <div className="flex gap-3">
              <a
                href={`/courses/${course.id}/lessons`}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Continue
              </a>

              {course.completedLessons === course.totalLessons && (
                <a
                  href={`${process.env.NEXT_PUBLIC_API_URL}/certificates/${course.id}`}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg"
                  target="_blank"
                >
                  Get Certificate
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
