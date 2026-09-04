// AuthModal — single overlay for Sign In, Forgot Password, and Create Account.
//
// Replaces the old SignUpModal + /signin page. Open state + which panel to show
// live in Zustand (`authOpen`, `authView`). Switching views keeps the modal
// open and only re-tweens the panel content (no close/reopen).
//
// Shell behaviour matches the previous Sign Up modal: blur backdrop, flex
// centering (no transform centering — GSAP only tweens opacity/scale),
// scroll lock, Escape / ✕ / outside click.
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import useMacbookStore from "../store";

const emailOk = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

const AuthModal = () => {
    const { authOpen, authView, closeAuth, setAuthView } = useMacbookStore();

    // ── Sign In fields ──
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [signInErrors, setSignInErrors] = useState({});
    const [formError, setFormError] = useState("");
    const [loading, setLoading] = useState(false);
    const [oauthNotice, setOauthNotice] = useState("");

    // ── Forgot fields ──
    const [forgotEmail, setForgotEmail] = useState("");
    const [forgotErrors, setForgotErrors] = useState({});
    const [forgotLoading, setForgotLoading] = useState(false);

    // ── Create Account fields ──
    const [create, setCreate] = useState({
        name: "",
        email: "",
        password: "",
        confirm: "",
    });
    const [createErrors, setCreateErrors] = useState({});
    const [createLoading, setCreateLoading] = useState(false);

    const panelRef = useRef(null);
    const backdropRef = useRef(null);
    const layerRef = useRef(null);
    const firstFieldRef = useRef(null);

    // Scroll lock while open
    useEffect(() => {
        if (!authOpen) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = prev;
        };
    }, [authOpen]);

    // Escape closes
    useEffect(() => {
        if (!authOpen) return;
        const onKey = (e) => {
            if (e.key === "Escape") closeAuth();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [authOpen, closeAuth]);

    // Reset forms when the modal first opens (not on every view change)
    useEffect(() => {
        if (!authOpen) return;
        setEmail("");
        setPassword("");
        setSignInErrors({});
        setFormError("");
        setOauthNotice("");
        setLoading(false);
        setForgotEmail("");
        setForgotErrors({});
        setForgotLoading(false);
        setCreate({ name: "", email: "", password: "", confirm: "" });
        setCreateErrors({});
        setCreateLoading(false);
    }, [authOpen]);

    // Focus first useful field when view changes while open
    useEffect(() => {
        if (!authOpen) return;
        const id = setTimeout(() => firstFieldRef.current?.focus(), 80);
        return () => clearTimeout(id);
    }, [authOpen, authView]);

    // Open / close shell animation
    useGSAP(() => {
        const backdrop = backdropRef.current;
        const panel = panelRef.current;
        const layer = layerRef.current;
        if (!backdrop || !panel || !layer) return;

        if (authOpen) {
            gsap.set(backdrop, { display: "block", pointerEvents: "auto" });
            gsap.set(layer, { display: "flex", pointerEvents: "auto" });
            gsap.fromTo(
                backdrop,
                { opacity: 0 },
                { opacity: 1, duration: 0.35, ease: "power2.out" }
            );
            gsap.fromTo(
                panel,
                { opacity: 0, scale: 0.96 },
                { opacity: 1, scale: 1, duration: 0.45, ease: "power2.out" }
            );
        } else {
            gsap.to(backdrop, {
                opacity: 0,
                duration: 0.25,
                ease: "power2.in",
                onComplete: () => {
                    gsap.set(backdrop, { display: "none", pointerEvents: "none" });
                },
            });
            gsap.to(panel, {
                opacity: 0,
                scale: 0.98,
                duration: 0.25,
                ease: "power2.in",
                onComplete: () => {
                    gsap.set(layer, { display: "none", pointerEvents: "none" });
                },
            });
        }
    }, [authOpen]);

    // Soft content swap when stepping between views (modal stays open)
    useGSAP(() => {
        if (!authOpen || !panelRef.current) return;
        gsap.fromTo(
            panelRef.current.querySelector(".auth-modal-body"),
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
        );
    }, [authView, authOpen]);

    const switchView = (next) => {
        // Step change inside the open modal — clears transient errors only
        setSignInErrors({});
        setFormError("");
        setOauthNotice("");
        setForgotErrors({});
        setCreateErrors({});
        setAuthView(next);
    };

    // ── Sign In handlers ──
    const validateSignIn = () => {
        const next = {};
        if (!email.trim()) next.email = "Enter your email address.";
        else if (!emailOk(email)) next.email = "Enter a valid email address.";
        if (!password) next.password = "Enter your password.";
        else if (password.length < 6) next.password = "Password must be at least 6 characters.";
        setSignInErrors(next);
        return Object.keys(next).length === 0;
    };

    const onSignInSubmit = (e) => {
        e.preventDefault();
        setFormError("");
        setOauthNotice("");
        if (!validateSignIn()) return;
        setLoading(true);
        window.setTimeout(() => {
            setLoading(false);
            if (password === "wrongpass") {
                setFormError("The email or password you entered is incorrect.");
                return;
            }
            setAuthView("signin-success");
        }, 900);
    };

    // TODO(backend): Real Google OAuth (client ID + redirect URI).
    const onGoogleOAuth = (intent = "signin") => {
        console.log(`[TODO] ${intent === "create" ? "Sign up" : "Sign in"} with Google — not connected (needs backend OAuth).`);
        setOauthNotice(
            intent === "create"
                ? "Sign up with Google isn’t connected yet. Backend OAuth comes later."
                : "Sign in with Google isn’t connected yet. Backend OAuth comes later."
        );
    };

    // TODO(backend): Real Sign in with Apple (Services ID + callback).
    const onAppleOAuth = (intent = "signin") => {
        console.log(`[TODO] ${intent === "create" ? "Sign up" : "Sign in"} with Apple — not connected (needs backend OAuth).`);
        setOauthNotice(
            intent === "create"
                ? "Sign up with Apple isn’t connected yet. Backend OAuth comes later."
                : "Sign in with Apple isn’t connected yet. Backend OAuth comes later."
        );
    };

    // ── Forgot handlers ──
    const onForgotSubmit = (e) => {
        e.preventDefault();
        const next = {};
        if (!forgotEmail.trim()) next.email = "Enter your email address.";
        else if (!emailOk(forgotEmail)) next.email = "Enter a valid email address.";
        setForgotErrors(next);
        if (Object.keys(next).length) return;

        setForgotLoading(true);
        // Mock “send reset link” — no email is actually sent
        window.setTimeout(() => {
            setForgotLoading(false);
            setAuthView("forgot-sent");
        }, 800);
    };

    // ── Create Account handlers ──
    const onCreateChange = (e) => {
        const { name, value } = e.target;
        setOauthNotice("");
        setCreate((prev) => ({ ...prev, [name]: value }));
    };

    const validateCreate = () => {
        const next = {};
        if (!create.name.trim()) next.name = "Enter your name.";
        if (!create.email.trim()) next.email = "Enter your email address.";
        else if (!emailOk(create.email)) next.email = "Enter a valid email address.";
        if (!create.password) next.password = "Create a password.";
        else if (create.password.length < 6) next.password = "Use at least 6 characters.";
        if (!create.confirm) next.confirm = "Confirm your password.";
        else if (create.confirm !== create.password) next.confirm = "Passwords don’t match.";
        setCreateErrors(next);
        return Object.keys(next).length === 0;
    };

    const onCreateSubmit = (e) => {
        e.preventDefault();
        if (!validateCreate()) return;
        setCreateLoading(true);
        window.setTimeout(() => {
            setCreateLoading(false);
            setAuthView("create-success");
        }, 900);
    };

    const titleId = "auth-modal-title";

    return (
        <>
            <div
                ref={backdropRef}
                className="auth-backdrop"
                onClick={closeAuth}
                aria-hidden={!authOpen}
                style={{ display: "none", opacity: 0 }}
            />

            <div
                ref={layerRef}
                className="auth-layer"
                aria-hidden={!authOpen}
                style={{ display: "none" }}
                onClick={closeAuth}
            >
                <div
                    ref={panelRef}
                    id="auth-modal"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby={titleId}
                    style={{ opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        type="button"
                        className="auth-modal-close"
                        onClick={closeAuth}
                        aria-label="Close"
                    >
                        ✕
                    </button>

                    <div className="auth-modal-body" key={authView}>
                        {/* ── Sign In ─────────────────────────────────── */}
                        {authView === "signin" && (
                            <>
                                <img src="/logo.svg" alt="" className="auth-logo" aria-hidden="true" />
                                <h2 id={titleId}>Sign in to Apple Account</h2>
                                <p className="auth-sub">
                                    Mock sign in for this demo. Nothing is sent to a server.
                                </p>

                                {formError && (
                                    <p className="auth-banner auth-banner-error" role="alert">
                                        {formError}
                                    </p>
                                )}
                                {oauthNotice && (
                                    <p className="auth-banner auth-banner-info" role="status">
                                        {oauthNotice}
                                    </p>
                                )}

                                <form className="auth-form" onSubmit={onSignInSubmit} noValidate>
                                    <label>
                                        Email
                                        <input
                                            ref={firstFieldRef}
                                            type="email"
                                            autoComplete="email"
                                            value={email}
                                            disabled={loading}
                                            onChange={(e) => setEmail(e.target.value)}
                                            aria-invalid={Boolean(signInErrors.email)}
                                        />
                                        {signInErrors.email && (
                                            <span className="auth-error">{signInErrors.email}</span>
                                        )}
                                    </label>
                                    <label>
                                        Password
                                        <input
                                            type="password"
                                            autoComplete="current-password"
                                            value={password}
                                            disabled={loading}
                                            onChange={(e) => setPassword(e.target.value)}
                                            aria-invalid={Boolean(signInErrors.password)}
                                        />
                                        {signInErrors.password && (
                                            <span className="auth-error">{signInErrors.password}</span>
                                        )}
                                    </label>

                                    <button
                                        type="button"
                                        className="auth-text-link auth-forgot"
                                        onClick={() => switchView("forgot")}
                                    >
                                        Forgot password?
                                    </button>

                                    <button
                                        type="submit"
                                        className="btn-primary-pill auth-submit"
                                        disabled={loading}
                                    >
                                        {loading ? "Signing in…" : "Sign In"}
                                    </button>
                                </form>

                                <div className="auth-divider" aria-hidden="true">
                                    <span>or</span>
                                </div>

                                <div className="auth-oauth">
                                    <button
                                        type="button"
                                        className="auth-oauth-apple"
                                        onClick={() => onAppleOAuth("signin")}
                                        disabled={loading}
                                    >
                                        <img
                                            src="/companies-logo/Apple-dark.png"
                                            alt=""
                                            className="auth-oauth-icon"
                                            aria-hidden="true"
                                        />
                                        Sign in with Apple
                                    </button>
                                    <button
                                        type="button"
                                        className="auth-oauth-google"
                                        onClick={() => onGoogleOAuth("signin")}
                                        disabled={loading}
                                    >
                                        <img
                                            src="/companies-logo/Google.png"
                                            alt=""
                                            className="auth-oauth-icon"
                                            aria-hidden="true"
                                        />
                                        Sign in with Google
                                    </button>
                                </div>

                                <p className="auth-foot">
                                    Don’t have an account?{" "}
                                    <button
                                        type="button"
                                        className="auth-text-link"
                                        onClick={() => switchView("create")}
                                    >
                                        Create Account
                                    </button>
                                </p>
                            </>
                        )}

                        {/* ── Sign In success ─────────────────────────── */}
                        {authView === "signin-success" && (
                            <div className="auth-success">
                                <img src="/logo.svg" alt="" className="auth-logo" aria-hidden="true" />
                                <h2 id={titleId}>You’re signed in</h2>
                                <p className="auth-sub">
                                    Mock session only. Signed in as{" "}
                                    <span className="text-white">{email}</span>.
                                </p>
                                <div className="auth-success-actions">
                                    <Link
                                        to="/store"
                                        className="btn-primary-pill"
                                        onClick={closeAuth}
                                    >
                                        Continue to Store
                                    </Link>
                                    <button
                                        type="button"
                                        className="btn-ghost-pill"
                                        onClick={() => {
                                            setPassword("");
                                            switchView("signin");
                                        }}
                                    >
                                        Sign out (reset)
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* ── Forgot password ─────────────────────────── */}
                        {authView === "forgot" && (
                            <>
                                <h2 id={titleId}>Reset your password</h2>
                                <p className="auth-sub">
                                    Enter your email and we’ll pretend to send a reset link.
                                    No email is actually sent.
                                </p>
                                <form className="auth-form" onSubmit={onForgotSubmit} noValidate>
                                    <label>
                                        Email
                                        <input
                                            ref={firstFieldRef}
                                            type="email"
                                            autoComplete="email"
                                            value={forgotEmail}
                                            disabled={forgotLoading}
                                            onChange={(e) => setForgotEmail(e.target.value)}
                                            aria-invalid={Boolean(forgotErrors.email)}
                                        />
                                        {forgotErrors.email && (
                                            <span className="auth-error">{forgotErrors.email}</span>
                                        )}
                                    </label>
                                    <button
                                        type="submit"
                                        className="btn-primary-pill auth-submit"
                                        disabled={forgotLoading}
                                    >
                                        {forgotLoading ? "Sending…" : "Send Reset Link"}
                                    </button>
                                </form>
                                <button
                                    type="button"
                                    className="auth-text-link"
                                    onClick={() => switchView("signin")}
                                >
                                    ← Back to Sign In
                                </button>
                            </>
                        )}

                        {/* ── Forgot sent ─────────────────────────────── */}
                        {authView === "forgot-sent" && (
                            <div className="auth-success">
                                <h2 id={titleId}>Check your email</h2>
                                <p className="auth-sub">
                                    If an account exists for{" "}
                                    <span className="text-white">{forgotEmail}</span>, a mock
                                    reset link would be on its way. (Nothing was sent.)
                                </p>
                                <button
                                    type="button"
                                    className="btn-primary-pill auth-submit"
                                    onClick={() => switchView("signin")}
                                >
                                    Back to Sign In
                                </button>
                            </div>
                        )}

                        {/* ── Create Account ──────────────────────────── */}
                        {authView === "create" && (
                            <>
                                <img src="/logo.svg" alt="" className="auth-logo" aria-hidden="true" />
                                <h2 id={titleId}>Create your Apple Account</h2>
                                <p className="auth-sub">
                                    Mock registration — nothing is saved to a server.
                                </p>

                                {oauthNotice && (
                                    <p className="auth-banner auth-banner-info" role="status">
                                        {oauthNotice}
                                    </p>
                                )}

                                {/* Same skeleton as Sign In: fields → primary CTA → or → social */}
                                <form className="auth-form" onSubmit={onCreateSubmit} noValidate>
                                    <label>
                                        Name
                                        <input
                                            ref={firstFieldRef}
                                            name="name"
                                            autoComplete="name"
                                            value={create.name}
                                            disabled={createLoading}
                                            onChange={onCreateChange}
                                            aria-invalid={Boolean(createErrors.name)}
                                        />
                                        {createErrors.name && (
                                            <span className="auth-error">{createErrors.name}</span>
                                        )}
                                    </label>
                                    <label>
                                        Email
                                        <input
                                            type="email"
                                            name="email"
                                            autoComplete="email"
                                            value={create.email}
                                            disabled={createLoading}
                                            onChange={onCreateChange}
                                            aria-invalid={Boolean(createErrors.email)}
                                        />
                                        {createErrors.email && (
                                            <span className="auth-error">{createErrors.email}</span>
                                        )}
                                    </label>
                                    <label>
                                        Password
                                        <input
                                            type="password"
                                            name="password"
                                            autoComplete="new-password"
                                            value={create.password}
                                            disabled={createLoading}
                                            onChange={onCreateChange}
                                            aria-invalid={Boolean(createErrors.password)}
                                        />
                                        {createErrors.password && (
                                            <span className="auth-error">{createErrors.password}</span>
                                        )}
                                    </label>
                                    <label>
                                        Confirm password
                                        <input
                                            type="password"
                                            name="confirm"
                                            autoComplete="new-password"
                                            value={create.confirm}
                                            disabled={createLoading}
                                            onChange={onCreateChange}
                                            aria-invalid={Boolean(createErrors.confirm)}
                                        />
                                        {createErrors.confirm && (
                                            <span className="auth-error">{createErrors.confirm}</span>
                                        )}
                                    </label>
                                    <button
                                        type="submit"
                                        className="btn-primary-pill auth-submit"
                                        disabled={createLoading}
                                    >
                                        {createLoading ? "Creating…" : "Create Account"}
                                    </button>
                                </form>

                                <div className="auth-divider" aria-hidden="true">
                                    <span>or</span>
                                </div>

                                <div className="auth-oauth">
                                    <button
                                        type="button"
                                        className="auth-oauth-apple"
                                        onClick={() => onAppleOAuth("create")}
                                        disabled={createLoading}
                                    >
                                        <img
                                            src="/companies-logo/Apple-dark.png"
                                            alt=""
                                            className="auth-oauth-icon"
                                            aria-hidden="true"
                                        />
                                        Sign up with Apple
                                    </button>
                                    <button
                                        type="button"
                                        className="auth-oauth-google"
                                        onClick={() => onGoogleOAuth("create")}
                                        disabled={createLoading}
                                    >
                                        <img
                                            src="/companies-logo/Google.png"
                                            alt=""
                                            className="auth-oauth-icon"
                                            aria-hidden="true"
                                        />
                                        Sign up with Google
                                    </button>
                                </div>

                                <p className="auth-foot">
                                    Already have an account?{" "}
                                    <button
                                        type="button"
                                        className="auth-text-link"
                                        onClick={() => switchView("signin")}
                                    >
                                        Sign In
                                    </button>
                                </p>
                            </>
                        )}

                        {/* ── Create success ──────────────────────────── */}
                        {authView === "create-success" && (
                            <div className="auth-success">
                                <h2 id={titleId}>Account created (mock)</h2>
                                <p className="auth-sub">
                                    UI-only success — there’s no real account yet.
                                </p>
                                <div className="auth-success-actions">
                                    <button
                                        type="button"
                                        className="btn-primary-pill"
                                        onClick={() => switchView("signin")}
                                    >
                                        Sign In
                                    </button>
                                    <button
                                        type="button"
                                        className="btn-ghost-pill"
                                        onClick={closeAuth}
                                    >
                                        Done
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default AuthModal;
