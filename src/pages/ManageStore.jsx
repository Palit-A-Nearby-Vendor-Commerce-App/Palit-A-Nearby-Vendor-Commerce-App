import React, { useContext } from "react";
import { UserContext } from "../UserContext";
import redRating from "../assets/images/redRating.png";

const ManageStore = () => {
    const { user, setUser } = useContext(UserContext);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <div style={{ display: 'flex' }}>
                <img
                    src={`data:image/png;base64, ${user.image}`}
                    alt="User"
                    className="w-14 h-15 rounded-full border-2 border-black"
                    onClick={handleMenu}
                />
                <div className="ml-3" style={{ flexDirection: 'column' }}>
                    <h2 className="text-xl font-semibold">Bentong's Kitchen</h2>
                    <p className="text-sm">Food</p>
                    <div className="flex">
                        <img src={redRating} alt="Rating" className="w-5 h-5" />
                        <p className="font-medium">4.8</p>
                    </div>
                </div>
            </div>
            <div className="p-2" style={{height: "90px"}}>
            <p className= "text-sm" style={{ textAlign: "justify" }}>Bentong’s Kariton combines the convenience of a mobile shop with the variety of a traditional Filipino convenience store.</p>
            </div>
            <h1 className="p-2 text-lg font-medium" style={{ fontSize: "25px", color: "#0071B3" }}>Products</h1>
            
        </div>
    );
}

export default ManageStore;
