import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie"; // ✅ Import js-cookie

const MeetRoom = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  interface UserInfo {
    fullName: string;
    email: string;
  }

  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(Cookies.get("accesstoken") || null); // ✅ Lấy token từ cookie

  const login = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(
        "https://localhost:7186/api/auth/login",
        { email, password },
        { withCredentials: true }
      );

      const token = response.data.data.token;
      setAuthToken(token);
      Cookies.set("accesstoken", token, { expires: 1 }); // ✅ Lưu token vào cookie trong 1 ngày
      setIsAuthenticated(true);
      setLoading(false);

      fetchUserInfo(token);
    } catch (err) {
      setError("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin!");
      setLoading(false);
    }
  };

  const fetchUserInfo = async (token: string) => {
    try {
      const response = await axios.get("https://localhost:7186/api/auth/user-info", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setUserInfo(response.data.data);
    } catch (error) {
      console.error("Lỗi lấy thông tin user", error);
    }
  };

  const createRoom = async () => {
    try {
      const response = await axios.post(
        "https://localhost:7186/api/meet/join-room-teacher",
        { lessonId: 2 },
        {
          headers: { Authorization: `Bearer ${authToken}` },
          withCredentials: true,
        }
      );

      navigate(`/client/demo/${response.data.data.roomCode}/${response.data.data.token}`);
    } catch (error) {
      console.error("Error creating room", error);
    }
  };

  const joinRoom = async () => {
    try {
      const response = await axios.post(
        "https://localhost:7186/api/meet/join-room-student",
        { lessonId: 2 },
        {
          headers: { Authorization: `Bearer ${authToken}` },
          withCredentials: true,
        }
      );

      navigate(`/client/demo/${response.data.data.roomCode}/${response.data.data.token}`);
    } catch (error) {
      console.error("Error joining room", error);
    }
  };

  useEffect(() => {
    if (authToken) {
      setIsAuthenticated(true);
      fetchUserInfo(authToken);
    }
  }, [authToken]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {!isAuthenticated ? (
        <div className="bg-white p-6 rounded shadow-md">
          <h2 className="text-xl font-bold mb-4">Đăng nhập</h2>
          <input
            type="email"
            placeholder="Email"
            className="border p-2 rounded w-full mb-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            className="border p-2 rounded w-full mb-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500">{error}</p>}
          <button
            onClick={login}
            disabled={loading}
            className="w-full bg-blue-500 text-white p-2 rounded mt-2"
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </div>
      ) : (
        <>
          <h1 className="text-2xl font-bold">Online Classroom</h1>
          {userInfo && (
            <p className="mt-2 text-lg">
              Xin chào, <strong>{userInfo.fullName}</strong> ({userInfo.email})
            </p>
          )}
          <button
            onClick={createRoom}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded shadow"
          >
            Create Room Or Join Room For Teacher
          </button>
          <button
            onClick={joinRoom}
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded shadow"
          >
            Join Room For Student
          </button>
        </>
      )}
    </div>
  );
};

export default MeetRoom;
