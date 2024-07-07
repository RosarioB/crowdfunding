import React, { useState } from 'react';
import { Form, FormField, Input, Message, Button } from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';

const ContributeForm = ({ address }) => {
    const [value, setValue] = useState('');

    const onSubmit = async event => {
        event.preventDefault();
        const campaign = Campaign(address);

        try {
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(value, 'ether') 
            });
        } catch (err) {

        }
    };

    return (
        <Form onSubmit={onSubmit}>
            <FormField>
                <label>Amount to contribute</label>
                <Input 
                    label='ether'
                    labelPosition='right'
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                />
            </FormField>
            <Button primary>
                Contribute!
            </Button>
        </Form>
    );
}

export default ContributeForm;