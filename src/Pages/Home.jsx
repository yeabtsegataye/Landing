import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Nav } from "../Components/Nav";
import { Footer } from "../Components/Footer";
import hero from "../assets/img/hero-img.png";
import menu from "../assets/img/menu.png";
import dashboard from "../assets/img/dashboard.png";
import {
  QrCodeIcon,
  CreditCardIcon,
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
      icon: <CreditCardIcon className="h-6 w-6" />,
      title: "Unified Payments",
      description:
        "Accept mobile, card, and cashless payments with one hospitality-grade flow.",
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

      {/* ── MENU FEATURE ─────────────────────────────────────────────── */}
      <section id="about" className="relative overflow-hidden py-20 grain">
        <div className="pointer-events-none absolute left-0 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-blue-600/[0.05] blur-[100px]" />

        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid items-center gap-12 lg:grid-cols-[auto_1fr]">
            <Reveal>
              <div className="relative flex justify-center">
                <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-amber-400/5 to-transparent" />
                <img
                  src={menu}
                  alt="Digital menu"
                  className="relative w-full max-w-[440px] max-h-[620px] object-cover object-top rounded-[1.5rem] border border-white/6 shadow-2xl shadow-black/50"
                />
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="space-y-6">
                <div>
                  <Label>Digital menu intelligence</Label>
                  <h2 className="serif mt-4 text-[2rem] font-normal leading-tight text-white lg:text-[2.6rem]">
                    Menus that look
                    <br />
                    <span className="italic text-slate-400">premium</span> and work fast.
                  </h2>
                </div>
                <p className="sans text-[0.95rem] leading-[1.8] text-slate-400 font-light">
                  Enable guests to browse, customize, and pay without waiting for staff — while your team gains full, real-time order visibility.
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    { title: "Instant setup", desc: "Publish menus and start taking orders in minutes." },
                    { title: "Higher checks", desc: "Built-in upsell prompts and curated recommendations." },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="rounded-xl border border-white/6 bg-white/[0.025] p-5 transition-all duration-300 hover:border-amber-400/15 hover:bg-white/[0.04]"
                    >
                      <p className="serif text-base font-normal text-white mb-1">{item.title}</p>
                      <p className="sans text-sm text-slate-500 font-light leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
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
            <div className="relative overflow-hidden rounded-[2rem] border border-white/6 shadow-2xl shadow-black/60 glow-gold">
              {/* Gradient top bar */}
              <div className="h-1 w-full bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />
              <img src={dashboard} alt="Dashboard" className="w-full" />
              <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/5" />
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
            <div className="grid gap-6 lg:grid-cols-3 max-w-5xl mx-auto">
              {pricingPlans.map((plan, index) => (
                <Reveal key={index} delay={index * 0.1}>
                  <div
                    className={`relative flex h-full flex-col rounded-3xl border p-8 transition-all duration-300 card-hover ${
                      plan.popular
                        ? "border-amber-400/30 bg-gradient-to-b from-amber-400/[0.07] to-transparent glow-gold-sm lg:scale-105"
                        : "border-white/6 bg-white/[0.025]"
                    }`}
                  >
                    {plan.popular && (
                      <div className="sans absolute -top-3 left-8 inline-flex items-center gap-1.5 rounded-full bg-amber-400 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-black shadow-lg shadow-amber-400/20">
                        <span className="h-1.5 w-1.5 rounded-full bg-black/40" />
                        Most Popular
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
                          plan.popular
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
      <section id="contact" className="relative py-20 grain overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/20 to-transparent" />

        <div className="container mx-auto px-6 lg:px-12">
          <div className="mb-12 text-center">
            <Reveal><Label>Ready to grow?</Label></Reveal>
            <Reveal delay={0.1}>
              <h2 className="serif mx-auto mt-4 max-w-2xl text-[2rem] font-normal leading-tight text-white lg:text-[2.6rem]">
                Modern hospitality
                <br />
                <span className="italic text-slate-400">starts here.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="sans mx-auto mt-4 max-w-xl text-[0.95rem] font-light leading-relaxed text-slate-500">
                Book a demo and let REVE IT Solutions help your venue deliver faster, smarter, and more memorable service.
              </p>
            </Reveal>
          </div>

          <div className="grid gap-5 lg:grid-cols-3 max-w-4xl mx-auto">
            {[
              {
                icon: <MapPinIcon className="h-6 w-6" />,
                label: "Visit us",
                lines: ["Addis Abeba, Bole", "Atlas Main Road"],
              },
              {
                icon: <PhoneIcon className="h-6 w-6" />,
                label: "Call us",
                lines: ["+2 5192 4384 865"],
              },
              {
                icon: <EnvelopeIcon className="h-6 w-6" />,
                label: "Email us",
                lines: ["tatitaye0@gmail.com", "betelhembelete0@gmail.com"],
              },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="card-hover group rounded-2xl border border-white/6 bg-white/[0.025] p-6 transition-all duration-300">
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/8 bg-white/[0.04] text-amber-400 transition-all duration-300 group-hover:border-amber-400/25 group-hover:bg-amber-400/8">
                    {item.icon}
                  </div>
                  <p className="serif mb-2 text-lg font-normal text-white">{item.label}</p>
                  {item.lines.map((line, j) => (
                    <p key={j} className="sans text-sm text-slate-500 font-light leading-relaxed">{line}</p>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>

          {/* CTA strip */}
          <Reveal delay={0.3}>
            <div className="mt-12 max-w-4xl mx-auto flex flex-col items-center justify-between gap-6 rounded-3xl border border-amber-400/15 bg-amber-400/[0.04] px-10 py-8 sm:flex-row glow-gold-sm">
              <p className="serif text-xl text-white text-center sm:text-left">
                Ready to transform your venue?
              </p>
              <a
                href="#pricing"
                className="sans group inline-flex shrink-0 items-center gap-2 rounded-full bg-amber-400 px-7 py-3.5 text-[0.875rem] font-semibold text-black shadow-lg shadow-amber-400/20 transition-all duration-300 hover:bg-amber-300"
              >
                Get started today
                <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
};