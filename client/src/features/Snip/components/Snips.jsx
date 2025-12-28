import { useState } from "react";
import { FaEdit, FaEye } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { GrEdit } from "react-icons/gr";
import { IoShareSocial } from "react-icons/io5";
import { LuCopy } from "react-icons/lu";
import { MdDeleteForever, MdPrivateConnectivity } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import ActionIcon from "../../../shared/components";
import { CiCalendarDate } from "react-icons/ci";
import { HiMiniCalendarDateRange } from "react-icons/hi2";
import toast from "react-hot-toast";
import { removeSnip } from "../snipSlice";
import { Navigate, useNavigate } from "react-router-dom";

function Snips() {
  const [searchTerm, setSearchTerm] = useState("");
  const snips = useSelector((state) => state.snip.snips);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const filteredSnips = snips.filter((snip) =>
    snip.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function onEditSnip(snipId) {
    navigate(`/?snipId=${snipId}`);
  }

  const confirmDelete = (id) => {
    dispatch(removeSnip(id));
  };

  function onDeleteSnip(snipId) {
    toast(
      (t) => (
        <div className="flex flex-col gap-4 justify-center items-center ">
          <span className="font-medium text-slate-100">
            Delete this snip permanently?
          </span>
          <div className="flex gap-2 justify-end">
            {/* "No" Button - Just dismisses the toast */}
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-3! py-1! text-xs! bg-slate-700! hover:bg-slate-600! rounded-md! text-white! transition-colors!"
            >
              Cancel
            </button>
            {/* "Yes" Button - Triggers the actual delete logic */}
            <button
              onClick={() => {
                confirmDelete(snipId);
                toast.dismiss(t.id);
              }}
              className="px-3! py-1! text-sm! bg-red-600! hover:bg-red-500! rounded-md! text-white! font-bold! transition-colors!"
            >
              Delete
            </button>
          </div>
        </div>
      ),
      {
        duration: 6000,
        position: "bottom-center",
        style: {
          background: "#333333",
          border: "1px solid #444",
          padding: "16px",
        },
      }
    );
  }

  function onViewSnip(snipId) {
    navigate(`/snips/${snipId}`);
  }

  function onShareSnip(snipId) {
    const shareUrl = `${window.location.origin}/snips/${snipId}`;

    const handleCopy = (toastId) => {
      navigator.clipboard.writeText(shareUrl);
      toast.success("Link copied! Share it with others.");
      toast.dismiss(toastId); 
    };

    toast(
      (t) => (
        <div className="flex flex-col gap-3 w-full">
          <label className="text-gray-100 text-sm">Share Link</label>
          <div className="flex items-center gap-2">
            <input
              readOnly
              value={shareUrl}
              className="flex-1 bg-slate-700 border border-gray-600 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            />

            <button
              onClick={() => handleCopy(t.id)} 
              className="p-3 bg-blue-600 hover:bg-blue-700 rounded-md text-white transition-colors flex items-center justify-center"
              title="Copy Link"
            >
              <LuCopy size={16} />
            </button>

            <button
              onClick={() => toast.dismiss(t.id)}
              className="p-2 bg-slate-600 hover:bg-slate-500 rounded-md text-gray-300 hover:text-white transition-colors flex items-center justify-center"
              title="Close"
            >
              Close
            </button>
          </div>
        </div>
      ),
      {
        id:"shareSnip",
        duration: 8000, 
        position: "top-right",
        style: {
          background: "#1f2937", 
          border: "1px solid #4b5563",
          padding: "16px",
          width: "auto", 
          minWidth: "400px",
        },
      }
    );
  }

  function onCopySnip(value) {
    navigator.clipboard.writeText(value);
    toast.success("Copied to clipboard!", {
      id: "clipboard",
    });
  }

  return (
    <div className="w-full min-h-screen px-10 mt-6 mb-8 flex flex-col items-center gap-4">
      <div className="relative w-[50%]">
        {/* Search Icon */}
        <FiSearch
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={18}
        />

        {/* Input */}
        <input
          type="text"
          placeholder="Search snips..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-700 rounded-md  text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="w-[80%] border border-gray-400 rounded-sm  ">
        <div className="text-start text-3xl font-bold py-6 px-4">All Snips</div>
        <div>
          {filteredSnips.length > 0 ? (
            filteredSnips.map((snip) => {
              return (
                <div
                  key={snip._id}
                  className="border-t border-gray-400 px-4 py-3 hover:bg-slate-800   text-start"
                >
                  <div className="flex justify-between items-center">
                    <div className="text-2xl font-semibold flex gap-2 items-center">
                      {snip.visibility === "private" ? (
                        <MdPrivateConnectivity />
                      ) : (
                        ""
                      )}
                      <span
                        className={`px-2 py-0.5 text-[10px] uppercase font-bold rounded-md border ${
                          snip.visibility === "private"
                            ? "bg-amber-900/30 text-amber-500 border-amber-800"
                            : "bg-blue-900/30 text-blue-500 border-blue-800"
                        }`}
                      >
                        {snip.visibility}
                      </span>
                      {snip.title}
                    </div>
                    <div className="flex gap-4 ">
                      <ActionIcon
                        Icon={GrEdit}
                        onClick={() => onEditSnip(snip._id)}
                      />
                      <ActionIcon
                        Icon={MdDeleteForever}
                        onClick={() => onDeleteSnip(snip._id)}
                      />
                      <ActionIcon
                        Icon={FaEye}
                        onClick={() => onViewSnip(snip._id)}
                      />
                      <ActionIcon
                        Icon={IoShareSocial}
                        onClick={() => onShareSnip(snip._id)}
                      />
                      <ActionIcon
                        Icon={LuCopy}
                        onClick={() => onCopySnip(snip.content)}
                      />
                    </div>
                  </div>

                  <div className="flex justify-between mt-3">
                    <div className="text-gray-500 w-1/2 line-clamp-3 overflow-hidden text-ellipsis">
                      {snip.content}
                    </div>
                    <div className="flex flex-col justify-start items-end gap-2">
                      <div className="flex gap-1 items-center">
                        <HiMiniCalendarDateRange />
                        {formatter.format(new Date(snip.createdAt))}
                      </div>
                      <div
                        className={`text-md font-medium  ${
                          snip.type === "code"
                            ? "text-green-600"
                            : "text-amber-600"
                        }`}
                      >
                        {snip.type.toUpperCase()}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="border-t border-gray-400 px-4 py-3 text-2xl  text-amber-800">
              No snips found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Snips;
