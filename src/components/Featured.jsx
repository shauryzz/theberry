"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { LuArrowUpRight } from "react-icons/lu";
import {
  LOCATIONS,
  UPCOMING_LOCATIONS,
  getAllLocationsMapEmbedUrl,
} from "../data/locations";

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const lineUp = {
  hidden: { y: "105%" },
  show: {
    y: "0%",
    transition: {
      duration: 1,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const cardUp = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function LocationCard({ loc }) {
  return (
    <motion.div variants={cardUp}>
      <Link
        href={`/locations/${loc.id}`}
        className="group relative block cursor-pointer"
      >
        <div
          className="
            relative
            overflow-hidden
            rounded-2xl
            aspect-[4/3]
            lg:aspect-[18/14]
            transition-all
            duration-500
            hover:-translate-y-2
            hover:shadow-[0_26px_60px_-20px_rgba(10,10,10,0.3)]
          "
        >
          <img
            decoding="async"
            src={loc.img}
            alt={loc.label}
            className="
              w-full
              h-full
              object-cover
              transition-transform
              duration-[1200ms]
              ease-[cubic-bezier(0.22,1,0.36,1)]
              group-hover:scale-[1.05]
            "
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/45 to-transparent" />

          <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 md:p-8 flex flex-col gap-2.5">
            <h3
              className='font-["Founders_Grotesk"] font-bold text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[0.95] uppercase'
            >
              {loc.label}
            </h3>

            {loc.area && (
              <span className="-mt-1 font-['Founders_Grotesk'] text-sm sm:text-base md:text-lg text-[#fafaf7]/70">
                {loc.area}
              </span>
            )}

            <p className="font-['NeueMontreal'] text-white/75 text-sm sm:text-base leading-relaxed line-clamp-2 max-w-[58ch]">
              {loc.desc}
            </p>

            <div className="flex items-center gap-2 mt-1">
              <span
                className="
                  font-['NeueMontreal']
                  text-xs
                  tracking-[0.2em]
                  uppercase
                  text-[#fafaf7]
                  border-b
                  border-[#fafaf7]/45
                  pb-0.5
                  group-hover:text-[#FF6700]
                  group-hover:border-[#FF6700]
                  transition-colors
                  duration-300
                "
              >
                Explore
              </span>

              <LuArrowUpRight
                className="
                  w-4
                  h-4
                  text-[#fafaf7]
                  group-hover:text-[#FF6700]
                  transition-all
                  duration-300
                  group-hover:rotate-45
                "
              />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function ComingSoonCard({ loc }) {
  return (
    <motion.div variants={cardUp}>
      <div className="relative block cursor-default select-none">
        <div
          className="
            relative
            overflow-hidden
            rounded-2xl
            aspect-[4/3]
            lg:aspect-[18/14]
            transition-all
            duration-500
          "
        >
          <img
            decoding="async"
            src={loc.img}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/90 via-[#0a0a0a]/35 to-transparent" />

          <span
            className="
              absolute
              top-4
              left-4
              sm:top-5
              sm:left-5
              inline-flex
              items-center
              gap-2
              px-3.5
              py-1.5
              rounded-full
              bg-[#fafaf7]
              text-[#0a0a0a]
              font-['Founders_Grotesk']
              text-xs
              sm:text-sm
              shadow-[0_6px_18px_-8px_rgba(10,10,10,0.6)]
            "
          >
            <span
              className="w-1.5 h-1.5 rounded-full bg-[#FF6700]"
              aria-hidden="true"
            />
            {loc.badge}
          </span>

          <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 md:p-8 flex flex-col gap-2.5">
            <h3
              className='font-["Founders_Grotesk"] font-bold text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[0.95] uppercase'
            >
              {loc.label}
            </h3>

            {loc.area && (
              <span className="-mt-1 font-['Founders_Grotesk'] text-sm sm:text-base md:text-lg text-[#fafaf7]/75">
                {loc.area}
              </span>
            )}

            <p className="font-['NeueMontreal'] text-white/80 text-sm sm:text-base leading-relaxed line-clamp-2 max-w-[58ch]">
              {loc.desc}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Featured() {
  const allCards = [
    ...LOCATIONS.map((loc) => ({
      type: "location",
      data: loc,
    })),

    ...UPCOMING_LOCATIONS.map((loc) => ({
      type: "comingSoon",
      data: loc,
    })),
  ];

  return (
    <div
      id="locations"
      className="w-full bg-[#fafaf7] py-14 sm:py-20 md:py-28"
    >
      {/* ---------------------------------------------------------------
          SECTION HEADING
      ---------------------------------------------------------------- */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{
          once: true,
          margin: "-80px",
        }}
        variants={stagger}
        className="
          px-5
          sm:px-10
          md:px-20
          border-b
          border-[#0a0a0a]/10
          pb-8
          sm:pb-10
          md:pb-14
        "
      >
        <div className="max-w-3xl">
          <h2
            className='font-["Founders_Grotesk"] font-bold uppercase text-[11vw] sm:text-[8vw] md:text-[6vw] lg:text-[5vw] tracking-tighter leading-[0.95] overflow-hidden pb-[0.05em] text-[#0a0a0a]'
          >
            <motion.span variants={lineUp} className="block">
              Find <span className="text-[#FF6700]">Us.</span>
            </motion.span>
          </h2>

          <motion.p
            variants={fadeUp}
            className="mt-5 sm:mt-6 text-[#0a0a0a]/60 text-base font-['NeueMontreal'] max-w-[54ch] leading-relaxed"
          >
            Barakhamba, Jhandewalan and Noida, Sector 142, each a short walk
            from the metro.
          </motion.p>
        </div>
      </motion.div>

      {/* ---------------------------------------------------------------
          LOCATION CARDS

          Desktop:
            2 columns
            16:10 aspect ratio

          Tablet:
            2 columns
            4:3 aspect ratio

          Mobile:
            1 column
            4:3 aspect ratio

          The wider two-column layout gives the photography considerably
          more room while keeping the cards from becoming excessively tall.
      ---------------------------------------------------------------- */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{
          once: true,
          margin: "-60px",
        }}
        variants={stagger}
        className="
          px-5
          sm:px-10
          md:px-20
          mt-8
          sm:mt-10
          md:mt-14
          grid
          grid-cols-1
          sm:grid-cols-2
          gap-5
          md:gap-6
        "
      >
        {allCards.map((item) =>
          item.type === "location" ? (
            <LocationCard key={item.data.id} loc={item.data} />
          ) : (
            <ComingSoonCard key={item.data.id} loc={item.data} />
          )
        )}
      </motion.div>

      {/* ---------------------------------------------------------------
          MAP
      ---------------------------------------------------------------- */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{
          once: true,
          margin: "-60px",
        }}
        variants={stagger}
        className="
          px-5
          sm:px-10
          md:px-20
          mt-10
          sm:mt-14
          md:mt-16
        "
      >
        <motion.div
          variants={fadeUp}
          className="
            relative
            rounded-2xl
            md:rounded-3xl
            overflow-hidden
            border
            border-[#0a0a0a]/12
            shadow-[0_40px_90px_-45px_rgba(10,10,10,0.4)]
          "
        >
          <iframe
            src={getAllLocationsMapEmbedUrl()}
            title="The Berry Coworks · Barakhamba, Jhandewalan and Noida"
            className="w-full h-[380px] sm:h-[480px] md:h-[560px] block"
            style={{
              border: 0,
            }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}