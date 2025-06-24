import React from "react";
import { store } from "../../store/main-store";

import AccountLoggedOut from "./account-logged-out";
import AccountSigned from "./account-signed";
import { useSelector } from "react-redux";
const Account = () => {
  const { loggedIn } = useSelector((state: any) => state.accountSliceReducer);

  return (
    <div className="wrapper">
      {loggedIn.status && <AccountSigned />}
      {!loggedIn.status && <AccountLoggedOut />}
    </div>
  );
};

export default Account;
