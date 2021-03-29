import React, { useEffect } from "react";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import AttendancePage from "./page/attendancePage";
import GadgetPage from "./page/gadgetPage";
import HealthPage from "./page/healthPage";
import ProfilePage from "./page/profilePage";
import ProfileInfoPage from "./page/profileinfoPage";
import Register from "./page/register";
import LoginPage from "./page/loginPage";
import store from "./redux/store";
import { Provider } from "react-redux";
import HomePage from "./page/welcome";
import StockPage from "./page/stockPage";
import DocForm from "./page/docForm";
import NewPasswordPage from './page/newPassword'
import Protect from "./middleware/auth";
import ProtectTeach from "./middleware/teacher";
import ProtectLogin from "./middleware/redirect";
import ProtectAccount from "./middleware/accountant";
import PaymentPage from "./page/paymentPage";
import ResetPassPage from './page/resetPassPage'
import RootPage from './page/rootPage'
import QuitChildPage from "./page/quitChildPage";
import CreateUserPage from "./page/createUserPage";
import PrintAttendance from './printForm/attendance'
import PrintFormInvoice from './printForm/invoice'
import PrintSlip from './printForm/slip'

const Routes = () => {
  useEffect(() => {
    store.subscribe(
      () => { }
    );
  });
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/reset">
            <ResetPassPage />
          </Route>
          <Route exact path="/print/attendance">
            <PrintAttendance />
          </Route>
          <Route path="/reset/:token">
            <NewPasswordPage />
          </Route>
          <ProtectAccount exact path='/print/payment/:payment_id/invoice' component={PrintFormInvoice} />
          <ProtectAccount exact path='/print/payment/:payment_id/slip' component={PrintSlip} />

          <ProtectLogin exact path="/login" component={LoginPage} />
          <Protect exact path="/" component={RootPage} />

          <Protect
            exact
            path="/profileInfoPage/:id"
            component={ProfileInfoPage}
          />
          <ProtectAccount exact path="/paymentPage" component={PaymentPage} />
          <ProtectAccount exact path="/stockPage" component={StockPage} />
          <ProtectAccount exact path="/docPage/:id" component={DocForm} />
          <ProtectTeach exact path="/gadgetPage" component={GadgetPage} />
          <ProtectTeach exact path="/healthPage" component={HealthPage} />
          <ProtectTeach
            exact
            path="/attendancePage"
            component={AttendancePage}
          />
          <Protect exact path="/home/:id/:name" component={HomePage} />

          <Protect
            exact
            path="/profilePage"
            component={ProfilePage}
          />

          <Protect
            exact
            path="/quitChildPage"
            component={QuitChildPage}
          />
          <Protect
            exact
            path="/createUserPage"
            component={CreateUserPage}
          />

          <ProtectAccount exact path="/registerPage" component={Register} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default Routes;
