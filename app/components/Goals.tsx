export default function Goals() {
  const goals = [
    {
      icon: "✈️",
      title: "أسافر",
      text: "رحلات سياحية، حجوزات فنادق، استقبال وبرامج داخل الصين.",
    },
    {
      icon: "🎓",
      title: "أدرس",
      text: "قبول جامعي، منح دراسية، سكن واستشارات تعليمية.",
    },
    {
      icon: "🀄",
      title: "أتعلم الصينية",
      text: "دورات لغة صينية، HSK، ومحادثة مع مدرسين.",
    },
    {
      icon: "📦",
      title: "أتاجر",
      text: "استيراد، شحن، تفاوض مع الموردين ومتابعة الطلبات.",
    },
    {
      icon: "🏭",
      title: "أبحث عن مصنع",
      text: "إيجاد أفضل المصانع والموردين في الصين.",
    },
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-5xl font-bold text-center mb-4">
          وش هدفك من الصين؟
        </h2>

        <p className="text-gray-600 text-center mb-16 text-lg">
          اختر المسار المناسب، وسنساعدك من البداية حتى النهاية.
        </p>

        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">

          {goals.map((goal, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition p-8 text-center hover:-translate-y-2"
            >
              <div className="text-5xl mb-6">
                {goal.icon}
              </div>

              <h3 className="text-2xl font-bold mb-3">
                {goal.title}
              </h3>

              <p className="text-gray-600 leading-8">
                {goal.text}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}