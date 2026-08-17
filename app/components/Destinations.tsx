import Image from "next/image";

const cities = [
  {
    name: "بكين",
    english: "BEIJING",
    image: "/cities/beijing.jpg",
    description: "التاريخ، الثقافة، والقلب السياسي للصين.",
  },
  {
    name: "شنغهاي",
    english: "SHANGHAI",
    image: "/cities/shanghai.jpg",
    description: "الحداثة، الأعمال، وأفق المدينة العالمي.",
  },
  {
    name: "شنتشن",
    english: "SHENZHEN",
    image: "/cities/shenzhen.jpg",
    description: "التقنية، الابتكار، وفرص الأعمال المستقبلية.",
  },
  {
    name: "قوانغتشو",
    english: "GUANGZHOU",
    image: "/cities/guangzhou.jpg",
    description: "التجارة، المعارض، والأسواق العالمية.",
  },
  {
    name: "تشنغدو",
    english: "CHENGDU",
    image: "/cities/chengdu.jpg",
    description: "تجربة مختلفة تجمع الطبيعة والثقافة والحياة العصرية.",
  },
];

export default function Destinations() {
  return (
    <section
      id="destinations"
      className="cp-section bg-[#f8f6f2]"
    >
      <div className="cp-container">
        {/* HEADER */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="cp-line" />

            <span className="cp-label">
              وجهات مختارة
            </span>

            <span className="cp-line" />
          </div>

          <h2 className="mt-5 text-3xl font-medium text-[#40372f] sm:text-4xl lg:text-[42px]">
            الصين كما لم ترها من قبل
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#786e65]">
            اختر المدينة التي تناسب رحلتك، عملك، دراستك
            أو تجربتك القادمة.
          </p>
        </div>

        {/* CITIES */}
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {cities.map((city) => (
            <article
              key={city.english}
              className="group overflow-hidden rounded-2xl bg-[#fffdf9] shadow-[0_8px_28px_rgba(70,55,45,0.05)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(70,55,45,0.09)]"
            >
              {/* IMAGE */}
              <div className="relative aspect-[0.82] overflow-hidden">
                <Image
                  src={city.image}
                  alt={city.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

                <div className="absolute bottom-4 right-4 left-4">
                  <span className="text-[9px] font-semibold tracking-[0.24em] text-white/75">
                    {city.english}
                  </span>

                  <div className="mt-1 text-lg font-semibold text-white">
                    {city.name}
                  </div>
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-5">
                <div className="mb-4 h-px w-7 bg-[#d8795e] transition-all duration-300 group-hover:w-11" />

                <p className="text-xs leading-6 text-[#786e65]">
                  {city.description}
                </p>

                <a
                  href="#contact"
                  className="mt-5 inline-flex items-center gap-2 text-[11px] font-semibold text-[#514840] transition-colors duration-300 hover:text-[#d8795e]"
                >
                  اكتشف المزيد
                  <span className="text-[#d8795e] transition-transform duration-300 group-hover:-translate-x-1">
                    ←
                  </span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}