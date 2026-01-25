"use client";

import { motion } from "framer-motion";
import {
  Shield,
  Search,
  Bot,
  Users,
  HelpCircle,
  Lock,
  CheckCircle,
  Image,
  FileText,
  Clock,
  Eye,
  EyeOff,
  Building2,
  Plane,
  Hotel,
  Calendar,
  Train,
  ArrowRight,
  ChevronRight,
} from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md"
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Search className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">Perdus</span>
          </div>
          <div className="hidden items-center gap-8 md:flex">
            <a
              href="#features"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              How It Works
            </a>
            <a
              href="#security"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Security
            </a>
            <a
              href="#use-cases"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Use Cases
            </a>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="#demo"
              className="hidden text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:block"
            >
              View Demo
            </a>
            <a
              href="https://app.perdus.tech/login"
              target="_blank"
              className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Get Started
            </a>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute top-1/4 -right-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
            className="absolute -bottom-1/4 -left-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl"
          />
        </div>
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-1.5 text-sm"
            >
              <Shield className="h-4 w-4 text-primary" />
              <span>Privacy-first lost &amp; found platform</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-6 text-4xl font-bold tracking-tight md:text-6xl"
            >
              Recover Lost Items Without Compromising{" "}
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Privacy
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-10 text-lg text-muted-foreground md:text-xl"
            >
              Perdus is a secure lost-and-found platform that matches user
              inquiries to a private inventory using smart matching and human
              verification — without ever exposing the catalog to the public.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <a
                href="https://devpost.com/software/perdus?ref_content=user-portfolio&ref_feature=in_progress"
                target="_blank"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-8 py-3 text-base font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:gap-3 sm:w-auto"
              >
                Devpost
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#demo"
                className="flex w-full items-center justify-center gap-2 rounded-full border border-border px-8 py-3 text-base font-medium transition-colors hover:bg-muted sm:w-auto"
              >
                View Demo
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="border-y border-border bg-muted/30 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Traditional Lost &amp; Found Systems Are Broken
            </h2>
            <p className="text-lg text-muted-foreground">
              Current solutions expose your organization to risk while failing
              those who need help most.
            </p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4"
          >
            {[
              {
                icon: Clock,
                title: "Manual & Slow",
                description:
                  "Time-consuming processes that frustrate both staff and claimants",
              },
              {
                icon: Eye,
                title: "Easy to Exploit",
                description:
                  "Public listings make it trivial for bad actors to make false claims",
              },
              {
                icon: Lock,
                title: "Security Risks",
                description:
                  "Sensitive or valuable items exposed to potential theft",
              },
              {
                icon: FileText,
                title: "High Workload",
                description:
                  "Administrative burden that diverts resources from core operations",
              },
            ].map((problem, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/50"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-destructive/10">
                  <problem.icon className="h-6 w-6 text-destructive" />
                </div>
                <h3 className="mb-2 font-semibold">{problem.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {problem.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm text-primary">
                <EyeOff className="h-4 w-4" />
                Private by Design
              </div>
              <h2 className="mb-6 text-3xl font-bold md:text-4xl">
                A Smarter Way to Recover What&apos;s Lost
              </h2>
              <p className="mb-8 text-lg text-muted-foreground">
                Perdus introduces a <strong>private-by-design</strong> recovery
                system. Users submit inquiries using text or images. Our system
                intelligently matches them against a hidden inventory reviewed
                only by authorized assistants.
              </p>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="space-y-4"
              >
                {[
                  "No public browsing of items",
                  "No guesswork or false claims",
                  "No exposure of sensitive inventory",
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    className="flex items-center gap-3"
                  >
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                      <CheckCircle className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <span className="font-medium">{item}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={scaleIn}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl border border-border bg-gradient-to-br from-muted to-muted/50 p-8">
                <div className="flex h-full flex-col items-center justify-center gap-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="grid grid-cols-2 gap-4"
                  >
                    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
                      <Image className="mx-auto mb-2 h-8 w-8 text-primary" />
                      <p className="text-center text-xs text-muted-foreground">
                        Image Upload
                      </p>
                    </div>
                    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
                      <FileText className="mx-auto mb-2 h-8 w-8 text-primary" />
                      <p className="text-center text-xs text-muted-foreground">
                        Description
                      </p>
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                  >
                    <ChevronRight className="h-6 w-6 rotate-90 text-muted-foreground" />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="rounded-2xl border border-primary bg-primary/10 p-4"
                  >
                    <Bot className="mx-auto mb-2 h-8 w-8 text-primary" />
                    <p className="text-center text-xs font-medium">
                      Smart Matching
                    </p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                  >
                    <ChevronRight className="h-6 w-6 rotate-90 text-muted-foreground" />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7 }}
                    className="rounded-2xl border border-border bg-card p-4 shadow-sm"
                  >
                    <CheckCircle className="mx-auto mb-2 h-8 w-8 text-green-500" />
                    <p className="text-center text-xs text-muted-foreground">
                      Item Recovered
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="border-y border-border bg-muted/30 py-20 md:py-28"
      >
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="mx-auto mb-16 max-w-2xl text-center"
          >
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Powerful Features for Secure Recovery
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to run a modern, secure lost-and-found
              operation.
            </p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {/* Feature 1 */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="rounded-2xl border border-border bg-card p-8"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Search className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-3 text-xl font-semibold">
                Smart Inquiry Submission
              </h3>
              <p className="mb-4 text-muted-foreground">
                Users can report lost items using image uploads or detailed text
                descriptions including brand, color, location, and date.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Submitted", "Under Review", "Matched", "Resolved"].map(
                  (status) => (
                    <span
                      key={status}
                      className="rounded-full bg-muted px-3 py-1 text-xs font-medium"
                    >
                      {status}
                    </span>
                  )
                )}
              </div>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="rounded-2xl border border-border bg-card p-8"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Bot className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-3 text-xl font-semibold">
                Automated Matching Engine
              </h3>
              <p className="mb-4 text-muted-foreground">
                Automatically compares inquiries with the private catalog,
                generates curated matches, and assigns confidence scores ranked
                by similarity.
              </p>
              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "80%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="h-full rounded-full bg-gradient-to-r from-primary to-primary/60"
                />
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Confidence Score: 87%
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="rounded-2xl border border-border bg-card p-8"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-3 text-xl font-semibold">
                Assistant Review System
              </h3>
              <p className="mb-4 text-muted-foreground">
                Authorized assistants review inquiries, approve or reject
                matches, and manage the hidden inventory with full access
                control.
              </p>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/20" />
                <div className="-ml-2 h-8 w-8 rounded-full bg-primary/30" />
                <div className="-ml-2 h-8 w-8 rounded-full bg-primary/40" />
                <span className="ml-2 text-sm text-muted-foreground">
                  +5 assistants
                </span>
              </div>
            </motion.div>

            {/* Feature 4 */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="rounded-2xl border border-border bg-card p-8"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <HelpCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-3 text-xl font-semibold">
                Adaptive Follow-Up Questions
              </h3>
              <p className="mb-4 text-muted-foreground">
                When multiple matches are found, the system asks targeted
                questions to narrow results using item-specific attributes.
              </p>
              <div className="rounded-lg border border-border bg-muted/50 p-3 text-sm italic text-muted-foreground">
                &quot;Does your phone have a cracked screen?&quot;
              </div>
            </motion.div>

            {/* Feature 5 */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="rounded-2xl border border-border bg-card p-8"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-3 text-xl font-semibold">
                Ownership Verification
              </h3>
              <p className="mb-4 text-muted-foreground">
                Generates verification questions based on item-specific details
                to confirm true ownership before release.
              </p>
              <div className="rounded-lg border border-border bg-muted/50 p-3 text-sm italic text-muted-foreground">
                &quot;What is the lock screen wallpaper?&quot;
              </div>
            </motion.div>

            {/* Feature 6 */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="rounded-2xl border border-border bg-card p-8"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Lock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-3 text-xl font-semibold">Confidence Scoring</h3>
              <p className="text-muted-foreground">
                Dynamic scoring based on image similarity, text matching,
                attribute overlap, and verification answers determines match
                validity and review requirements.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="mx-auto mb-16 max-w-2xl text-center"
          >
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              How Perdus Works
            </h2>
            <p className="text-lg text-muted-foreground">
              A streamlined process that protects privacy while maximizing
              recovery rates.
            </p>
          </motion.div>
          <div className="relative">
            <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-border lg:block" />
            <div className="space-y-12 lg:space-y-0">
              {[
                {
                  step: 1,
                  title: "Submit Inquiry",
                  description:
                    "User submits a lost item report with images or detailed text description",
                  icon: FileText,
                },
                {
                  step: 2,
                  title: "Automatic Matching",
                  description:
                    "System performs intelligent matching against the private inventory",
                  icon: Bot,
                },
                {
                  step: 3,
                  title: "Assistant Review",
                  description:
                    "Authorized assistant reviews and validates top matching candidates",
                  icon: Users,
                },
                {
                  step: 4,
                  title: "Verification",
                  description:
                    "User answers ownership verification questions to confirm identity",
                  icon: Shield,
                },
                {
                  step: 5,
                  title: "Recovery",
                  description:
                    "Match confirmed and item safely returned to rightful owner",
                  icon: CheckCircle,
                },
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeInUp}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative grid items-center gap-8 lg:grid-cols-2 ${
                    index % 2 === 1 ? "lg:text-right" : ""
                  }`}
                >
                  <div
                    className={`${index % 2 === 1 ? "lg:order-2" : ""} ${
                      index % 2 === 1 ? "lg:pl-16" : "lg:pr-16"
                    }`}
                  >
                    <div
                      className={`flex items-center gap-4 ${
                        index % 2 === 1 ? "lg:flex-row-reverse" : ""
                      }`}
                    >
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground"
                      >
                        {item.step}
                      </motion.div>
                      <h3 className="text-xl font-semibold">{item.title}</h3>
                    </div>
                    <p
                      className={`mt-4 text-muted-foreground ${
                        index % 2 === 1 ? "lg:ml-auto" : ""
                      } max-w-md`}
                    >
                      {item.description}
                    </p>
                  </div>
                  <div
                    className={`hidden lg:flex ${
                      index % 2 === 1
                        ? "lg:order-1 lg:justify-end lg:pr-16"
                        : "lg:pl-16"
                    }`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.05, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="flex h-20 w-20 items-center justify-center rounded-2xl border border-border bg-card shadow-sm"
                    >
                      <item.icon className="h-10 w-10 text-primary" />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section
        id="security"
        className="border-y border-border bg-muted/30 py-20 md:py-28"
      >
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
            >
              <h2 className="mb-6 text-3xl font-bold md:text-4xl">
                Built for Security &amp; Privacy
              </h2>
              <p className="mb-8 text-lg text-muted-foreground">
                Every aspect of Perdus is designed to protect sensitive
                inventory while preventing fraudulent claims.
              </p>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="space-y-6"
              >
                {[
                  {
                    title: "No Public Access",
                    description:
                      "Lost items catalog is never exposed to the public",
                  },
                  {
                    title: "Assistant-Only Visibility",
                    description:
                      "Only authorized personnel can view inventory",
                  },
                  {
                    title: "Controlled Disclosure",
                    description:
                      "Items revealed only after match approval and verification",
                  },
                  {
                    title: "Fraud Prevention",
                    description:
                      "Multi-layer verification prevents false ownership claims",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    className="flex gap-4"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Shield className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="grid grid-cols-2 gap-4"
            >
              <div className="space-y-4">
                <motion.div
                  variants={scaleIn}
                  whileHover={{ scale: 1.03 }}
                  className="rounded-2xl border border-border bg-card p-6"
                >
                  <Lock className="mb-3 h-8 w-8 text-primary" />
                  <p className="text-sm font-medium">Role-Based Access</p>
                </motion.div>
                <motion.div
                  variants={scaleIn}
                  whileHover={{ scale: 1.03 }}
                  className="rounded-2xl border border-border bg-card p-6"
                >
                  <EyeOff className="mb-3 h-8 w-8 text-primary" />
                  <p className="text-sm font-medium">Hidden Catalog</p>
                </motion.div>
              </div>
              <div className="mt-8 space-y-4">
                <motion.div
                  variants={scaleIn}
                  whileHover={{ scale: 1.03 }}
                  className="rounded-2xl border border-border bg-card p-6"
                >
                  <Shield className="mb-3 h-8 w-8 text-primary" />
                  <p className="text-sm font-medium">Secure API</p>
                </motion.div>
                <motion.div
                  variants={scaleIn}
                  whileHover={{ scale: 1.03 }}
                  className="rounded-2xl border border-border bg-card p-6"
                >
                  <CheckCircle className="mb-3 h-8 w-8 text-primary" />
                  <p className="text-sm font-medium">Verified Matches</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section id="use-cases" className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="mx-auto mb-16 max-w-2xl text-center"
          >
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Built for Scale
            </h2>
            <p className="text-lg text-muted-foreground">
              Perdus is designed to serve organizations of all sizes handling
              lost and found operations.
            </p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5"
          >
            {[
              { icon: Building2, label: "Universities" },
              { icon: Plane, label: "Airports" },
              { icon: Hotel, label: "Hotels" },
              { icon: Calendar, label: "Events" },
              { icon: Train, label: "Transit" },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="flex flex-col items-center rounded-2xl border border-border bg-card p-8 transition-colors hover:border-primary/50"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                  <item.icon className="h-8 w-8 text-primary" />
                </div>
                <span className="font-medium">{item.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Perdus Section */}
      <section className="border-y border-border bg-muted/30 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
              className="mb-12 text-3xl font-bold md:text-4xl"
            >
              Why Choose Perdus?
            </motion.h2>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={staggerContainer}
              className="grid gap-4 sm:grid-cols-2 md:grid-cols-3"
            >
              {[
                "Prevents false claims",
                "Protects sensitive inventory",
                "Reduces manual searching",
                "Smart matching over browsing",
                "Built for institutions",
                "Privacy-first design",
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-3 rounded-xl border border-border bg-card p-4"
                >
                  <CheckCircle className="h-5 w-5 shrink-0 text-green-500" />
                  <span className="text-sm font-medium">{item}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="get-started" className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={scaleIn}
            transition={{ duration: 0.7 }}
            className="relative overflow-hidden rounded-3xl bg-primary p-12 text-primary-foreground md:p-20"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/80" />
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.15, 0.1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.05, 0.1, 0.05],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white/5 blur-3xl"
            />
            <div className="relative mx-auto max-w-2xl text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="mb-6 text-3xl font-bold md:text-4xl"
              >
                Ready to Modernize Lost &amp; Found?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="mb-10 text-lg opacity-90"
              >
                Start using Perdus today and transform how your organization
                handles lost item recovery.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="flex flex-col items-center justify-center gap-4 sm:flex-row"
              >
                <a
                  href="#"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-white px-8 py-3 text-base font-medium text-primary transition-all hover:bg-white/90 hover:gap-3 sm:w-auto"
                >
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="https://youtu.be/wuHm1-r1MEo"
                  target="_blank"
                  id="demo"
                  className="flex w-full items-center justify-center rounded-full border border-white/30 px-8 py-3 text-base font-medium transition-colors hover:bg-white/10 sm:w-auto"
                >
                  View Demo
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <motion.footer
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        transition={{ duration: 0.6 }}
        className="border-t border-border py-12"
      >
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Search className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">Perdus</span>
            </div>
            <div className="text-center text-sm text-muted-foreground">
              <p>Privacy-first recovery platform</p>
              <p className="mt-1">
                Made by{" "}
                <span className="font-medium text-foreground">Maxim Bacar</span>{" "}
                &amp;{" "}
                <span className="font-medium text-foreground">
                  Benjamin de la Barrera
                </span>{" "}
                for{" "}
                <span className="font-medium text-foreground">ConUHacks X</span>
              </p>
            </div>
            <div className="text-sm text-muted-foreground">
              <a
                href="https://perdus.tech"
                className="transition-colors hover:text-foreground"
              >
                perdus.tech
              </a>
              <span className="mx-2">·</span>
              <span>&copy; 2026 Perdus</span>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
