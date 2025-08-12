import React from 'react';
import { useLocation, Link } from 'react-router-dom';

// This is the styled success page component.
// It uses TailwindCSS for styling, just like your provided HTML.
const PaymentSuccessPage = () => {
    const location = useLocation();
    const { amount, transactionId } = location.state || {}; // Safely access state

    const formattedAmount = amount ? (amount / 100).toFixed(2) : 'N/A';
    const displayTransactionId = transactionId ? transactionId.replace('pay_', '#') : 'N/A';
    const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className="gradient-bg min-h-screen overflow-hidden relative font-sans">
            {/* Confetti Animation Elements */}
            <div className="absolute inset-0 pointer-events-none">
                {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className="confetti absolute top-0 w-2 h-2 bg-yellow-400 rounded" style={{ left: `${Math.random() * 100}%`, animation: `confetti ${2 + Math.random() * 2}s linear infinite`, animationDelay: `${Math.random()}s` }}></div>
                ))}
            </div>

            <div className="min-h-screen flex items-center justify-center px-4">
                <div className="glass bg-white bg-opacity-10 border border-white border-opacity-20 rounded-3xl p-8 md:p-12 max-w-md w-full text-center shadow-2xl">
                    <div className="bounce-in mb-8">
                        <div className="w-24 h-24 mx-auto bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>
                    </div>

                    <div className="slide-up mb-8" style={{ animationDelay: '0.2s' }}>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Success!</h1>
                        <p className="text-xl text-white text-opacity-90 mb-2">Payment Completed</p>
                        <p className="text-white text-opacity-70">Your transaction has been processed successfully.</p>
                    </div>

                    <div className="slide-up glass bg-white bg-opacity-10 rounded-2xl p-6 mb-8 border border-white border-opacity-10" style={{ animationDelay: '0.4s' }}>
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-white text-opacity-70">Amount Paid</span>
                            <span className="text-2xl font-bold text-white">₹{formattedAmount}</span>
                        </div>
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-white text-opacity-70">Transaction ID</span>
                            <span className="text-white font-mono text-sm">{displayTransactionId}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-white text-opacity-70">Date</span>
                            <span className="text-white">{currentDate}</span>
                        </div>
                    </div>

                    <div className="slide-up space-y-4" style={{ animationDelay: '0.6s' }}>
                        <Link to="/" className="block w-full bg-white text-purple-600 font-semibold py-4 px-6 rounded-2xl hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg">
                            Back to Home
                        </Link>
                    </div>

                    <div className="slide-up mt-8 text-white text-opacity-60 text-sm" style={{ animationDelay: '0.8s' }}>
                        <p>Thank you for joining Barbell Nation!</p>
                    </div>
                </div>
            </div>

            {/* We can embed the styles directly for simplicity */}
            <style jsx="true">{`
                @keyframes confetti {
                    0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; }
                    100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
                }
                @keyframes bounce-in {
                    0% { transform: scale(0); opacity: 0; }
                    50% { transform: scale(1.1); }
                    100% { transform: scale(1); opacity: 1; }
                }
                @keyframes slide-up {
                    0% { transform: translateY(50px); opacity: 0; }
                    100% { transform: translateY(0); opacity: 1; }
                }
                .gradient-bg { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
                .glass { backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); }
                .bounce-in { animation: bounce-in 0.8s ease-out forwards; }
                .slide-up { animation: slide-up 0.6s ease-out forwards; }
            `}</style>
        </div>
    );
};

export default PaymentSuccessPage;

