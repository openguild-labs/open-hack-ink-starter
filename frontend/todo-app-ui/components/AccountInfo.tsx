"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useContractProvider } from "./ContractProvider";
import { InjectedAccount } from "@polkadot/extension-inject/types";

type Props = {};

const AccountInfo: React.FC<Props> = ({}) => {
  const { getActiveAccount } = useContractProvider();
  const [accountInfo, setAccountInfo] = useState<InjectedAccount | undefined>(
    undefined
  );

  useEffect(() => {
    getActiveAccount?.().then((acc) => {
      setAccountInfo(acc);
    });
  }, [getActiveAccount]);

  return (
    <div className="border p-3 rounded-md">
      <h1>Connected account</h1>
      <div>
        <p>Address: {accountInfo?.address}</p>
      </div>
    </div>
  );
};

export default AccountInfo;
