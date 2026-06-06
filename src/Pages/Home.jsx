import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Nav } from "../Components/Nav";
import { Footer } from "../Components/Footer";
import hero from "../assets/img/hero-img.png";
import menu from "../assets/img/menu.png";
import dashboard from "../assets/img/dashboard.png";
import payslipImg from "../assets/img/payslip.png";
import plImg from "../assets/img/pl-statement.png";
import {
  QrCodeIcon,
  BanknotesIcon,
  ClockIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  ChatBubbleBottomCenterTextIcon,
  ArrowRightIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

/* ─── Reusable fade-in wrapper ─────────────────────────────────── */
const Reveal = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

/* ─── Section label ─────────────────────────────────────────────── */
const Label = ({ children }) => (
  <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-400">
    <span className="h-px w-6 bg-amber-400" />
    {children}
  </p>
);

/* ─── Screenshot-based previews with animation ──────────────────── */
const PayslipPreview = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
    className="relative overflow-hidden rounded-2xl border border-amber-400/15 bg-[#0d1117] p-1 shadow-2xl shadow-black/40"
  >
    {/* Gold top line */}
    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />
    {/* Ambient glow */}
    <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 rounded-full bg-amber-400/[0.08] blur-[40px]" />

    {/* Label bar */}
    <div className="flex items-center justify-between px-4 py-2.5">
      <div className="flex items-center gap-2">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
        <span className="sans text-[9px] font-semibold uppercase tracking-[0.22em] text-slate-500">
          Live Payslip
        </span>
      </div>
      <span className="sans rounded-full border border-white/8 bg-white/[0.04] px-2 py-0.5 text-[9px] uppercase tracking-wider text-slate-600">
        Auto-generated
      </span>
    </div>

    {/* Actual payslip screenshot */}
    <motion.div
      initial={{ scale: 1.03, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden rounded-xl"
    >
      <img
        src={payslipImg}
        alt="Payslip example — Tomi International Hotel"
        className="w-full"
        style={{ filter: "brightness(0.97) contrast(1.02)" }}
      />
    </motion.div>

    {/* Bottom bar */}
    <div className="flex items-center gap-2 px-4 py-2.5">
      {["Basic Salary", "Tax Auto-calc", "Pension 7%", "Net Pay"].map((tag, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 4 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 + i * 0.08 }}
          className="sans rounded-full border border-white/8 bg-white/[0.03] px-2 py-0.5 text-[9px] uppercase tracking-wider text-slate-600"
        >
          {tag}
        </motion.span>
      ))}
    </div>
  </motion.div>
);

const PlPreview = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
    className="relative overflow-hidden rounded-2xl border border-blue-400/15 bg-[#0d1117] p-1 shadow-2xl shadow-black/40"
  >
    {/* Blue top line */}
    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/60 to-transparent" />
    <div className="pointer-events-none absolute left-0 top-0 h-32 w-32 rounded-full bg-blue-500/[0.07] blur-[40px]" />

    {/* Label bar */}
    <div className="flex items-center justify-between px-4 py-2.5">
      <div className="flex items-center gap-2">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-400" />
        <span className="sans text-[9px] font-semibold uppercase tracking-[0.22em] text-slate-500">
          P&amp;L Report
        </span>
      </div>
      <span className="sans rounded-full border border-white/8 bg-white/[0.04] px-2 py-0.5 text-[9px] uppercase tracking-wider text-slate-600">
        One-click
      </span>
    </div>

    {/* Actual P&L screenshot */}
    <motion.div
      initial={{ scale: 1.03, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden rounded-xl"
    >
      <img
        src={plImg}
        alt="Profit & Loss statement — Tomi International Hotel"
        className="w-full"
        style={{ filter: "brightness(0.97) contrast(1.02)" }}
      />
    </motion.div>

    {/* Bottom bar */}
    <div className="flex items-center gap-2 px-4 py-2.5">
      {["Revenue", "COGS", "Gross Profit", "Net Income"].map((tag, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 4 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 + i * 0.08 }}
          className="sans rounded-full border border-white/8 bg-white/[0.03] px-2 py-0.5 text-[9px] uppercase tracking-wider text-slate-600"
        >
          {tag}
        </motion.span>
      ))}
    </div>
  </motion.div>
);

export const Home = () => {
  const [pricingPlans, setPricingPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const services = [
    {
      icon: <QrCodeIcon className="h-6 w-6" />,
      title: "Smart QR Ordering",
      description:
        "Guests scan, browse, and order instantly from a polished digital menu. Zero friction, full elegance.",
    },
    {
      icon: <BanknotesIcon className="h-6 w-6" />,
      title: "Payroll System",
      description:
        "Automate employee pay runs with Ethiopian tax brackets, pension deductions, and instant payslip generation.",
    },
    {
      icon: <ChartBarIcon className="h-6 w-6" />,
      title: "Revenue Insights",
      description:
        "Track orders, and revenue in real time to grow faster and decide smarter.",
    },
    {
      icon: <ClockIcon className="h-6 w-6" />,
      title: "Faster Service",
      description:
        "Accelerate table turns and reduce wait times across every shift.",
    },
    {
      icon: <CurrencyDollarIcon className="h-6 w-6" />,
      title: "Financial Clarity",
      description:
        "One dashboard for costs, margins, and profitability across all locations.",
    },
    {
      icon: <ChatBubbleBottomCenterTextIcon className="h-6 w-6" />,
      title: "Guest Experience",
      description:
        "Capture feedback, personalize service, and build memorable, return-worthy stays.",
    },
  ];

  const fetchPricingPlans = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/packeage/get`);
      setPricingPlans(response.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Unable to load pricing plans right now.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPricingPlans();
  }, []);

  return (
    <div className="bg-[#080c14] font-['Instrument_Serif',Georgia,serif] text-white antialiased selection:bg-amber-400 selection:text-black">
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,700&family=Sora:wght@300;400;500;600&display=swap');

        * { box-sizing: border-box; }

        .sans { font-family: 'Sora', system-ui, sans-serif; }
        .serif { font-family: 'Playfair Display', Georgia, serif; }

        .grain {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          background-size: 200px;
        }

        .glow-gold { box-shadow: 0 0 40px 0 rgba(251,191,36,0.12); }
        .glow-gold-sm { box-shadow: 0 0 20px 0 rgba(251,191,36,0.18); }

        .line-rule { background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08) 30%, rgba(255,255,255,0.08) 70%, transparent); height: 1px; }

        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
        .float { animation: float 5s ease-in-out infinite; }

        @keyframes shimmer {
          0% { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }
        .shimmer-text {
          background: linear-gradient(90deg, #f59e0b 0%, #fde68a 40%, #f59e0b 100%);
          background-size: 400px 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 4s linear infinite;
        }

        .card-hover {
          transition: transform 0.4s cubic-bezier(0.22,1,0.36,1), border-color 0.3s, box-shadow 0.3s;
        }
        .card-hover:hover {
          transform: translateY(-6px);
          border-color: rgba(251,191,36,0.2);
          box-shadow: 0 24px 48px -8px rgba(0,0,0,0.5), 0 0 0 1px rgba(251,191,36,0.08);
        }
      `}</style>

      <Nav />

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section id="hero" className="relative overflow-hidden pt-24 pb-16 grain">
        {/* Background atmosphere */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-amber-500/[0.04] blur-[120px]" />
          <div className="absolute -right-32 top-40 h-[400px] w-[400px] rounded-full bg-blue-600/[0.06] blur-[100px]" />
          <div className="absolute -left-20 bottom-20 h-[300px] w-[300px] rounded-full bg-amber-400/[0.03] blur-[80px]" />
        </div>

        {/* Fine grid overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="container relative mx-auto px-6 lg:px-12">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="sans mb-10 flex justify-start"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/[0.04] px-4 py-2 text-[11px] font-medium tracking-wider text-slate-400 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
              Trusted by boutique hotels, cafés &amp; restaurants
            </span>
          </motion.div>

          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr]">
            {/* Copy */}
            <div className="space-y-7">
              <div className="space-y-4">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="sans text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-400"
                >
                  REVE IT Solutions
                </motion.p>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                  className="serif text-[2.6rem] font-normal leading-[1.1] tracking-[-0.01em] text-white lg:text-[3.4rem]"
                >
                   Cafe Management
                  <br />
                  <span className="italic text-slate-300">software</span>{" "}
                  for modern
                  <br />
                  venues.
                </motion.h1>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="sans max-w-lg text-[1.05rem] leading-relaxed text-slate-400 font-light"
              >
                Streamline orders, speed up service, and manage every guest moment from one elegant platform built for hospitality.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="flex flex-wrap gap-4"
              >
                <a
                  href="#pricing"
                  className="sans group inline-flex items-center gap-2 rounded-full bg-amber-400 px-7 py-3.5 text-[0.9rem] font-semibold text-black shadow-lg shadow-amber-400/20 transition-all duration-300 hover:bg-amber-300 hover:shadow-amber-300/30"
                >
                  View pricing
                  <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </motion.div>

              {/* Stats strip */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.55 }}
                className="flex gap-0 divide-x divide-white/8 rounded-2xl border border-white/6 bg-white/[0.025] p-1 backdrop-blur-sm"
              >
                {[
                  { value: "99.8%", label: "Uptime" },
                  { value: "4.9/5", label: "Rating" },
                  { value: "24/7", label: "Support" },
                ].map((s, i) => (
                  <div key={i} className="flex-1 px-6 py-4 text-center">
                    <p className="serif text-xl font-normal text-white">{s.value}</p>
                    <p className="sans mt-1 text-[11px] uppercase tracking-wider text-slate-500">{s.label}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Hero image — no box, pure float */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex items-center justify-center"
            >
              {/* Ambient glow behind image */}
              <div className="absolute inset-8 -z-10 rounded-full bg-amber-400/[0.08] blur-[60px]" />
              <div className="absolute inset-16 -z-10 rounded-full bg-blue-500/[0.06] blur-[80px]" />

              {/* The image itself — no border, no bg, no card */}
              <motion.img
                src={hero}
                alt="REVE IT dashboard"
                className="float w-full max-w-lg drop-shadow-2xl"
                style={{ filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.6)) drop-shadow(0 0 40px rgba(251,191,36,0.08))" }}
              />

              {/* Floating accent pills */}
              <div className="sans absolute bottom-6 -left-4 rounded-2xl border border-white/10 bg-[#0b1220]/90 px-4 py-2.5 backdrop-blur-md shadow-xl">
                <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-0.5">This week</p>
                <p className="text-sm font-semibold text-white">+24% Revenue</p>
              </div>
              <div className="sans absolute top-6 -right-2 rounded-xl border border-amber-400/20 bg-amber-400/10 px-3 py-2 backdrop-blur-md shadow-xl">
                <p className="text-[11px] text-amber-300 font-medium tracking-wide">🔥 Live orders: 47</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── DIVIDER ──────────────────────────────────────────────────── */}
      <div className="line-rule" />

      {/* ── SERVICES ─────────────────────────────────────────────────── */}
      <section id="services" className="relative py-20 grain overflow-hidden">
        <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-amber-500/[0.03] blur-[120px]" />

        <div className="container mx-auto px-6 lg:px-12">
          <div className="mb-12 max-w-xl">
            <Reveal>
              <Label>What REVE IT delivers</Label>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="serif mt-4 text-[2rem] font-normal leading-tight tracking-[-0.01em] text-white lg:text-[2.6rem]">
                Every tool your venue
                <br />
                <span className="italic text-slate-400">needs to thrive.</span>
              </h2>
            </Reveal>
          </div>

          <div className="grid gap-px bg-white/[0.05] rounded-3xl overflow-hidden border border-white/[0.05] lg:grid-cols-3">
            {services.map((service, index) => (
              <Reveal key={index} delay={index * 0.07}>
                <div className="card-hover group relative bg-[#080c14] p-6 cursor-default h-full">
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/8 bg-white/[0.04] text-amber-400 transition-all duration-300 group-hover:border-amber-400/30 group-hover:bg-amber-400/10">
                    {service.icon}
                  </div>
                  <h3 className="serif mb-2 text-lg font-normal text-white">{service.title}</h3>
                  <p className="sans text-sm leading-relaxed text-slate-500 font-light">{service.description}</p>
                  <div className="absolute bottom-8 right-8 opacity-0 transition-all duration-300 group-hover:opacity-100">
                    <ArrowRightIcon className="h-4 w-4 text-amber-400" />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── DIVIDER ──────────────────────────────────────────────────── */}
      <div className="line-rule" />

      {/* ── ABOUT ─────────────────────────────────────────────────────── */}
      <section id="about" className="relative overflow-hidden py-24 grain">
        {/* Background glows */}
        <div className="pointer-events-none absolute left-0 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-blue-600/[0.05] blur-[120px]" />
        <div className="pointer-events-none absolute right-0 bottom-0 h-[300px] w-[300px] rounded-full bg-amber-500/[0.04] blur-[80px]" />

        <div className="container mx-auto px-6 lg:px-12">
          {/* Section header */}
          <div className="mb-16 max-w-2xl">
            <Reveal><Label>Everything your venue needs</Label></Reveal>
            <Reveal delay={0.1}>
              <h2 className="serif mt-4 text-[2rem] font-normal leading-tight text-white lg:text-[2.8rem]">
                One platform for hotels,
                <br />
                <span className="italic text-slate-400">cafés &amp; restaurants.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="sans mt-4 text-[0.95rem] leading-[1.8] text-slate-400 font-light max-w-xl">
                REVE IT is a complete hotel ERP system — from the moment a guest walks in to the moment they check out, every operation is covered.
              </p>
            </Reveal>
          </div>

          {/* Main feature grid */}
          <div className="grid items-center gap-12 lg:grid-cols-2">

            {/* Left: image with floating badges */}
            <Reveal>
              <div className="relative flex justify-center">
                {/* Glow behind image */}
                <div className="absolute inset-6 -z-10 rounded-[2rem] bg-amber-400/[0.06] blur-[50px]" />
                <div className="absolute inset-10 -z-10 rounded-[2rem] bg-blue-500/[0.05] blur-[60px]" />

                {/* Device frame */}
                <div className="relative rounded-[2rem] border border-white/8 bg-[#0d1117] p-2 shadow-2xl shadow-black/60">
                  <div className="h-1.5 w-20 rounded-full bg-white/10 mx-auto mb-2" />
                  <img
                    src={menu}
                    alt="REVE IT digital menu"
                    className="w-full max-w-[360px] max-h-[580px] object-cover object-top rounded-[1.2rem]"
                  />
                </div>

                {/* Floating stat badges */}
                <div className="sans absolute -bottom-4 left-0 rounded-2xl border border-white/10 bg-[#0b1220]/95 px-5 py-3 shadow-xl backdrop-blur-md">
                  <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-0.5">Orders today</p>
                  <p className="text-base font-semibold text-white">+127 <span className="text-emerald-400 text-xs">↑ 18%</span></p>
                </div>
                <div className="sans absolute -top-4 right-0 rounded-2xl border border-amber-400/20 bg-amber-400/10 px-4 py-2.5 shadow-xl backdrop-blur-md">
                  <p className="text-[10px] uppercase tracking-widest text-amber-400/70 mb-0.5">Revenue</p>
                  <p className="text-sm font-semibold text-white">ETB 42,800</p>
                </div>
              </div>
            </Reveal>

            {/* Right: feature list */}
            <Reveal delay={0.15}>
              <div className="space-y-5">
                {[
                  {
                    num: "01",
                    title: "Digital QR Menu",
                    desc: "Guests scan, browse and order instantly. Zero wait, full elegance. Update items in real time from any device.",
                  },
                  {
                    num: "02",
                    title: "Room Reservation System",
                    desc: "Manage bookings, availability, check-in and check-out from one clean interface. Never double-book again.",
                  },
                  {
                    num: "03",
                    title: "Financial Reporting & P&L",
                    desc: "Auto-generate profit & loss statements, daily reports, tax summaries, and revenue breakdowns with one click.",
                  },
                  {
                    num: "04",
                    title: "Payroll Management",
                    desc: "Automate salary calculations, Ethiopian tax deductions, pension contributions, and generate payslips instantly for every employee.",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="group flex gap-5 rounded-2xl border border-white/5 bg-white/[0.02] p-5 transition-all duration-300 hover:border-amber-400/15 hover:bg-white/[0.04]"
                  >
                    <div className="shrink-0 sans text-[11px] font-semibold tracking-widest text-amber-400/60 pt-1 w-6">{item.num}</div>
                    <div>
                      <p className="serif text-base font-normal text-white mb-1 group-hover:text-amber-100 transition-colors">{item.title}</p>
                      <p className="sans text-sm text-slate-500 font-light leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── DIVIDER ──────────────────────────────────────────────────── */}
      <div className="line-rule" />

      {/* ── FEATURE SHOWCASE ────────────────────────────────────────── */}
      <section className="relative py-24 grain overflow-hidden">
        <div className="pointer-events-none absolute left-1/4 top-0 h-[500px] w-[500px] -translate-y-1/4 rounded-full bg-blue-600/[0.05] blur-[120px]" />
        <div className="pointer-events-none absolute right-1/4 bottom-0 h-[500px] w-[500px] translate-y-1/4 rounded-full bg-amber-500/[0.04] blur-[120px]" />

        <div className="container mx-auto px-6 lg:px-12">
          {/* Section header */}
          <div className="mb-16 text-center">
            <Reveal><Label>See it in action</Label></Reveal>
            <Reveal delay={0.1}>
              <h2 className="serif mx-auto mt-4 max-w-2xl text-[2rem] font-normal leading-tight text-white lg:text-[2.6rem]">
                Powerful reports,
                <br />
                <span className="italic text-slate-400">out of the box.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="sans mx-auto mt-4 max-w-xl text-[0.95rem] font-light leading-relaxed text-slate-500">
                Every module generates beautiful, print-ready documents — no spreadsheets, no manual work. Just your live data, formatted instantly.
              </p>
            </Reveal>
          </div>

          {/* Shared vertical line spanning both pairs */}
          <div className="relative">
            <div className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-[2px] -translate-x-1/2 overflow-hidden lg:block">
              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: "top" }}
                className="h-full w-full bg-gradient-to-b from-blue-400/70 via-white/25 to-amber-400/70"
              />
            </div>

            {/* ── PAIR 1: P&L image LEFT · description RIGHT ── */}
            <div className="relative grid items-center gap-8 pb-20 lg:grid-cols-2">
              {/* Image */}
              <Reveal className="lg:pr-12">
                <PlPreview />
              </Reveal>
              {/* Description — centered in cell */}
              <Reveal delay={0.12} className="lg:pl-12">
                <div className="flex flex-col items-center justify-center text-center space-y-5">
                  <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/[0.07] px-4 py-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                    <span className="sans text-[11px] font-semibold uppercase tracking-wider text-blue-400">Financial Reporting</span>
                  </div>
                  <h3 className="serif text-[1.6rem] font-normal leading-snug text-white">
                    Profit &amp; Loss —
                    <br />
                    <span className="italic text-slate-400">generated in seconds.</span>
                  </h3>
                  <p className="sans max-w-xs text-[0.9rem] font-light leading-relaxed text-slate-400">
                    Full revenue breakdown with COGS, operating expenses, tax, and net income — powered by your live data.
                  </p>
                  <ul className="space-y-2.5 text-left">
                    {[
                      "Revenue & COGS auto-breakdown",
                      "Gross profit margin calculated",
                      "Business income tax (15%)",
                      "Net income with one click",
                    ].map((t, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: 10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                        className="sans flex items-center gap-3 text-sm font-light text-slate-400"
                      >
                        <CheckIcon className="h-4 w-4 shrink-0 text-blue-400" />
                        {t}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </Reveal>
              {/* Blue dot on the center line */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.35 }}
                className="absolute left-1/2 top-1/2 z-10 hidden h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-400 shadow-lg shadow-blue-400/60 ring-4 ring-blue-400/20 lg:block"
              />
            </div>

            {/* ── PAIR 2: description LEFT · Payslip image RIGHT ── */}
            <div className="relative grid items-center gap-8 pt-4 lg:grid-cols-2">
              {/* Description — centered in cell */}
              <Reveal delay={0.12} className="lg:pr-12">
                <div className="flex flex-col items-center justify-center text-center space-y-5">
                  <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/[0.07] px-4 py-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                    <span className="sans text-[11px] font-semibold uppercase tracking-wider text-amber-400">Payroll Management</span>
                  </div>
                  <h3 className="serif text-[1.6rem] font-normal leading-snug text-white">
                    Payslips — accurate,
                    <br />
                    <span className="italic text-slate-400">compliant &amp; instant.</span>
                  </h3>
                  <p className="sans max-w-xs text-[0.9rem] font-light leading-relaxed text-slate-400">
                    Ethiopian tax brackets, pension deductions, and every allowance handled automatically. Print-ready payslips on demand.
                  </p>
                  <ul className="space-y-2.5 text-left">
                    {[
                      "Ethiopian income tax brackets",
                      "Pension 7% auto-deducted",
                      "All allowances & bonuses included",
                      "PDF-ready payslip, instantly",
                    ].map((t, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                        className="sans flex items-center gap-3 text-sm font-light text-slate-400"
                      >
                        <CheckIcon className="h-4 w-4 shrink-0 text-amber-400" />
                        {t}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </Reveal>
              {/* Image */}
              <Reveal className="lg:pl-12">
                <PayslipPreview />
              </Reveal>
              {/* Amber dot on the center line */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.35 }}
                className="absolute left-1/2 top-1/2 z-10 hidden h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400 shadow-lg shadow-amber-400/60 ring-4 ring-amber-400/20 lg:block"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── DIVIDER ──────────────────────────────────────────────────── */}
      <div className="line-rule" />

      {/* ── DASHBOARD ───────────────────────────────────────────────── */}
      <section id="operations" className="relative py-20 grain overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/20 to-transparent" />

        <div className="container mx-auto px-6 lg:px-12">
          <div className="mb-10 text-center">
            <Reveal><Label>Insightful operations</Label></Reveal>
            <Reveal delay={0.1}>
              <h2 className="serif mx-auto mt-4 max-w-2xl text-[2rem] font-normal leading-tight text-white lg:text-[2.6rem]">
                Lead with{" "}
                <span className="italic text-slate-400">real-time</span> data.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="sans mx-auto mt-4 max-w-xl text-[0.95rem] font-light leading-relaxed text-slate-500">
                One dashboard brings revenue, and guest metrics together so you can make faster, smarter decisions.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            {/* Outer glow layer */}
            <div className="relative mx-auto max-w-4xl">
              <div className="pointer-events-none absolute -inset-4 rounded-[2.5rem] bg-amber-400/[0.05] blur-[40px]" />
              <div className="pointer-events-none absolute -inset-8 rounded-[3rem] bg-blue-500/[0.04] blur-[60px]" />

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative overflow-hidden rounded-[2rem] border border-white/8 shadow-2xl shadow-black/70 glow-gold"
                style={{ filter: "drop-shadow(0 40px 80px rgba(0,0,0,0.6)) drop-shadow(0 0 40px rgba(251,191,36,0.06))" }}
              >
                <div className="h-1 w-full bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />
                <img src={dashboard} alt="Dashboard" className="w-full" />
                <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/5" />
              </motion.div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── DIVIDER ──────────────────────────────────────────────────── */}
      <div className="line-rule" />

      {/* ── PRICING ──────────────────────────────────────────────────── */}
      <section id="pricing" className="relative py-20 grain overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/20 to-transparent" />

        <div className="container mx-auto px-6 lg:px-12">
          <div className="mb-12 text-center">
            <Reveal><Label>Flexible plans</Label></Reveal>
            <Reveal delay={0.1}>
              <h2 className="serif mx-auto mt-4 max-w-2xl text-[2rem] font-normal leading-tight text-white lg:text-[2.6rem]">
                Pricing for hospitality teams
                <br />
                <span className="italic text-slate-400">of every size.</span>
              </h2>
            </Reveal>
          </div>

          {loading ? (
            <div className="flex h-64 flex-col items-center justify-center gap-4">
              <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-amber-400" />
              <p className="sans text-sm text-slate-500">Loading pricing plans…</p>
            </div>
          ) : error ? (
            <div className="rounded-2xl border border-red-800/40 bg-red-950/20 p-10 text-center">
              <p className="sans text-red-400">{error}</p>
            </div>
          ) : (
            <div className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto">
              {pricingPlans.map((plan, index) => (
                <Reveal key={index} delay={index * 0.1} className="w-full sm:w-72 lg:w-80">
                  <div
                    className={`relative flex flex-col h-full rounded-3xl border p-8 transition-all duration-300 card-hover ${
                      plan.pinnedLabel
                        ? "border-amber-400/30 bg-gradient-to-b from-amber-400/[0.07] to-transparent glow-gold-sm lg:scale-105"
                        : "border-white/6 bg-white/[0.025]"
                    }`}
                  >
                    {plan.pinnedLabel && (
                      <div className="sans absolute -top-3 left-8 inline-flex items-center gap-1.5 rounded-full bg-amber-400 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-black shadow-lg shadow-amber-400/20">
                        <span className="h-1.5 w-1.5 rounded-full bg-black/40" />
                        {plan.pinnedLabel}
                      </div>
                    )}

                    <div className="mb-8">
                      <p className="sans text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500 mb-2">{plan.name}</p>
                      <div className="flex items-end gap-1">
                        <span className="sans text-lg font-light text-amber-400">ETB</span>
                        <span className="serif text-5xl font-normal text-white leading-none">{plan.price}</span>
                      </div>
                      <p className="sans mt-2 text-[11px] uppercase tracking-widest text-slate-600">
                        {plan.sub_date} {plan.durationUnit}
                      </p>
                    </div>

                    <p className="sans mb-6 text-sm leading-relaxed text-slate-500 font-light">{plan.description}</p>

                    <div className="line-rule mb-6" />

                    <ul className="mb-8 flex-grow space-y-3">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="sans flex items-start gap-3 text-sm text-slate-400">
                          <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                          <span className="font-light">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Link to={`/checkout/${plan.id}`} state={{ selectedPlan: plan }}>
                      <button
                        className={`sans w-full rounded-full py-3.5 text-[0.875rem] font-semibold transition-all duration-300 ${
                          plan.pinnedLabel
                            ? "bg-amber-400 text-black shadow-lg shadow-amber-400/20 hover:bg-amber-300"
                            : "border border-white/10 bg-white/[0.04] text-white hover:border-white/20 hover:bg-white/[0.08]"
                        }`}
                      >
                        Choose plan
                      </button>
                    </Link>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── DIVIDER ──────────────────────────────────────────────────── */}
      <div className="line-rule" />

      {/* ── CONTACT ──────────────────────────────────────────────────── */}
      <section id="contact" className="relative py-24 grain overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/20 to-transparent" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/[0.03] blur-[120px]" />

        <div className="container mx-auto px-6 lg:px-12">
          {/* Header */}
          <div className="mb-16 text-center">
            <Reveal><Label>Get in touch</Label></Reveal>
            <Reveal delay={0.1}>
              <h2 className="serif mx-auto mt-4 max-w-2xl text-[2rem] font-normal leading-tight text-white lg:text-[2.8rem]">
                Let's build your venue's
                <br />
                <span className="italic text-slate-400">future together.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="sans mx-auto mt-4 max-w-lg text-[0.95rem] font-light leading-relaxed text-slate-500">
                Reach out for a free demo or any questions. Our team is ready to help you get started.
              </p>
            </Reveal>
          </div>

          {/* Two-column layout */}
          <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] max-w-5xl mx-auto items-stretch">

            {/* Left: contact details stacked */}
            <Reveal>
              <div className="flex flex-col gap-4 h-full">
                {[
                  {
                    icon: <MapPinIcon className="h-5 w-5" />,
                    label: "Our Location",
                    value: "Hayat, Feres Bet",
                    sub: "Addis Ababa, Ethiopia",
                    href: "https://www.google.com/maps/place/Gift+Real+Estate+Ayat/@9.0217854,38.8883326,17z",
                    external: true,
                  },
                  {
                    icon: <PhoneIcon className="h-5 w-5" />,
                    label: "Phone",
                    value: "+251 924 384 865",
                    sub: "Available Mon–Sat, 8am–6pm",
                    href: "tel:+251924384865",
                    external: false,
                  },
                  {
                    icon: <EnvelopeIcon className="h-5 w-5" />,
                    label: "Email",
                    value: "yeabtsegatayemergia",
                    sub: "@gmail.com",
                    href: "mailto:yeabtsegatayemergia@gmail.com",
                    external: false,
                  },
                ].map((item, i) => (
                  <motion.a
                    key={i}
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="group flex items-center gap-5 rounded-2xl border border-white/6 bg-white/[0.025] p-5 transition-all duration-300 hover:border-amber-400/20 hover:bg-white/[0.04]"
                  >
                    <div className="shrink-0 flex h-12 w-12 items-center justify-center rounded-xl border border-white/8 bg-white/[0.04] text-amber-400 transition-all duration-300 group-hover:border-amber-400/30 group-hover:bg-amber-400/10">
                      {item.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="sans text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-600 mb-0.5">{item.label}</p>
                      <p className="serif text-base font-normal text-white leading-snug group-hover:text-amber-100 transition-colors truncate">{item.value}</p>
                      <p className="sans text-xs text-slate-500 font-light">{item.sub}</p>
                    </div>
                    <ArrowRightIcon className="h-4 w-4 text-slate-700 shrink-0 ml-auto transition-all duration-300 group-hover:text-amber-400 group-hover:translate-x-1" />
                  </motion.a>
                ))}
              </div>
            </Reveal>

            {/* Right: CTA card */}
            <Reveal delay={0.2}>
              <div className="relative flex flex-col justify-between rounded-3xl border border-amber-400/15 bg-gradient-to-br from-amber-400/[0.06] via-transparent to-transparent p-10 glow-gold-sm overflow-hidden h-full">
                {/* Decorative corner */}
                <div className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-amber-400/[0.08] blur-[50px]" />
                <div className="pointer-events-none absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-blue-500/[0.06] blur-[40px]" />

                <div className="relative space-y-4 mb-10">
                  <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/10 px-4 py-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
                    <span className="sans text-[11px] font-semibold uppercase tracking-wider text-amber-400">Free demo available</span>
                  </div>
                  <h3 className="serif text-[1.8rem] font-normal text-white leading-snug">
                    Ready to transform
                    <br />
                    <span className="italic text-amber-300/80">your venue?</span>
                  </h3>
                  <p className="sans text-sm font-light text-slate-400 leading-relaxed max-w-xs">
                    Join hotels and cafés across Ethiopia already running smarter with REVE IT Solutions.
                  </p>

                  {/* Bullet highlights */}
                  <ul className="space-y-2 pt-2">
                    {["No setup fee", "Cancel any time", "24/7 support included"].map((t, i) => (
                      <li key={i} className="sans flex items-center gap-2.5 text-sm text-slate-400 font-light">
                        <CheckIcon className="h-4 w-4 text-amber-400 shrink-0" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="relative flex flex-col sm:flex-row gap-3">
                  <a
                    href="#pricing"
                    className="sans group inline-flex items-center justify-center gap-2 rounded-full bg-amber-400 px-7 py-3.5 text-[0.875rem] font-semibold text-black shadow-lg shadow-amber-400/20 transition-all duration-300 hover:bg-amber-300"
                  >
                    View plans
                    <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                  <a
                    href="mailto:yeabtsegatayemergia@gmail.com"
                    className="sans inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-7 py-3.5 text-[0.875rem] font-semibold text-white transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08]"
                  >
                    Email us
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};