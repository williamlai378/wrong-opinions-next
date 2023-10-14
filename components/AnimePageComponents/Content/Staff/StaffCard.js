
import Image from "next/image"

const StaffCard = ({staff}) => {
    
    return (
        <div className="flex w-full items-center bg-slate-300 rounded-lg h-[95px] shadow-md shadow-purple-300 ">
            <div className={`relative h-full aspect-9/12 mr-1 md:mr-2`}>
                <Image
                    fill
                    className="object-cover"
                    src={staff.node.image.large}
                    sizes={"(max-width: 640px) 50px"}
                    alt={staff.node.name.userPreferred} />

            </div>
            <div className={`flex flex-col overflow-hidden h-full justify-around`}>
                <a 
                    className="group"
                    target={staff.node.name.userPreferred}
                    href={`${staff.node.siteUrl}`}>
                    <p 
                        target={staff.node.name.userPreferred}
                        className="text-black w-full 
                        overflow-hidden text-ellipsis 
                        whitespace-nowrap group-hover:text-blue-400 
                        text-lg font-bold">
                    {staff.node.name.userPreferred}
                    </p>
                </a>
                <p className="text-md font-extralight">{staff.role}</p>
            </div>
        </div>
    )
}

export default StaffCard;