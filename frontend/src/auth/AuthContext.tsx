import {
  createContext,
  useContext,
  useState,
  useEffect
} from "react";

import { jwtDecode }
  from "jwt-decode";


interface DecodedToken {

  sub: string;

  role: string;

  user_id: number;
}


interface AuthContextType {

  token: string | null;

  user: DecodedToken | null;

  loading: boolean;

  login: (
    token: string
  ) => void;

  logout: () => void;
}


const AuthContext =
  createContext<AuthContextType | null>(
    null
  );


export function AuthProvider({

  children

}: {
  children: React.ReactNode
}) {

  const [token, setToken] =
    useState<string | null>(null);

  const [user, setUser] =
    useState<DecodedToken | null>(
      null
    );

  const [loading, setLoading] =
    useState(true);


  useEffect(() => {

    const storedToken =
      localStorage.getItem(
        "token"
      );

    if (storedToken) {

      setToken(storedToken);

      setUser(
        jwtDecode(storedToken)
      );
    }

    setLoading(false);

  }, []);


  const login = (
    newToken: string
  ) => {

    localStorage.setItem(
      "token",
      newToken
    );

    setToken(newToken);

    setUser(
      jwtDecode(newToken)
    );
  };


  const logout = () => {

    localStorage.removeItem(
      "token"
    );

    setToken(null);

    setUser(null);
  };


  return (

    <AuthContext.Provider
      value={{
        token,
        user,
        loading,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}


export function useAuth() {

  const context =
    useContext(AuthContext);

  if (!context) {

    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}