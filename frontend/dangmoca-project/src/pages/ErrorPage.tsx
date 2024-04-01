import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
// import { motion } from "framer-motion";

export default function ErrorPage() {
  const navigate = useNavigate();
  return (
    <div className="h-screen flex flex-col items-center mx-auto">
        <h1 className="text-8xl">404</h1>
        <Button label="뒤로가기" onClick={() => navigate(-1)} />
    </div>
  );
}
