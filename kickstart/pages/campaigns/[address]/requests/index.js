import React from "react";
import { Button } from "semantic-ui-react";
import Link from "next/link";
import Layout from "../../../../components/Layout";
import Campaign from "../../../../ethereum/campaign";

const RequestIndex = ({ address }) => {
  
return (
    <Layout>
      <h3>Requests</h3>
      <Link href={`/campaigns/${address}/requests/new`}>
        <Button primary>Add Request</Button>
      </Link>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const { address } = context.params;
  const campaign = Campaign(address);
  const requestsCount = await campaign.methods.getRequestsCount().call();
  const requests = await Promise.all(
    Array(requestsCount).fill().map((element, index) => {
      return campaign.methods.requests(index).call();
    })
  );
  return { props: { address: address, requests: requests, requestsCount: requestsCount } };
}

export default RequestIndex;
