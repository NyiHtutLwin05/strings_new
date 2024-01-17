"use client";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

function Form() {
  const router = useRouter();
  const [username, setUserName] = useState<undefined | string>("");
  const [password, setPassword] = useState<undefined | string>("");
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ username: username, password: password }),
    });
    if (res.ok) {
      router.push("/feed");
    } else {
      alert("log in failed");
    }
  }
  return (
    <form
      onSubmit={handleSubmit}
      className=" flex flex-col gap-2 p-5 max-w-xs w-full bg-slate-800 rounded-lg"
    >
      <div className=" text-center">
        <h3 className=" font-semibold">Sign In</h3>
      </div>
      <div>
        <hr className="my-3" />
      </div>
      <div>
        <div className=" flex flex-col gap-2">
          <label htmlFor="">Username</label>
          <input
            className=" text-black p-3 border border-slate-700 rounded-lg"
            type="text"
            onChange={(e) => setUserName(e.target.value)}
            value={username}
            id="username"
            placeholder="Username"
            required
          />
        </div>
      </div>
      <div className=" flex flex-col gap-2">
        <label htmlFor="">Password</label>
        <input
          className=" text-black p-3 border border-slate-700 rounded-lg"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          id="password"
          placeholder="Password"
          required
        />
      </div>
      <button
        type="submit"
        className=" mt-4 bg-slate-900 p-3 rounded-lg text-white"
      >
        Sign In
      </button>
    </form>
  );
}
export default Form;
