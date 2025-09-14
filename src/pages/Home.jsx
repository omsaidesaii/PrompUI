import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Select from "react-select";
import { BsStars } from "react-icons/bs";
import { HiOutlineCode } from "react-icons/hi";
import Editor from "@monaco-editor/react";
import { IoCloseSharp, IoCopy } from "react-icons/io5";
import { PiExportBold } from "react-icons/pi";
import { ImNewTab } from "react-icons/im";
import { FiRefreshCcw } from "react-icons/fi";
import { GoogleGenAI } from "@google/genai";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

const Home = () => {
  const options = [
    { value: "html-css", label: "HTML + CSS" },
    { value: "html-tailwind", label: "HTML + Tailwind CSS" },
    { value: "html-bootstrap", label: "HTML + Bootstrap" },
    { value: "html-css-js", label: "HTML + CSS + JS" },
    { value: "html-tailwind-bootstrap", label: "HTML + Tailwind + Bootstrap" },
  ];

  const [outputScreen, setOutputScreen] = useState(false);
  const [tab, setTab] = useState(1);
  const [prompt, setPrompt] = useState("");
  const [framework, setFramework] = useState(options[0]);
  const [code, setCode] = useState("<!-- Your generated code will appear here -->");
  const [loading, setLoading] = useState(false);
  const [isNewTabOpen, setIsNewTabOpen] = useState(false);

  const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_API_KEY });

  const extractCode = (response) => {
    const match = response.match(/```(?:\w+)?\n([\s\S]*?)```/);
    return match ? match[1].trim() : response.trim();
  };

  const getResponse = async () => {
    if (!prompt.trim()) {
      toast.error("Please describe your component first.");
      return;
    }
    setLoading(true);
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `You are an experienced programmer with expertise in web development and UI/UX design. You create modern, animated, and fully responsive UI components.\n\nGenerate a UI component for: ${prompt}\nFramework to use: ${framework.value}\n\nRequirements:\n- Clean, well-structured, easy-to-understand code\n- Optimize for SEO where applicable\n- Modern, animated, responsive UI design\n- High-quality hover effects, shadows, animations, colors, typography\n- Return ONLY the code in Markdown fenced code blocks\n- Provide the entire component in a single HTML file`,
      });
      setCode(extractCode(response.text));
      setOutputScreen(true);
    } catch (error) {
      toast.error("Failed to generate code.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      toast.success("Code copied to clipboard");
    } catch {
      toast.error("Failed to copy code");
    }
  };

  const downloadFile = () => {
    const blob = new Blob([code], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "PrompUI-code.html";
    link.click();
    URL.revokeObjectURL(url);
    toast.success("File downloaded");
  };

  return (
    <>
      <Navbar />
      <div className="flex px-[60px] gap-10 justify-between max-lg:flex-col">
        {/* Left Panel */}
        <div className="w-1/2 max-lg:w-full py-8 px-6 rounded-2xl bg-gradient-to-b from-[#1a191f] to-[#141319] shadow-lg mt-6 border border-zinc-800">
          <h3 className="text-3xl font-bold text-white">AI Component Generator</h3>
          <p className="text-gray-400 mt-3 text-base leading-relaxed">
            Describe your component, choose a framework, and let AI generate modern UI code.
          </p>

          <p className="text-sm font-semibold mt-6">Framework</p>
          <Select
            className="mt-3"
            defaultValue={framework}
            options={options}
            onChange={(opt) => setFramework(opt)}
            styles={{
              control: (base) => ({
                ...base,
                backgroundColor: "#111",
                borderColor: "#333",
                color: "#fff",
                borderRadius: "0.75rem",
                padding: "4px",
                boxShadow: "none",
                "&:hover": { borderColor: "#666" },
              }),
              menu: (base) => ({
                ...base,
                backgroundColor: "#1c1b20",
                color: "#fff",
                borderRadius: "0.75rem",
                overflow: "hidden",
              }),
              option: (base, state) => ({
                ...base,
                backgroundColor: state.isSelected
                  ? "#6d28d9"
                  : state.isFocused
                  ? "#2d2b33"
                  : "transparent",
                color: "#fff",
                padding: "10px 14px",
                cursor: "pointer",
              }),
              singleValue: (base) => ({ ...base, color: "#fff" }),
              placeholder: (base) => ({ ...base, color: "#aaa" }),
              input: (base) => ({ ...base, color: "#fff" }),
            }}
          />

          <p className="text-sm font-semibold mt-6">Describe your component</p>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full min-h-[180px] rounded-xl bg-[#09090B] mt-3 p-4 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 resize-none"
            placeholder="E.g. A responsive card with hover effects and smooth animations"
          ></textarea>

          <div className="flex items-center justify-between mt-5">
            <p className="text-gray-400 text-sm italic">
              Click Generate to create your component.
            </p>
            <button
              onClick={getResponse}
              disabled={loading}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-purple-700 text-white font-semibold shadow-md hover:shadow-purple-700/40 transition-all disabled:opacity-50 cursor-pointer"
            >
              {loading ? <ClipLoader color="white" size={20} /> : <BsStars />}
              Generate
            </button>
          </div>
        </div>

        {/* Right Panel */}
        <div className="relative w-1/2 max-lg:w-full h-[80vh] bg-gradient-to-b from-[#1a191f] to-[#141319] mt-6 rounded-2xl border border-zinc-800 shadow-lg overflow-hidden">
          {!outputScreen ? (
            <div className="w-full h-full flex flex-col items-center justify-center gap-4 text-gray-400">
              <div className="p-5 w-[80px] h-[80px] rounded-full bg-gradient-to-r from-purple-400 to-purple-600 flex items-center justify-center text-4xl text-white animate-pulse">
                <HiOutlineCode />
              </div>
              <p className="text-lg font-medium">Your component & code will appear here</p>
            </div>
          ) : (
            <>
              {/* Tabs */}
              <div className="w-full h-[55px]  bg-[#17171C] flex gap-2 p-2 items-center rounded-t-2xl overflow-hidden">
                <button
                  onClick={() => setTab(1)}
                  className={`w-1/2 py-2 cursor-pointer rounded-lg text-sm font-medium transition-all ${
                    tab === 1 ? "bg-purple-600 text-white" : "hover:bg-[#222] text-gray-300"
                  }`}
                >
                  Code
                </button>
                <button
                  onClick={() => setTab(2)}
                  className={`w-1/2 py-2 cursor-pointer  text-sm rounded-lg font-medium transition-all ${
                    tab === 2 ? "bg-purple-600 text-white" : "hover:bg-[#222] text-gray-300"
                  }`}
                >
                  Preview
                </button>
              </div>

              {/* Toolbar */}
              <div className="w-full h-[55px] bg-[#17171C] flex items-center justify-between px-5 border-b border-zinc-800">
                <p className="font-bold text-sm text-gray-200">Code Editor</p>
                <div className="flex items-center gap-2">
                  {tab === 1 ? (
                    <>
                      <button
                        onClick={copyCode}
                        className="w-9 h-9 rounded-lg border border-zinc-700 flex items-center justify-center hover:bg-purple-600 hover:text-white transition-all"
                      >
                        <IoCopy />
                      </button>
                      <button
                        onClick={downloadFile}
                        className="w-9 h-9 rounded-lg border border-zinc-700 flex items-center justify-center hover:bg-purple-600 hover:text-white transition-all"
                      >
                        <PiExportBold />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => setIsNewTabOpen(true)}
                        className="w-9 h-9 rounded-lg border border-zinc-700 flex items-center justify-center hover:bg-purple-600 hover:text-white transition-all"
                      >
                        <ImNewTab />
                      </button>
                      <button className="w-9 h-9 rounded-lg border border-zinc-700 flex items-center justify-center hover:bg-purple-600 hover:text-white transition-all">
                        <FiRefreshCcw />
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Editor / Preview */}
              <div className="h-[calc(100%-110px)]">
                {tab === 1 ? (
                  <Editor value={code} height="100%" theme="vs-dark" language="html" />
                ) : (
                  <iframe
                    srcDoc={code}
                    className="w-full h-full bg-white text-black rounded-b-2xl"
                  ></iframe>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Fullscreen Preview */}
      {isNewTabOpen && (
        <div className="absolute inset-0 bg-white w-screen h-screen overflow-auto z-50">
          <div className="text-black w-full h-[60px] flex items-center justify-between px-5 bg-gray-100 shadow-md">
            <p className="font-bold">Preview</p>
            <button
              onClick={() => setIsNewTabOpen(false)}
              className="w-10 h-10 rounded-xl border border-zinc-300 flex items-center justify-center hover:bg-gray-200"
            >
              <IoCloseSharp />
            </button>
          </div>
          <iframe srcDoc={code} className="w-full h-[calc(100vh-60px)]"></iframe>
        </div>
      )}
    </>
  );
};

export default Home;
