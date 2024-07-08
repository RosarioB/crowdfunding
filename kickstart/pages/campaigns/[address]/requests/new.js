import React, { useState } from "react";
import { Form, FormField, Button, Message, Input } from "semantic-ui-react";
import Campaign from "../../../../ethereum/campaign";
import web3 from "../../../../ethereum/web3";
import Link from "next/link";
import { useRouter } from 'next/router';
import Layout from "../../../../components/Layout";

const RequestNew = ({ address }) => {
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const [recipient, setRecipient] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const router = useRouter();

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setDisabled(true);

    const campaign = Campaign(address);

    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods
        .createRequest(description, web3.utils.toWei(value, "ether"), recipient)
        .send({ from: accounts[0] });

      router.push(`/campaigns/${address}/requests`);
    } catch (err) {
      setErrorMessage(err.message);
    }

    setLoading(false);
    setDisabled(false);
  };

  return (
    <Layout>
        <Link href={`/campaigns/${address}/requests`}>
            Back
        </Link>
      <h3>Create a Request</h3>
      <Form onSubmit={onSubmit} error={!!errorMessage}>
        <FormField>
          <label>Description</label>
          <Input
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </FormField>

        <FormField>
          <label>Value in Ether</label>
          <Input
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
        </FormField>

        <FormField>
          <label>Recipient</label>
          <Input
            value={recipient}
            onChange={(event) => setRecipient(event.target.value)}
          />
        </FormField>
        <Message error header="Oops!" content={errorMessage} />
        <Button primary loading={loading} disabled={disabled}>
          Create!
        </Button>
      </Form>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const { address } = context.params;
  return { props: { address } };
}

export default RequestNew;
