import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Form, FormField, Button, Input, Message } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';

const CampaignNew = () => {
  const [minimumContribution, setMinimumContribution] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const router = useRouter();

  const onSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setDisabled(true);

    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods
        .createCampaign(minimumContribution)
        .send({ from: accounts[0] });

      router.push('/');
    } catch (err) {
      setErrorMessage(err.message);
    }

    setLoading(false);
    setDisabled(false);
  };

  return (
    <Layout>
      <h3>Create a campaign</h3>
      <Form onSubmit={onSubmit} error={!!errorMessage}>
        <FormField>
          <label>Minimum Contribution</label>
          <Input
            label='wei'
            labelPosition='right'
            value={minimumContribution}
            onChange={(event) => setMinimumContribution(event.target.value)}
          />
        </FormField>
        <Message error header='Oops!' content={errorMessage} />
        <Button primary loading={loading} disabled={disabled}>
          Create!
        </Button>
      </Form>
    </Layout>
  );
};

export default CampaignNew;
