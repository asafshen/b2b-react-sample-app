import { theme, Typography } from "antd";
import {
    MdAttachMoney
  } from "react-icons/md"
import { useNavigate } from "react-router-dom";

const Pay = () => {
  const { useToken } = theme;
  const { token } = useToken();
const navigate = useNavigate();
  

  return (
    <section
      className="card-section"
      onClick={() => {
        console.log("Pay");
        navigate("/transfer");
      }}
      style={{ 
        background: token.colorBgContainer, 
        cursor: "pointer",
        border: "2px solid #f0f0f0",
     }}
    >
      <div className="card-container">
        <div className="card-icon">
            <MdAttachMoney/>
        </div>
        <div>
          <Typography className="card-value">Transfer Money</Typography>
        </div>
      </div>
    </section>
  );
};

export default Pay;
