import {
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect,
  useMemo,
} from "react";
import PocketBase, {type RecordModel, type RecordAuthResponse} from "pocketbase";
import { useInterval } from "usehooks-ts";
import { jwtDecode } from "jwt-decode";
import ms from "ms";

const BASE_URL = import.meta.env.VITE_POCKETBASE_URL;
const fiveMinutesInMs = Number(ms("5 minutes"));
const twoMinutesInMs = Number(ms("2 minutes"));

type PocketContextType = {
  register: (email: string, password: string) => Promise<RecordModel>;
  login: (email: string, password: string) => Promise<RecordAuthResponse<RecordModel>>;
  logout: () => void;
  user: RecordModel | null;
  token: string;
  pb: PocketBase;
};

const PocketContext = createContext({} as PocketContextType);

export const PocketProvider = (
  { children }: { children: React.ReactNode }
) => {
  const pb = useMemo(() => new PocketBase(BASE_URL), []);
  const [token, setToken] = useState(pb.authStore.token);
  const [user, setUser] = useState(pb.authStore.record);

  // Event listener for auth store changes
  useEffect(() => {
    return pb.authStore.onChange((token, record) => {
      setToken(token);
      setUser(record);
    });
  }, [pb.authStore]);

  const register = useCallback(async (email: string, password: string) => {
    return await pb
      .collection("users")
      .create({ email, password, passwordConfirm: password });
  }, [pb]);

  const login = useCallback(async (email: string, password: string) => {
    return await pb.collection("users").authWithPassword(email, password);
  }, [pb]);

  const logout = useCallback(() => {
    pb.authStore.clear();
  }, [pb]);

  const refreshSession = useCallback(async () => {
    if (!pb.authStore.isValid) return;
    const decoded: { exp?: number } = jwtDecode(token);
    const tokenExpiration = decoded.exp;

    // Ensure fiveMinutesInMs is a number and decoded.exp is defined
    if (typeof tokenExpiration === "number") {
      const expirationWithBuffer = (tokenExpiration + Number(fiveMinutesInMs) / 1000);
      if (tokenExpiration < expirationWithBuffer) {
        await pb.collection("users").authRefresh();
      }
    }
  }, [pb, token]);

  useInterval(refreshSession, token ? twoMinutesInMs : null);

  return (
    <PocketContext.Provider
      value={{ register, login, logout, user, token, pb }}
    >
      {children}
    </PocketContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const usePocket: () => PocketContextType = () => useContext(PocketContext);
