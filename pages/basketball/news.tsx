import * as React from "react";
import Layout from "../../components/layout";
import { LocalizedPage } from "../../common/helpers/Localizer";
import withLoadingPage from "../../hoc/with-loading-page";
import { CommonResourceKey, ResourceType } from "../../common/resources";

const NewsPage: LocalizedPage = ({ t }) => {
  const breadcrumbs = [t(CommonResourceKey.BASKETBALL), t(CommonResourceKey.NEWS)];

  return (
    <Layout breadcrumbs={breadcrumbs}>
      <h1>Basketball - News</h1>
    </Layout>
  );
};

NewsPage.getInitialProps = async () => {
  return {
    namespacesRequired: [ResourceType.BASKETBALL]
  };
};

export default withLoadingPage(NewsPage);
