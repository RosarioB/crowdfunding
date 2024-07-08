import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Form, FormField, Input, Message, Button } from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';

const ContributeForm = ({ address }) => {
    const [value, setValue] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(false);

    const router = useRouter();

    const onSubmit = async event => {
        event.preventDefault();

        setLoading(true);
        setErrorMessage('');
        setDisabled(true);

        const campaign = Campaign(address);

        try {
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(value, 'ether') 
            });
            router.reload();
        } catch (err) {
            setErrorMessage(err.message);
        }

        setLoading(false);
        setDisabled(false);
        setValue('');
    };

    return (
        <Form onSubmit={onSubmit} error={!!errorMessage}>
            <FormField>
                <label>Amount to contribute</label>
                <Input 
                    label='ether'
                    labelPosition='right'
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                />
            </FormField>
            <Message error header='Oops!' content={errorMessage} />
            <Button primary loading={loading} disabled={disabled}>
                Contribute!
            </Button>
        </Form>
    );
}

export default ContributeForm;