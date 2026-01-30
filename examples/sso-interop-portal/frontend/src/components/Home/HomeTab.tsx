import { type Dispatch, type SetStateAction, useEffect } from "react";
import { useTranslation } from "react-i18next";
import type { Address } from "viem";
import type { UseBalanceReturnType } from "wagmi";

import { loadExistingPasskey } from "~/utils/sso/passkeys";
import type { Tab } from "~/utils/tabs";
import type { PasskeyCredential } from "~/utils/types";

import { CreatePasskey } from "./CreatePasskey";
import { DeployAccount } from "./DeployAccount";
import { WalletInfo } from "./WalletInfo";

interface Props {
  setPasskeyCredentials: Dispatch<SetStateAction<PasskeyCredential | undefined>>;
  setAccountAddress: Dispatch<SetStateAction<Address | undefined>>;
  setActiveTab: (next: Tab) => void;
  balance: UseBalanceReturnType;
  isMounted: boolean;
  passkeyCredentials?: PasskeyCredential;
  accountAddress?: Address;
  shadowAccount?: Address;
}

export function HomeTab({
  setPasskeyCredentials,
  setAccountAddress,
  setActiveTab,
  accountAddress,
  shadowAccount,
  passkeyCredentials,
  balance,
  isMounted,
}: Props) {
  const { t } = useTranslation();

  useEffect(() => {
    const { savedPasskey, savedAccount } = loadExistingPasskey();
    if (savedPasskey) setPasskeyCredentials(savedPasskey);
    if (savedAccount) setAccountAddress(savedAccount);
  }, []);

  return (
    <div
      className="tab-content active"
      id="home-tab"
    >
      {isMounted && (!passkeyCredentials || !accountAddress) ? (
        <div id="setup-section">
          <div className="card">
            <div
              id="home-get-started"
              className="card-title"
            >
              {t("home.getStarted")}
            </div>
            <div
              id="home-setup-wallet"
              className="card-subtitle"
            >
              {t("home.setupWallet")}
            </div>
          </div>

          {/* <!-- Step 1: Create Passkey --> */}
          <CreatePasskey
            passkeyCredentials={passkeyCredentials}
            setPasskeyCredentials={setPasskeyCredentials}
          />

          {/* <!-- Step 2: Deploy Account --> */}
          <DeployAccount
            passkeyCredentials={passkeyCredentials}
            setAccountAddress={setAccountAddress}
          />
        </div>
      ) : (
        <>
          {accountAddress && shadowAccount ? (
            <WalletInfo
              accountAddress={accountAddress}
              shadowAccount={shadowAccount}
              balance={balance}
              setActiveTab={setActiveTab}
            />
          ) : (
            <div className="alert alert-error">Error: account address found but passkey is missing.</div>
          )}
        </>
      )}
    </div>
  );
}
