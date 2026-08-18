"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Member = {
  id: string;
  email: string | null;
  full_name: string | null;
  phone: string | null;
  role: string | null;
};

const roleLabels: Record<string, string> = {
  executive: "المدير التنفيذي",
  admin: "مدير النظام",
  developer: "المبرمج",
  designer: "المصمم",
  editor: "المحرر",
  support: "الدعم",
  member: "عضو الفريق",
};

export default function TeamMembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("member");
  const [password, setPassword] = useState("");

  useEffect(() => {
    loadMembers();
  }, []);

  async function loadMembers() {
    try {
      const response = await fetch("/api/team/members");

      if (!response.ok) {
        setMessage("تعذر تحميل أعضاء الفريق.");
        return;
      }

      const data = await response.json();
      setMembers(data.members || []);
    } catch {
      setMessage("تعذر الاتصال بالخادم.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    if (!fullName.trim() || !email.trim() || !password) {
      setMessage("أكمل الاسم والبريد الإلكتروني وكلمة المرور.");
      return;
    }

    if (password.length < 8) {
      setMessage("كلمة المرور يجب أن تكون 8 أحرف على الأقل.");
      return;
    }

    setSaving(true);

    try {
      const response = await fetch("/api/team/members", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_name: fullName,
          email,
          phone,
          role,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.error || "تعذر إضافة العضو.");
        return;
      }

      setMembers((current) => [
        {
          id: data.member.id,
          email: data.member.email,
          full_name: data.member.full_name,
          phone: data.member.phone,
          role: data.member.role,
        },
        ...current,
      ]);

      setFullName("");
      setEmail("");
      setPhone("");
      setRole("member");
      setPassword("");
      setShowForm(false);
      setMessage("تمت إضافة عضو الفريق بنجاح.");
    } catch {
      setMessage("حدث خطأ أثناء إضافة العضو.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(member: Member) {
    const memberName =
      member.full_name || member.email || "هذا العضو";

    const confirmed = window.confirm(
      "هل أنت متأكد من حذف " +
        memberName +
        "؟\n\nسيتم حذف حسابه نهائيًا ولا يمكن التراجع عن العملية."
    );

    if (!confirmed) {
      return;
    }

    setDeletingId(member.id);
    setMessage("");

    try {
      const response = await fetch("/api/team/members", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: member.id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.error || "تعذر حذف العضو.");
        return;
      }

      setMembers((current) =>
        current.filter((item) => item.id !== member.id)
      );

      setMessage("تم حذف العضو بنجاح.");
    } catch {
      setMessage("حدث خطأ أثناء حذف العضو.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#f7f4ee] text-[#171717]"
    >
      <section className="relative overflow-hidden bg-[#171717]">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-china.png"
            alt=""
            fill
            priority
            className="object-cover opacity-45"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-[#171717]/65 via-[#171717]/60 to-[#171717]" />

        <div className="relative z-10 mx-auto max-w-[1450px] px-5 pb-20 pt-8">
          <div className="flex items-center justify-between gap-5">
            <Link href="/team">
              <Image
                src="/images/china-planet-logo.png"
                alt="China Planet"
                width={180}
                height={65}
                priority
                className="h-[65px] w-[180px] object-contain object-right"
              />
            </Link>

            <div className="flex items-center gap-3">
              <Link
                href="/team"
                className="rounded-full border border-white/20 bg-white/10 px-5 py-3 text-xs font-semibold text-white backdrop-blur-sm transition hover:bg-white/15"
              >
                لوحة الفريق
              </Link>

              <Link
                href="/auth/signout"
                className="rounded-full border border-white/20 bg-white/10 px-5 py-3 text-xs font-semibold text-white backdrop-blur-sm transition hover:border-[#c94a3d] hover:bg-[#c94a3d]"
              >
                تسجيل الخروج
              </Link>
            </div>
          </div>

          <div className="mt-20 max-w-3xl text-white">
            <div className="mb-5 h-[2px] w-10 bg-[#c94a3d]" />

            <p className="text-[11px] font-semibold tracking-[0.35em] text-white/45">
              CHINA PLANET TEAM
            </p>

            <h1 className="mt-5 text-4xl font-bold leading-tight sm:text-5xl">
              إدارة الفريق
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-8 text-white/65">
              إدارة أعضاء فريق كوكب الصين ومتابعة أدوارهم
              وصلاحياتهم من مكان واحد.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1450px] px-5 pb-20">
        <section className="mt-10 rounded-[38px] border border-[#e4ddd5] bg-white p-7 shadow-[0_20px_60px_rgba(40,30,20,0.06)] lg:p-10">
          <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-[2px] w-8 bg-[#c94a3d]" />
                <span className="text-[10px] font-semibold tracking-[0.3em] text-[#a69c93]">
                  TEAM MEMBERS
                </span>
              </div>

              <h2 className="mt-5 text-3xl font-bold text-[#40372f]">
                أعضاء الفريق
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-[#8a8179]">
                إدارة أعضاء فريق كوكب الصين والأدوار والصلاحيات
                المرتبطة بحساباتهم.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setShowForm((value) => !value);
                setMessage("");
              }}
              className="rounded-full bg-[#c94a3d] px-7 py-4 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#aa3b31]"
            >
              {showForm ? "إغلاق النموذج" : "+ إضافة عضو"}
            </button>
          </div>

          {showForm && (
            <div className="mt-10 rounded-[30px] border border-[#e5ded6] bg-[#f8f6f2] p-6 lg:p-8">
              <div className="mb-7">
                <p className="text-[10px] font-semibold tracking-[0.25em] text-[#c94a3d]">
                  NEW TEAM MEMBER
                </p>

                <h3 className="mt-3 text-2xl font-bold text-[#40372f]">
                  إضافة عضو جديد
                </h3>
              </div>

              <form
                onSubmit={handleSubmit}
                className="grid gap-5 md:grid-cols-2"
              >
                <div>
                  <label className="mb-2 block text-xs font-semibold text-[#514840]">
                    الاسم الكامل
                  </label>

                  <input
                    value={fullName}
                    onChange={(event) =>
                      setFullName(event.target.value)
                    }
                    placeholder="مثال: محمد أحمد"
                    className="w-full rounded-2xl border border-[#ddd5cc] bg-white px-4 py-4 text-sm text-[#40372f] outline-none transition focus:border-[#c94a3d]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold text-[#514840]">
                    البريد الإلكتروني
                  </label>

                  <input
                    type="email"
                    dir="ltr"
                    value={email}
                    onChange={(event) =>
                      setEmail(event.target.value)
                    }
                    placeholder="name@example.com"
                    className="w-full rounded-2xl border border-[#ddd5cc] bg-white px-4 py-4 text-left text-sm text-[#40372f] outline-none transition focus:border-[#c94a3d]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold text-[#514840]">
                    رقم الجوال
                  </label>

                  <input
                    type="tel"
                    dir="ltr"
                    value={phone}
                    onChange={(event) =>
                      setPhone(event.target.value)
                    }
                    placeholder="+966..."
                    className="w-full rounded-2xl border border-[#ddd5cc] bg-white px-4 py-4 text-left text-sm text-[#40372f] outline-none transition focus:border-[#c94a3d]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold text-[#514840]">
                    الدور
                  </label>

                  <select
                    value={role}
                    onChange={(event) =>
                      setRole(event.target.value)
                    }
                    className="w-full rounded-2xl border border-[#ddd5cc] bg-white px-4 py-4 text-sm text-[#40372f] outline-none focus:border-[#c94a3d]"
                  >
                    <option value="member">عضو الفريق</option>
                    <option value="developer">المبرمج</option>
                    <option value="designer">المصمم</option>
                    <option value="editor">المحرر</option>
                    <option value="support">الدعم</option>
                    <option value="admin">مدير النظام</option>
                    <option value="executive">المدير التنفيذي</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-xs font-semibold text-[#514840]">
                    كلمة المرور المؤقتة
                  </label>

                  <input
                    type="password"
                    dir="ltr"
                    value={password}
                    onChange={(event) =>
                      setPassword(event.target.value)
                    }
                    placeholder="8 أحرف على الأقل"
                    className="w-full rounded-2xl border border-[#ddd5cc] bg-white px-4 py-4 text-left text-sm text-[#40372f] outline-none transition focus:border-[#c94a3d]"
                  />
                </div>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center md:col-span-2">
                  <button
                    type="submit"
                    disabled={saving}
                    className="rounded-full bg-[#171717] px-8 py-4 text-sm font-semibold text-white transition hover:bg-[#c94a3d] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {saving
                      ? "جاري إنشاء الحساب..."
                      : "إنشاء عضو الفريق"}
                  </button>

                  {message && (
                    <p className="text-sm font-semibold text-[#6f554a]">
                      {message}
                    </p>
                  )}
                </div>
              </form>
            </div>
          )}
        </section>

        {message && !showForm && (
          <div className="mt-6 rounded-2xl border border-[#e4ddd5] bg-white px-6 py-4 text-sm text-[#6f554a]">
            {message}
          </div>
        )}

        <section className="mt-10">
          <div className="overflow-hidden rounded-[32px] border border-[#e4ddd5] bg-white shadow-[0_15px_50px_rgba(40,30,20,0.05)]">
            <div className="hidden grid-cols-[1.5fr_1.1fr_1fr_0.8fr_0.7fr] gap-5 border-b border-[#eee8e2] bg-[#f8f6f2] px-8 py-5 text-[10px] font-bold tracking-[0.15em] text-[#91877e] md:grid">
              <div>العضو</div>
              <div>رقم الجوال</div>
              <div>الدور</div>
              <div>الحالة</div>
              <div>إجراء</div>
            </div>

            {loading ? (
              <div className="p-12 text-center text-sm text-[#8a8179]">
                جاري تحميل أعضاء الفريق...
              </div>
            ) : members.length ? (
              members.map((member) => (
                <div
                  key={member.id}
                  className="grid gap-6 border-b border-[#eee8e2] px-7 py-7 last:border-b-0 md:grid-cols-[1.5fr_1.1fr_1fr_0.8fr_0.7fr] md:items-center md:px-8"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#171717] text-sm font-bold text-white">
                      {(member.full_name ||
                        member.email ||
                        "?")
                        .charAt(0)
                        .toUpperCase()}
                    </div>

                    <div className="min-w-0">
                      <p className="font-bold text-[#40372f]">
                        {member.full_name || "بدون اسم"}
                      </p>

                      <p
                        dir="ltr"
                        className="mt-1 break-all text-xs text-[#9a9087]"
                      >
                        {member.email || "بدون بريد إلكتروني"}
                      </p>
                    </div>
                  </div>

                  <div
                    dir="ltr"
                    className="text-sm text-[#665d56]"
                  >
                    {member.phone || "—"}
                  </div>

                  <div>
                    <span className="inline-flex rounded-full bg-[#f8f1ed] px-4 py-2 text-xs font-semibold text-[#6f554a]">
                      {roleLabels[member.role || ""] ||
                        member.role ||
                        "غير محدد"}
                    </span>
                  </div>

                  <div>
                    <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#4d8060]">
                      <span className="h-2 w-2 rounded-full bg-[#4d8060]" />
                      عضو مسجل
                    </span>
                  </div>

                  <div>
                    <button
                      type="button"
                      onClick={() => handleDelete(member)}
                      disabled={deletingId === member.id}
                      className="rounded-full border border-[#e6c8c3] bg-[#fff7f5] px-4 py-2 text-xs font-semibold text-[#b33e32] transition hover:bg-[#c94a3d] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {deletingId === member.id
                        ? "جاري الحذف..."
                        : "حذف"}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#f8f6f2] text-xl">
                  👥
                </div>

                <h3 className="mt-5 text-lg font-bold text-[#40372f]">
                  لا يوجد أعضاء حتى الآن
                </h3>

                <p className="mt-2 text-sm text-[#8a8179]">
                  أضف أول عضو من زر «إضافة عضو».
                </p>
              </div>
            )}
          </div>
        </section>

        <footer className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-[#e4ddd5] pt-7">
          <p className="text-xs text-[#a69c93]">
            CHINA PLANET · TEAM WORKSPACE
          </p>

          <div className="flex items-center gap-5">
            <Link
              href="/team"
              className="text-xs font-semibold text-[#756c64] transition hover:text-[#c94a3d]"
            >
              لوحة الفريق
            </Link>

            <Link
              href="/"
              className="text-xs font-semibold text-[#756c64] transition hover:text-[#c94a3d]"
            >
              الرئيسية
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
}
