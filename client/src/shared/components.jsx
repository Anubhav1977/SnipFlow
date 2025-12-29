// eslint-disable-next-line no-unused-vars
function ActionIcon({ Icon, onClick }) {
  return (
    <Icon
      onClick={onClick}
      className="cursor-pointer border border-gray-400 p-1.5 text-3xl 
                 rounded-md transition-transform duration-200 
                 hover:scale-110 hover:border-gray-300 active:scale-95"
    />
  );
}

export default ActionIcon;
