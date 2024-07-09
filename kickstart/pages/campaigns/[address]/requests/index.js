import React from "react";
import {
  TableRow,
  TableHeaderCell,
  TableHeader,
  TableBody,
  Table,
  Button,
} from "semantic-ui-react";
import Link from "next/link";
import Layout from "../../../../components/Layout";
import Campaign from "../../../../ethereum/campaign";
import RequestRow from "../../../../components/RequestRow";

const RequestIndex = ({ address, requests, requestsCount, approversCount }) => {
  const renderRows = () => {
    return requests.map((request, index) => {
      return (
        <RequestRow
          key={index}
          id={index}
          request={request}
          address={address}
          approversCount={approversCount}
        />
      );
    });
  };

  return (
    <Layout>
      <h3>Requests</h3>
      <Link href={`/campaigns/${address}/requests/new`}>
        <Button primary floated="right" style={{ marginBottom: 10 }}>Add Request</Button>
      </Link>
      <Table celled>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>ID</TableHeaderCell>
            <TableHeaderCell>Description</TableHeaderCell>
            <TableHeaderCell>Amount</TableHeaderCell>
            <TableHeaderCell>Recipient</TableHeaderCell>
            <TableHeaderCell>Approval Count</TableHeaderCell>
            <TableHeaderCell>Approve</TableHeaderCell>
            <TableHeaderCell>Finalize</TableHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody>{renderRows()}</TableBody>
      </Table>
      <div>Found {requestsCount} requests</div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const { address } = context.params;
  const campaign = Campaign(address);
  const requestsCount = Number(await campaign.methods.getRequestsCount().call());
  const approversCount = Number(await campaign.methods.approversCount().call());

  const requests = await Promise.all(
    Array(requestsCount)
      .fill()
      .map((element, index) => {
        return campaign.methods.requests(index).call();
      })
  );
  return {
    props: {
      address: address,
      requests: requests,
      requestsCount: requestsCount,
      approversCount: approversCount,
    },
  };
}

export default RequestIndex;
