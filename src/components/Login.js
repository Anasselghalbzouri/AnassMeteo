import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginStart, loginSuccess, loginFailure } from "../store/authSlice";
import { login } from "../api/authService";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const data = await login(email, password);
      dispatch(loginSuccess(data));
      navigate("/");
    } catch (err) {
      dispatch(loginFailure(err.message));
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center text-slate-900">
      <div className="w-full max-w-md p-8 space-y-8 bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-200/70">
        <div className="space-y-1 text-center">
          <h2 className="text-3xl font-bold">SkyCode</h2>
          <p className="text-slate-500 text-sm">Sign in to your dashboard</p>
        </div>
        {error && (
          <p role="alert" className="text-red-500 text-center text-sm">
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              className="block text-sm font-medium mb-2 text-slate-600"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              required
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium mb-2 text-slate-600"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg transition duration-200 font-semibold text-white shadow-md shadow-blue-600/25 disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
        <p className="text-center text-sm text-slate-500">
          Demo — use <strong>user@example.com</strong> and{" "}
          <strong>password</strong>
        </p>
      </div>
    </div>
  );
};

export default Login;
