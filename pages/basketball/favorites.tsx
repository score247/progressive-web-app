import * as React from "react";
import Layout from "../../components/shared/layout/Layout";
import { useTranslation, LocalizedPage } from "../../common/helpers/Localizer";

const FavoritesPage: LocalizedPage = () => {
  const { t } = useTranslation();
  return (
    <Layout>
      <div>FavoritesPage</div>
    </Layout>
  );
};

FavoritesPage.getInitialProps = async () => {
  return {
    namespacesRequired: ["esports"]
  };
};

export default FavoritesPage;