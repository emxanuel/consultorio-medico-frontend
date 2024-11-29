import { getSession } from "@auth0/nextjs-auth0";
import { redirect, RedirectType } from "next/navigation";
import { getAccounts } from "../features/accounts/get-accounts";
import { verifyUser } from "./verify-user";

export const verifyAndRedirect = async (
  accountKey?: string,
  isOnFinishRegister?: boolean,
  isOnHome?: boolean
) => {
  if (accountKey) {
    const session = await getSession();
    if (!session || !session.user) {
      redirect("/");
    }
    const user = session.user;
    const verified = await verifyUser(user?.email);

    if (!verified) {
      redirect("/");
    }
    return;
  }

  const session = await getSession();

  if (!isOnHome) {
    if (!session || !session.user) {
      redirect("/");
    }
  } else {
    if (!session || !session.user) {
      return;
    }
  }

  const user = session.user;
  const verified = await verifyUser(user?.email);

  if (!verified) {
    if (!isOnFinishRegister) {
      redirect("/finalizar-registro", RedirectType.push);
    } else {
      return;
    }
  }

  if (verified) {
    const accounts = await getAccounts(user?.email);

    if (
      accountKey &&
      !accounts.some((account) => account.account_key === accountKey)
    ) {
      redirect("/api/auth/logout");
    } else if (accounts.length > 1) {
      redirect("/seleccionar-cuenta");
    } else {
      redirect(`/${accounts[0].account_key}`);
    }
  }
};
