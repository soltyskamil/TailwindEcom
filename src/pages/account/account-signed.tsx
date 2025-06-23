import { useDispatch } from "react-redux";
import { store } from "../../store/main-store";

import AccountPanel from "../../components/Account/account-panel/account-panel";
const AccountSigned = () => {
  const { loggedIn } = store.getState().accountSliceReducer;
  const { login, name, surname } = loggedIn;

  return (
    <div className="account max-w-[1024px] m-auto mt-20 flex flex-col gap-4">
      <AccountPanel name={name} />
    </div>
  );
};

export default AccountSigned;
