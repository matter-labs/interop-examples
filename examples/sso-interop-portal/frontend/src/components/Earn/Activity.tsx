import { useTranslation } from "react-i18next";

import type { FinalizedTxnState, PendingTxnState } from "~/utils/types";

interface Props {
  pendingTxns: PendingTxnState[];
  finalizedTxns: FinalizedTxnState[];
}

export function ActivityTab({ pendingTxns, finalizedTxns }: Props) {
  const { t } = useTranslation();

  if (pendingTxns.length > 0 || finalizedTxns.length > 0) {
    return (
      <div
        className="tab-content"
        id="activity-tab"
      >
        <div className="card">
          <div
            id="activity-title"
            className="card-title"
          >
            {t("earn.activity")}
          </div>
          <table
            className="tx-table"
            id="pending-txns-list"
          >
            <thead>
              <tr>
                <th>{t("earn.action")}</th>
                <th>{t("earn.depositAmount")}</th>
                <th>{t("earn.status")}</th>
                <th>{t("earn.finalizedAt")}</th>
              </tr>
            </thead>
            <tbody>
              {pendingTxns.map((tx) => (
                <tr key={tx.hash}>
                  <td>{tx.action}</td>
                  <td className="tx-amount">{tx.amount}</td>
                  <td>
                    <span className="tx-status tx-status--pending">{t("earn.pending")}</span>
                  </td>
                  <td>--</td>
                </tr>
              ))}
              {finalizedTxns.map((tx) => (
                <tr key={tx.l1FinalizeTxHash}>
                  <td>{t(`earn.${tx.action === "Deposit" ? "depositLabel" : "withdrawLabel"}`)}</td>
                  <td className="tx-amount">{parseFloat(tx.amount).toFixed(4)}</td>
                  <td>
                    <span className="tx-status tx-status--success">{t("earn.finalized")}</span>
                  </td>
                  <td className="tx-date">{new Date(tx.finalizedAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
