// ForgotPasswordPage.js

import ForgotPasswordForm from "@/components/AuthenticationForm/ForgotPasswordForm";

function ForgotPasswordPage() {
    return (
        <div className="relative flex items-center justify-center min-h-screen overflow-hidden">
            <div className="absolute inset-0 bg-gradient-animation" />
            <ForgotPasswordForm />
        </div>
    );
}

export default ForgotPasswordPage;
