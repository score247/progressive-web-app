import * as React from "react";
import Layout from "../../components/layout";
import { LocalizedPage } from "../../common/helpers/Localizer";
import withLoadingPage from "../../hoc/with-loading-page";
import { CommonResourceKey, ResourceType } from "../../common/resources";

const SettingPage: LocalizedPage = ({ t }) => {
  const breadcrumbs = [t(CommonResourceKey.SETTINGS)];

  return (
    <Layout title="Setting" breadcrumbs={breadcrumbs}>
      <h1>Setting Page</h1>
    </Layout>
  );
};

SettingPage.getInitialProps = async () => {
  return {
    namespacesRequired: [ResourceType.COMMON]
  };
};

export default withLoadingPage(SettingPage);
