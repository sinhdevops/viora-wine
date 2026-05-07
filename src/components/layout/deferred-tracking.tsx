"use client";

import { useEffect, useRef } from "react";

const GTM_ID = "GTM-5P3662VX";
const GA_ID = "G-C1XWMDYLVB";
const AW_ID = "AW-18100193809";

declare global {
	interface Window {
		dataLayer: unknown[];
	}
}

function loadTracking() {
	// Push GTM start event then load GTM script
	window.dataLayer = window.dataLayer || [];
	window.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });

	const gtm = document.createElement("script");
	gtm.async = true;
	gtm.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
	document.head.appendChild(gtm);

	// Load GA4 + Ads
	const ga = document.createElement("script");
	ga.async = true;
	ga.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
	ga.onload = () => {
		function gtag(...args: unknown[]) {
			window.dataLayer.push(args);
		}
		gtag("js", new Date());
		gtag("config", GA_ID);
		gtag("config", AW_ID);
	};
	document.head.appendChild(ga);
}

export default function DeferredTracking() {
	const loaded = useRef(false);

	useEffect(() => {
		const trigger = () => {
			if (loaded.current) return;
			loaded.current = true;
			loadTracking();
		};

		const events = ["scroll", "click", "touchstart", "keydown"] as const;
		const opts = { once: true, passive: true } as const;
		events.forEach((e) => window.addEventListener(e, trigger, opts));

		// Fallback: load after 4s even without interaction
		const timer = setTimeout(trigger, 4000);

		return () => {
			events.forEach((e) => window.removeEventListener(e, trigger));
			clearTimeout(timer);
		};
	}, []);

	return null;
}
