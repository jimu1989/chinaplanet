import Image from "next/image";

export default function WhyUs() {
  return (
    <section
      id="why-us"
      className="cp-section bg-[#f3f0eb]"
    >
      <div className="cp-container">
        <div className="mx-auto max-w-4xl text-center">

          {/* CONTENT */}
          <div className="mx-auto max-w-3xl">
            <div className="mb-6 flex justify-center">
              <Image
                src="/images/china-planet-logo.png"
                alt="China Planet"
                width={150}
                height={55}
                className="h-auto w-[150px] object-contain"
              />
            </div>

            <div className="flex items-center justify-center gap-3">
              <span className="cp-line" />

              <span className="cp-label">
                لماذا كوكب الصين؟
              </span>
            </div>

            <h2 className="mt-6 text-3xl font-medium leading-[1.35] tracking-tight text-[#40372f] sm:text-4xl lg:text-[46px]">
              خبرة تعرف الصين.
              <br />
              وثقة تفتح لك الطريق.
            </h2>

            <p className="mt-7 text-sm leading-8 text-[#756b62] sm:text-base">
              نفهم احتياجات العميل العربي ونفهم طبيعة
              السوق الصيني، لنحوّل الوصول إلى الصين
              إلى تجربة أوضح، أسهل، وأكثر موثوقية.
            </p>

            <div className="mt-9 flex items-center justify-center gap-4">
              <a
                href="#contact"
                className="cp-button"
              >
                تعرف علينا أكثر
              </a>

              <span className="text-[10px] tracking-[0.18em] text-[#a3978d]">
                SAUDI ARABIA × CHINA
              </span>
            </div>
          </div>

          {/* IMAGE */}
          <div className="relative mt-16 aspect-[5/4] overflow-hidden rounded-2xl">
            <Image
              src="/cities/chengdu.jpg"
              alt="منظر من الصين"
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover transition-transform duration-700 hover:scale-[1.025]"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/5" />

            <div className="absolute bottom-5 right-5">
              <div className="rounded-full border border-white/30 bg-black/20 px-4 py-2 text-[9px] font-semibold tracking-[0.22em] text-white backdrop-blur-md">
                CHINA PLANET
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}