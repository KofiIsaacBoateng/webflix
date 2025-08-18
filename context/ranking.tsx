import React, { createContext, useContext, useState } from "react";

type Ranks = [any];
interface RankContextType {
  ranks:
    | {
        id: Ranks;
      }
    | {};
  update: (data: Ranks) => void;
}

const RankingContext = createContext<RankContextType | undefined>(undefined);

const RankingContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // eslint-disable-next-line
  const [ranks, setRanks] = useState<{ data: Ranks } | {}>({});

  const update = (data: Ranks) => {
    setRanks((prev) => data);
  };

  return (
    <RankingContext.Provider value={{ ranks, update }}>
      {children}
    </RankingContext.Provider>
  );
};

export const useRankingContext = () => useContext(RankingContext);
export default RankingContextProvider;
