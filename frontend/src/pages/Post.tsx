
import { capitalizeFirstLetter } from "../class/StringEdit";
function Post(props : {title : string , rank : string, text: string}) {

  const colourDic = new Map();
  colourDic.set('beginner','bg-green-300');
  colourDic.set('intermediate','bg-purple-300');
  colourDic.set('expert','bg-orange-300' )
  return (
    <div className="w-96 h-64 rounded-lg drop-shadow-lg bg-slate-300 p-2 m-2 transition-colors hover:bg-slate-500 flex flex-col overflow-hidden">
        <div className=" w-full h-1/3 flex flex-row m-2">
            <h1 className=" w-40 text-wrap break-words">{capitalizeFirstLetter(props.title)}</h1>
            <h3 className={`m-2 ${colourDic.get(props.rank)} rounded-lg p-2 text-center my-auto mx-auto`}>{`Class : ${capitalizeFirstLetter(props.rank)}`}</h3>
        </div>
        <hr className=" bg-black text-black"/>
        <div className="h-full">

        <p className="h-2/3 text-justify p-2 text-wrap overflow-scroll">{props.text}</p>
        </div>
        
    </div>
  )
}

export default Post