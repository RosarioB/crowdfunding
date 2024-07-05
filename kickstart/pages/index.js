import React from 'react';
import { CardGroup, Button } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Layout from '../components/Layout';
import Link from 'next/link';

const CampaignIndex = ({ campaigns }) => {
  const renderCampaigns = () => {
    const items = campaigns.map((address) => {
      return {
        header: address,
        description: (
          <Link
            href={{
              pathname: '/campaigns/[address]',
              query: { address },
            }}
          >
            View Campaign
          </Link>
        ),
        fluid: true,
      };
    });

    return <CardGroup items={items} />;
  };

  return (
    <Layout>
      <div>
        <h3>Open Campaigns</h3>
        <Link href='/campaigns/new'>
          <Button
            floated='right'
            content='Create Campaign'
            icon='add'
            primary
          />
        </Link>
        {renderCampaigns()}
      </div>
    </Layout>
  );
};

export async function getServerSideProps() {
  const campaigns = await factory.methods.getDeployedCampaigns().call();
  return { props: { campaigns } };
}

export default CampaignIndex;
