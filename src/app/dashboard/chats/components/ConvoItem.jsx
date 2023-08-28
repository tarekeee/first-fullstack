

export default function ConvoItem({id, name, image, active, lastMessage, selected,setActiveChat }) {
  return (
    <div onClick={() => {setActiveChat(id);}} className="w-full h-16 hover:bg-gray-100 flex items-center p-3" style={{"marginLeft" : (selected ? "1rem" : "0rem"), "borderLeft" : (selected ? "black solid" : "")}}>
      <div className="relative">
        {active ? <svg height="12" width="12" className="absolute left-[34px] top-[1px]" >
          <circle
            cx="6"
            cy="6"
            r="6"
            fill="#00b300"
          />
        </svg> : null}
        <img src={image} height={45} width={45} className="rounded-full" />
      </div>
      <div className="ml-2 flex flex-col">
        <span className="mb-[-0.5rem] text-lg">{name}</span>
        <span className="">last message</span>
      </div>
    </div>
  );
}
