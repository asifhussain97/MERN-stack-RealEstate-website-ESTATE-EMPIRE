import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../utils/redux/app/store";
import { useNavigate } from "react-router-dom";

type RouteProps = {
  children: React.ReactNode;
};

const AgentAuth: React.FC<RouteProps> = ({ children }) => {
  const agent = useSelector((state: RootState) => state.agent);
  const navigate = useNavigate();

  useEffect(() => {
    if (!agent.agentToken) {
      navigate("/agent/login");
    }
  }, [agent.agentToken, navigate]);

  if (agent.agentToken) {
    return <>{children}</>;
  }
  
  // Optionally, you can return null or some loading indicator here
  return null;
};

export default AgentAuth;