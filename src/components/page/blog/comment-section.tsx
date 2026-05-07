"use client";

import { useState, useEffect, useId } from "react";
import { MessageCircle, Send, User, ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

interface Comment {
	id: string;
	name: string;
	email: string;
	body: string;
	createdAt: number; // timestamp ms
}

interface CommentSectionProps {
	articleId: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

function storageKey(articleId: string) {
	return `viora_comments_${articleId}`;
}

function loadComments(articleId: string): Comment[] {
	if (typeof window === "undefined") return [];
	try {
		const raw = localStorage.getItem(storageKey(articleId));
		return raw ? (JSON.parse(raw) as Comment[]) : [];
	} catch {
		return [];
	}
}

function saveComments(articleId: string, comments: Comment[]) {
	localStorage.setItem(storageKey(articleId), JSON.stringify(comments));
}

function formatDate(ts: number) {
	return new Intl.DateTimeFormat("vi-VN", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	}).format(new Date(ts));
}

/** Generate initials avatar color from name (deterministic). */
function avatarColor(name: string) {
	const palette = [
		"bg-rose-400",
		"bg-orange-400",
		"bg-amber-500",
		"bg-emerald-500",
		"bg-teal-500",
		"bg-cyan-500",
		"bg-blue-500",
		"bg-violet-500",
		"bg-pink-500",
	];
	let hash = 0;
	for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
	return palette[Math.abs(hash) % palette.length];
}

function initials(name: string) {
	return name
		.trim()
		.split(/\s+/)
		.map((w) => w[0]?.toUpperCase() ?? "")
		.slice(0, 2)
		.join("");
}

// ─────────────────────────────────────────────────────────────────────────────
// Avatar
// ─────────────────────────────────────────────────────────────────────────────

function Avatar({ name }: { name: string }) {
	return (
		<div
			className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[12px] font-bold text-white ${avatarColor(name)}`}
		>
			{initials(name) || <User size={14} />}
		</div>
	);
}

// ─────────────────────────────────────────────────────────────────────────────
// Single comment card
// ─────────────────────────────────────────────────────────────────────────────

function CommentCard({ comment }: { comment: Comment }) {
	return (
		<div className="flex gap-3">
			<Avatar name={comment.name} />
			<div className="min-w-0 flex-1">
				<div className="rounded-xl rounded-tl-none border border-gray-100 bg-gray-50 px-4 py-3">
					<div className="mb-1 flex flex-wrap items-baseline gap-2">
						<span className="text-[13px] font-bold text-gray-900">{comment.name}</span>
						<span className="text-[11px] text-gray-600">{formatDate(comment.createdAt)}</span>
					</div>
					<p className="text-[13px] leading-relaxed whitespace-pre-wrap text-gray-700">{comment.body}</p>
				</div>
			</div>
		</div>
	);
}

// ─────────────────────────────────────────────────────────────────────────────
// Comment form
// ─────────────────────────────────────────────────────────────────────────────

interface FormState {
	name: string;
	email: string;
	body: string;
}

const EMPTY_FORM: FormState = { name: "", email: "", body: "" };

function CommentForm({ onSubmit }: { onSubmit: (data: FormState) => void }) {
	const uid = useId();
	const t = useTranslations("comment");
	const [form, setForm] = useState<FormState>(EMPTY_FORM);
	const [errors, setErrors] = useState<Partial<FormState>>({});
	const [submitted, setSubmitted] = useState(false);

	const validate = () => {
		const e: Partial<FormState> = {};
		if (!form.name.trim()) e.name = t("err_name");
		if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = t("err_email");
		if (!form.body.trim()) e.body = t("err_body_req");
		else if (form.body.trim().length < 5) e.body = t("err_body_short");
		return e;
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const errs = validate();
		if (Object.keys(errs).length) {
			setErrors(errs);
			return;
		}
		onSubmit(form);
		setForm(EMPTY_FORM);
		setErrors({});
		setSubmitted(true);
		setTimeout(() => setSubmitted(false), 3000);
	};

	const field = (key: keyof FormState) => ({
		id: `${uid}-${key}`,
		value: form[key],
		onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			setForm((f) => ({ ...f, [key]: e.target.value }));
			setErrors((err) => ({ ...err, [key]: undefined }));
		},
	});

	return (
		<form onSubmit={handleSubmit} noValidate className="space-y-4">
			<div className="grid gap-4 sm:grid-cols-2">
				{/* Name */}
				<div>
					<label htmlFor={`${uid}-name`} className="mb-1.5 block text-[12px] font-semibold text-gray-700">
						{t("fullname")} <span className="text-brand-primary">*</span>
					</label>
					<input
						type="text"
						placeholder={t("placeholder_name")}
						autoComplete="name"
						className={`focus:border-brand-primary focus:ring-brand-primary/20 w-full rounded-xl border px-4 py-2.5 text-[13px] transition outline-none focus:ring-2 ${
							errors.name ? "border-red-400 bg-red-50" : "border-gray-200 bg-white"
						}`}
						{...field("name")}
					/>
					{errors.name && <p className="mt-1 text-[11px] text-red-500">{errors.name}</p>}
				</div>

				{/* Email */}
				<div>
					<label htmlFor={`${uid}-email`} className="mb-1.5 block text-[12px] font-semibold text-gray-700">
						{t("email_opt")}
					</label>
					<input
						type="email"
						placeholder="email@example.com"
						autoComplete="email"
						className={`focus:border-brand-primary focus:ring-brand-primary/20 w-full rounded-xl border px-4 py-2.5 text-[13px] transition outline-none focus:ring-2 ${
							errors.email ? "border-red-400 bg-red-50" : "border-gray-200 bg-white"
						}`}
						{...field("email")}
					/>
					{errors.email && <p className="mt-1 text-[11px] text-red-500">{errors.email}</p>}
				</div>
			</div>

			{/* Body */}
			<div>
				<label htmlFor={`${uid}-body`} className="mb-1.5 block text-[12px] font-semibold text-gray-700">
					{t("content")} <span className="text-brand-primary">*</span>
				</label>
				<textarea
					rows={4}
					placeholder={t("placeholder_body")}
					className={`focus:border-brand-primary focus:ring-brand-primary/20 w-full resize-none rounded-xl border px-4 py-3 text-[13px] leading-relaxed transition outline-none focus:ring-2 ${
						errors.body ? "border-red-400 bg-red-50" : "border-gray-200 bg-white"
					}`}
					{...field("body")}
				/>
				{errors.body && <p className="mt-1 text-[11px] text-red-500">{errors.body}</p>}
			</div>

			<div className="flex items-center gap-4">
				<button
					type="submit"
					className="bg-brand-primary inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-[13px] font-bold text-white transition-all hover:brightness-110 active:scale-95"
				>
					<Send size={13} />
					{t("submit")}
				</button>

				{submitted && <p className="text-[12px] font-semibold text-emerald-600">{t("success")}</p>}
			</div>
		</form>
	);
}

// ─────────────────────────────────────────────────────────────────────────────
// Main export
// ─────────────────────────────────────────────────────────────────────────────

const PAGE_SIZE = 5;

export default function CommentSection({ articleId }: CommentSectionProps) {
	const t = useTranslations("comment");
	const [comments, setComments] = useState<Comment[]>([]);
	const [showAll, setShowAll] = useState(false);
	const [mounted, setMounted] = useState(false);

	// Load from localStorage only after mount (SSR safe)
	useEffect(() => {
		setComments(loadComments(articleId));
		setMounted(true);
	}, [articleId]);

	const handleSubmit = (data: FormState) => {
		const next: Comment = {
			id: crypto.randomUUID(),
			name: data.name.trim(),
			email: data.email.trim(),
			body: data.body.trim(),
			createdAt: Date.now(),
		};
		const updated = [next, ...comments];
		setComments(updated);
		saveComments(articleId, updated);
	};

	// Newest first
	const sorted = [...comments].sort((a, b) => b.createdAt - a.createdAt);
	const visible = showAll ? sorted : sorted.slice(0, PAGE_SIZE);
	const hasMore = sorted.length > PAGE_SIZE && !showAll;

	return (
		<section className="border-t border-gray-100 bg-white py-12">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				{/* Header */}
				<div className="mb-8 flex items-center gap-3">
					<MessageCircle size={20} className="text-brand-primary" />
					<h2 className="text-[18px] font-semibold tracking-tight text-gray-900 uppercase">{t("title")}</h2>
					{mounted && comments.length > 0 && (
						<span className="bg-brand-primary/10 text-brand-primary rounded-full px-2.5 py-0.5 text-[11px] font-bold">
							{comments.length}
						</span>
					)}
				</div>

				{/* Form */}
				<div className="mb-10 rounded-2xl border border-gray-100 bg-gray-50/60 p-5 sm:p-6">
					<p className="mb-4 text-[13px] font-semibold text-gray-600">{t("leave_comment")}</p>
					<CommentForm onSubmit={handleSubmit} />
				</div>

				{/* Comment list */}
				{mounted && (
					<>
						{sorted.length === 0 ? (
							<div className="flex flex-col items-center gap-3 py-10 text-center">
								<MessageCircle size={36} className="text-gray-200" />
								<p className="text-[13px] text-gray-600">{t("empty")}</p>
							</div>
						) : (
							<div className="space-y-5">
								{visible.map((c) => (
									<CommentCard key={c.id} comment={c} />
								))}
							</div>
						)}

						{hasMore && (
							<button
								onClick={() => setShowAll(true)}
								className="hover:border-brand-primary hover:text-brand-primary mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 py-2.5 text-[13px] font-semibold text-gray-500 transition"
							>
								<ChevronDown size={15} />
								{t("view_more", { count: sorted.length - PAGE_SIZE })}
							</button>
						)}
					</>
				)}
			</div>
		</section>
	);
}
