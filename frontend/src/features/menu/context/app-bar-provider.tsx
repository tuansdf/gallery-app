import {
  Dispatch,
  PropsWithChildren,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

interface AppBarValues {
  trailing: ReactNode;
  setTrailing: Dispatch<SetStateAction<ReactNode>>;
}

export const AppBarContext = createContext<AppBarValues>({
  trailing: null,
  setTrailing: () => {},
});

const AppBarProvider = ({ children }: PropsWithChildren) => {
  const [trailing, setTrailing] = useState<ReactNode>(null);

  return (
    <AppBarContext.Provider value={{ trailing, setTrailing }}>
      {children}
    </AppBarContext.Provider>
  );
};

export default AppBarProvider;
