import * as React from "react";
import Layout from "../../components/layout";
import { LocalizedPage } from "../../common/helpers/Localizer";
import withLoadingPage from "../../hoc/with-loading-page";
import { CommonResourceKey, ResourceType } from "../../common/resources";

const TVPage: LocalizedPage = ({ t }) => {
  const breadcrumbs = [t(CommonResourceKey.BASKETBALL), t(CommonResourceKey.TV_SCHEDULES)];

  return (
    <Layout breadcrumbs={breadcrumbs}>
      <h1>Basketball - TV</h1>
    </Layout>
  );
};

TVPage.getInitialProps = async () => {
  return {
    namespacesRequired: [ResourceType.BASKETBALL]
  };
};

export default withLoadingPage(TVPage);
