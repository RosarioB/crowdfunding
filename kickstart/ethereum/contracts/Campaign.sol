// SPDX-License-Identifier: MIT
pragma solidity ^0.4.17;

contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(uint minimum) public { // Pass the minimum argument to the Campaign constructor
        address newCampaign = new Campaign(minimum, msg.sender); // create a new contract Campaign
        deployedCampaigns.push(newCampaign); 
    }

    function getDeployedCampaigns() public view returns (address[]) {
        return deployedCampaigns;
    }
}

contract Campaign { // we define the type Campaign but we have not instatiated a variable
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }

    Request[] public requests;
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    uint public approversCount; // how many contributers we have

    modifier restricted() {
        require(msg.sender == manager); // only the manager of the contract can call the function this modifier is applied to
        _;
    }

    function Campaign(uint minimum, address creator) public {
        manager = creator; // the creator address will be the manager
        minimumContribution = minimum;
    }

    function contribute() public payable {
        require(msg.value > minimumContribution); // In order to contribute you must call this function with an amount of Ether greater than minimContribution
        approvers[msg.sender] = true; // add the address that is contributing to the approvers
        approversCount++;
    }

    function createRequest(string description, uint value, address recipient) public  restricted {
        Request memory request = Request(description, value, recipient, false, 0);
        requests.push(request);
    }

    function approveRequest(uint index) public { // index of the Request[]
        require(approvers[msg.sender]); // make sure the address is a donator
        Request storage request = requests[index]; // storage because we want to modify the instance variabile
        require(!request.approvals[msg.sender]); // make sure that the address has not voted before

        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    function finalizeRequest(uint index) public restricted { // the index of the Request[]
        Request storage request = requests[index];
        require(request.approvalCount > (approversCount / 2)); // make sure that the person who voted yes are more than 50% of the contributors
        require(!request.complete);
        request.recipient.transfer(request.value); // sends the money to the recipient
        request.complete = true;
    }
}