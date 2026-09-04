// Legacy /signin route — opens the AuthModal then returns home so old links
// and search results don't hit a dead page.
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useMacbookStore from "../store";

const SignInRedirect = () => {
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const openAuth = useMacbookStore((s) => s.openAuth);

    useEffect(() => {
        const view = params.get("view");
        // Map old deep-links onto auth modal views
        if (view === "create" || view === "forgot") openAuth(view);
        else openAuth("signin");
        navigate("/", { replace: true });
    }, [navigate, openAuth, params]);

    return null;
};

export default SignInRedirect;
