import ReactCodeMirror from "@uiw/react-codemirror";
import { useEffect, useState } from "react";
import { javascript } from "@codemirror/lang-javascript";
import { LuCopy } from "react-icons/lu";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { fetchSnipById } from "../snipThunk";

function ViewSnip() {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const { id: snipId } = useParams();
  const dispatch = useDispatch();
  //   const [searchParams, setSearchParams] = useSearchParams();
  //   const snipId = searchParams.get("snipId");
  const snip = useSelector((state) => state.snips.selectedSnip);

  useEffect(() => {
    if (snipId) {
      dispatch(fetchSnipById(snipId));

      if (snip) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setTitle(snip.title);
        setValue(snip.content);
      }
    }
  }, [snipId, snip, dispatch]);

  function copyToClipboard() {
    navigator.clipboard.writeText(value);
    toast.success("Copied to clipboard!", {
      id: "clipboard",
    });
  }


  return (
    <div className="w-full min-h-screen px-10 mt-6 mb-8 flex flex-col items-center gap-4">
      <h2 className="text-3xl font-bold">Viewing Snip</h2>
      <div className="w-[60%]  flex justify-center gap-4">
        <input
          type="text"
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled
          className="border border-gray-700 rounded-md cursor-not-allowed px-3 py-2 w-[70%]"
        />
        <button
          className="w-[20%]"
          onClick={() => {
            toast("You are in View Mode", {
              icon: "ℹ️",
              id: "viewMode",
            });
          }}
        >
          Create My Snip
        </button>
      </div>

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
          readOnly={true}
          editable={false}
          basicSetup={{
            foldGutter: true,
            highlightActiveLine: false,
          }}
          height="700px"
          theme={vscodeDark}
          extensions={[javascript()]}
          onChange={(e) => setValue(e)}
          className="text-lg cursor-not-allowed text-start border-[#333333] border rounded-md overflow-hidden "
        />
      </div>
    </div>
  );
}

export default ViewSnip;
