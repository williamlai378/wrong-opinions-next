
import StaffCard from "./StaffCard"

const StaffSection = (props) => {
    const staffData = props.data.filter((staff, index) => index < props.index)
    return (
        <div className="flex flex-col w-full my-4">
            <h3 className="mb-2">Staff</h3>
            <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-3">
                {staffData.map((staff) => {
                    return (
                        <StaffCard
                            key={staff.id}
                            staff={staff} />
                    )
                })}
            </div>
        </div>
    )
}

export default StaffSection;