import React from "react";
import { TableRow, TableCell, Button } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import Campaign from "../ethereum/campaign";

const RequestRow = ({ id, request, approversCount, address }) => {
  const readyToFinalize = request.approvalCount > approversCount / 2; 
  const onApprove = async () => {
    const campaign = Campaign(address);
    const accounts = await web3.eth.getAccounts();
    await campaign.methods.approveRequest(id).send({
      from: accounts[0],
    });
  };

  const onFinalize = async () => {
    const campaign = Campaign(address);
    const accounts = await web3.eth.getAccounts();
    await campaign.methods.finalizeRequest(id).send({
      from: accounts[0],
    });
  };

  return (
    <TableRow disabled={request.complete} positive={readyToFinalize && !request.complete}>
      <TableCell>{id}</TableCell>
      <TableCell>{request.description}</TableCell>
      <TableCell>
        {web3.utils.fromWei(request.value.toString(), "ether")}
      </TableCell>
      <TableCell>{request.recipient}</TableCell>
      <TableCell>
        {request.approvalCount.toString()}/{approversCount.toString()}
      </TableCell>
      <TableCell>
        {request.complete ? null : (
          <Button color="green" basic onClick={onApprove}>
            Approve
          </Button>
        )}
      </TableCell>
      <TableCell>
        {request.complete ? null : (
          <Button color="teal" basic onClick={onFinalize}>
            Finalize
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
};

export default RequestRow;
