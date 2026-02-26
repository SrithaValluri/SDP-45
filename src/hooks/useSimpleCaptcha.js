// src/hooks/useSimpleCaptcha.js
import { useState, useEffect } from "react";

export const useSimpleCaptcha = () => {
  const [captcha, setCaptcha] = useState("");
  const [input, setInput] = useState("");

  const regenerate = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let code = "";
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptcha(code);
    setInput("");
  };

  useEffect(() => {
    regenerate();
  }, []);

  const isValid = () =>
    input.trim().toUpperCase() === captcha.toUpperCase();

  return { captcha, input, setInput, regenerate, isValid };
};
