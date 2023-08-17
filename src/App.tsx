import React, { useState } from 'react';
// import './App.css';
import Catalog from './components/Catalog';
import Main from './components/Pages/Main';
import { Service_card } from './components/Pages/Service_card';
import { Issue_Card } from './components/Pages/Issue_card';
import Checks from './components/Pages/Checks';
import InstanceCard from "./components/Pages/Instance_card";
import TechChecks from "./components/Pages/TechChecks";
import LogsMetrics from "./components/Pages/LogsMetrics";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HowToFill from './components/new_application/how_to_fill';
import ProdInfo from './components/new_application/prod_info';
import Individual from './components/new_application/faces/individual';
import Entity from './components/new_application/faces/entity';
import RegRosPo from './components/new_application/reg_ros_po/reg_ros_po';
import RegRosPoNo from './components/new_application/reg_ros_po/reg_ros_po_no';
import RegRosPoYes from './components/new_application/reg_ros_po/reg_ros_po_yes';
import CpHar from './components/new_application/cp_har';
import CpInfo from './components/new_application/cp_info';
import CpGostVpn from './components/new_application/cp_gost_vpn';
import CpSzi from '../src/components/new_application/cp_reg_szi/cp_szi'
import DevGost from './components/new_application/development_gost';
import IbInfo from './components/new_application/ib_info';
import TrustMark from './components/new_application/trust_mark';
import ProdDocs from './components/new_application/prod_docs';
import OrderNumber from './components/new_application/order_number';
import CpRegSzi from './components/new_application/cp_reg_szi/cp_reg_szi';
import CpDocs from './components/new_application/cp_docs';
import CpDefInfo from './components/new_application/cp_def_info';
import CertOfDef from './components/new_application/cert_of_def';
import WhereGotCert from './components/new_application/where_got_cert';
import CertFstek from './components/new_application/cert_fstek';
import CertFsb from './components/new_application/cert_fsb';
import CpGostTls from './components/new_application/cp_gost_tls';
import CpTrueCOnnect from './components/new_application/cp_true_connect';
import CpMarkTrust from './components/new_application/cp_mark_trust';
import CpMarkPo from './components/new_application/cp_mark_po';
import { NewAppProvider } from './components/context_for_application';
import EntityCheks from './components/entity_checks/entity_checks';
import InstanceComment from './components/Pages/instance_commmet_new';
import LoginRegistration from './components/login-registration/LoginRegistration';
import Requirements from './components/Pages/Requirements';




function App() {
  return (
    <>
      <NewAppProvider>
        <Router>
          <Routes>
            {/* <Route path="/" element={<Main />} /> */}
            <Route path="/" element={<Catalog />} />
            <Route path="/services/issue/:id" element={<Issue_Card />} />
            <Route path="/services/service/:id" element={<Service_card />} />
            <Route path="/services/service/:id/list_of_checks/:id_check" element={<Checks />} />
            <Route path="/service/:id/tech_settings" element={<TechChecks />} />
            <Route path="/services/service/:id/list_of_checks/:id_check/instance/:id_instance" element={<InstanceCard />} />
            {/* <Route path="/services/:id/:logs_metrics" element={<LogsMetrics />} /> */}
            <Route path="/how_to_fill" element={<HowToFill />} />
            <Route path="/prod_info" element={<ProdInfo />} />
            <Route path="/individual" element={<Individual />} />
            <Route path="/entity" element={<Entity />} />
            <Route path="/reg_ros_po" element={<RegRosPo />} />
            <Route path="/reg_ros_po_yes" element={<RegRosPoYes />} />
            <Route path="/reg_ros_po_no" element={<RegRosPoNo />} />
            <Route path="/cp_har" element={<CpHar />} />
            <Route path="/cp_info" element={<CpInfo />} />
            <Route path="/cp_gost_vpn" element={<CpGostVpn />} />
            <Route path="/cp_szi" element={<CpSzi />} />
            <Route path="/cp_reg_szi" element={<CpRegSzi />} />
            <Route path="/cp_def_info" element={<CpDefInfo />} />
            <Route path="/cert_of_def" element={<CertOfDef />} />
            <Route path="/where_got_cert" element={<WhereGotCert />} />
            <Route path="/cert_fstek" element={<CertFstek />} />
            <Route path="/cert_fsb" element={<CertFsb />} />
            <Route path="/dev_gost" element={<DevGost />} />
            <Route path="/cp_gost_tls" element={<CpGostTls />} />
            <Route path="/cp_true_connect" element={<CpTrueCOnnect />} />
            <Route path="/ib_info" element={<IbInfo />} />
            <Route path="/trust_mark" element={<TrustMark />} />
            <Route path="/cp_mark_trust" element={<CpMarkTrust />} />
            <Route path="/cp_mark_po" element={<CpMarkPo />} />
            <Route path="/prod_docs" element={<ProdDocs />} />
            <Route path="/cp_docs" element={<CpDocs />} />
            <Route path="/order_number" element={<OrderNumber />} />
            <Route path="/login-registration" element={<LoginRegistration />} />
            <Route path="/requirements" element={<Requirements />} />
          </Routes>
        </Router>
      </NewAppProvider>
    </>
  )
}

export default App;
