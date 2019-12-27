import * as React from "react";
import Layout from "../../components/layout";
import { LocalizedPage, withTranslation } from "../../common/helpers/Localizer";
import { ResourceType, ResourceKey } from "../../common/constants";

const LeaguesPage: LocalizedPage = ({ t }) => {
  const breadcrumbs = [t(ResourceKey.SOCCER), t(ResourceKey.LEAGUES)];

  return (
    <Layout breadcrumbs={breadcrumbs}>
      <h1>Soccer - Leagues</h1>
    </Layout>
  );
};

LeaguesPage.getInitialProps = async () => {
  return {
    namespacesRequired: [ResourceType.SOCCER]
  };
};

export default withTranslation()(LeaguesPage);
