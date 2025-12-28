import ReactCodeMirror from "@uiw/react-codemirror";
import { useEffect, useState } from "react";
import { javascript } from "@codemirror/lang-javascript";
import { LuCopy } from "react-icons/lu";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addSnip, updateSnip } from "../snipSlice";

function Home() {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [type, setType] = useState("code");
  const [visibility, setVisibility] = useState("public");
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const snipId = searchParams.get("snipId");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const snips = useSelector((state) => state.snip.snips);

  function copyToClipboard() {
    navigator.clipboard.writeText(value);
    toast.success("Copied to clipboard!", {
      id: "clipboard",
    });
  }

  useEffect(() => {
    if (snipId && snips.length > 0) {
      const snip = snips.find((s) => s._id === snipId);

      if (snip) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setTitle(snip.title);
        setValue(snip.content);
        setVisibility(snip.visibility);
        setType(snip.type);
      }
    }
  }, [snipId, snips]);

  function handleCreateSnip() {
    setIsLoading(true);

    const normalizedTitle = title.trim().toLowerCase();

    if (normalizedTitle === "" || value.trim() === "") {
      toast.error("Title and Content are required!");
      setIsLoading(false);
      return;
    }

    const duplicateSnip = snips.find(
      (s) =>
        s.title.trim().toLowerCase() === normalizedTitle && s._id !== snipId // 🔥 THIS is the key fix
    );

    if (duplicateSnip) {
      toast.error("Snip with the same title already exists!");
      setIsLoading(false);
      return;
    }

    const snip = {
      title: title,
      content: value,
      type: type,
      visibility: visibility,
      _id: snipId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (snipId) {
      dispatch(updateSnip(snip));
      navigate("/snips");
    } else {
      dispatch(addSnip(snip));
    }

    setTitle("");
    setValue("");
    setSearchParams({});
    setIsLoading(false);
  }

  return (
    <div className="w-full min-h-screen px-10 mt-6 mb-8 flex flex-col items-center gap-4">
      <div className="w-[60%]  flex justify-center gap-4">
        <select
          name="type"
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="pl-2 w-[30%] pr-4 py-2 items-start border border-gray-700 rounded-md"
        >
          <option value="code" className="bg-gray-900 text-whitero rounded-md ">
            Code
          </option>
          <option value="text" className="bg-gray-900 text-whitero rounded-md ">
            Text
          </option>
        </select>
        <select
          name="type"
          id="type"
          value={visibility}
          onChange={(e) => setVisibility(e.target.value)}
          className="pl-2 w-[30%] pr-4 py-2 items-start border border-gray-700 rounded-md"
        >
          <option
            value="public"
            className="bg-gray-900 text-whitero rounded-md "
          >
            Public
          </option>
          <option
            value="private"
            className="bg-gray-900 text-whitero rounded-md "
          >
            Private
          </option>
        </select>
        <button
          onClick={handleCreateSnip}
          disabled={isLoading}
          className="w-[20%] "
        >
          {snipId ? "Update My Snip" : "Create My Snip"}
        </button>
      </div>
      <input
        type="text"
        placeholder="Enter Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border border-gray-700 rounded-md px-3 py-2 w-[70%]"
      />
      <div className="w-[70%] border bg-[#333333] border-[#333333] rounded-md">
        <div className="bg-[#333333] flex justify-between items-center px-4 py-3 rounded-t-md">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
            <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
          </div>
          <LuCopy
            className="cursor-pointer h-4 w-4"
            onClick={copyToClipboard}
          />
        </div>
        <ReactCodeMirror
          value={value}
          height="700px"
          basicSetup={{
            highlightActiveLine: false,
          }}
          theme={vscodeDark}
          extensions={[javascript()]}
          onChange={(e) => setValue(e)}
          className="text-lg text-start border-[#333333] border rounded-md overflow-hidden "
        />
      </div>
    </div>
  );
}

export default Home;
