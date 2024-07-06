import { CardGroup } from "semantic-ui-react";
import Layout from "../../components/Layout";
import Campaign from "../../ethereum/campaign";
import web3 from "../../ethereum/web3";

const CampaignShow = ({ campaign }) => {
  const renderCards = () => {
    const items = [
      {
        header: campaign.manager,
        meta: "Address of Manager",
        description:
          "The manager created this campaign and can create requests to withdraw money",
        style: { overflowWrap: "break-word" },
      },
      {
        header: campaign.minimumContribution,
        meta: "Minimum Contribution (wei)",
        description:
          "You must contribute at least this much wei to become an approver",
      },
      {
        header: campaign.requestsCount,
        meta: "Number of Requests",
        description:
          "A request tries to withdraw money from the contract. Requests must be approved by approvers",
      },
      {
        header: campaign.approversCount,
        meta: "Number of Approvers",
        description:
          "Number of people who have already donated to this campaign",
      },
      {
        header: web3.utils.fromWei(campaign.balance, "ether"),
        meta: "Campaign Balance (ether)",
        description:
          "The balance is how much money this campaign has left to spend",
      },
    ];

    return <CardGroup items={items} />;
  };

  return (
    <Layout>
      <h3>Campaign Show</h3>
      {renderCards()}
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const { address } = context.params;
  const campaign = await Campaign(address);
  const summary = await campaign.methods.getSummary().call();
  const serializableSummary = {
    minimumContribution: summary[0].toString(),
    balance: summary[1].toString(),
    requestsCount: summary[2].toString(),
    approversCount: summary[3].toString(),
    manager: summary[4],
  };

  return { props: { campaign: serializableSummary } };
}

export default CampaignShow;
